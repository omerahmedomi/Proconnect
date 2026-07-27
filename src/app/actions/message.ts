"use server";

import dbConnect from "@/lib/mongodb";
import Conversation from "@/models/conversation";
import Message from "@/models/message";
import Profile from "@/models/profile";
import { pusherServer } from "@/lib/pusher";

export async function getConversationsAction(userProfileId: string) {
  try {
    await dbConnect();
    const conversations = await Conversation.find({ members: userProfileId })
      .populate("members", "name profile_picture headline")
      .sort({ lastMessageAt: -1 })
      .lean();

    return JSON.parse(JSON.stringify(conversations));
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return [];
  }
}

export async function getMessagesAction(conversationId: string) {
  try {
    await dbConnect();
    const messages = await Message.find({ conversationId })
      .populate("sender", "name profile_picture")
      .sort({ createdAt: 1 })
      .lean();

    return JSON.parse(JSON.stringify(messages));
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
}

export async function sendMessageAction(
  conversationId: string,
  senderProfileId: string,
  text: string
) {
  try {
    if (!text || text.trim().length === 0) return null;

    await dbConnect();
    
    // Create new message
    const newMessage = await Message.create({
      conversationId,
      sender: senderProfileId,
      text,
    });

    // Populate sender details for pusher broadcast
    const populatedMessage = await newMessage.populate("sender", "name profile_picture");

    // Update conversation lastMessageAt
    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessageAt: new Date(),
    });

    const parsedMessage = JSON.parse(JSON.stringify(populatedMessage));

    // Fetch conversation to get members for personal notifications
    const conversation = await Conversation.findById(conversationId).select("members");

    // Trigger pusher event to all subscribers of this conversation channel
    await pusherServer.trigger(
      `conversation-${conversationId}`,
      "new-message",
      parsedMessage
    );

    // Trigger pusher event to personal user channels for global notifications
    if (conversation && conversation.members) {
      for (const memberId of conversation.members) {
        if (memberId.toString() !== senderProfileId) {
          await pusherServer.trigger(
            `user-${memberId.toString()}`,
            "new-message-notification",
            parsedMessage
          );
        }
      }
    }

    return parsedMessage;
  } catch (error) {
    console.error("Error sending message:", error);
    return null;
  }
}

export async function getOrCreateConversationAction(
  userProfileId: string,
  otherProfileId: string
) {
  try {
    await dbConnect();
    
    // Check if a direct conversation already exists between these two users
    let conversation = await Conversation.findOne({
      isGroup: false,
      members: { $all: [userProfileId, otherProfileId] },
    }).populate("members", "name profile_picture headline").lean();

    if (!conversation) {
      // Create new conversation
      const newConversation = await Conversation.create({
        isGroup: false,
        members: [userProfileId, otherProfileId],
      });
      conversation = await Conversation.findById(newConversation._id)
        .populate("members", "name profile_picture headline")
        .lean();
    }

    return JSON.parse(JSON.stringify(conversation));
  } catch (error) {
    console.error("Error getting or creating conversation:", error);
    return null;
  }
}
