"use client";

import { useState, useEffect, useRef } from "react";
import { getMessagesAction, sendMessageAction } from "@/app/actions/message";
import { getPusherClient } from "@/lib/pusher-client";
import { Loader2, Send, MessageSquare } from "lucide-react";
import ProfileImage from "@/components/profileimage";
import { formatRelativeTime } from "@/utils/dateformat";
import Link from "next/link";

export default function MessagesClient({ 
  initialConversations, 
  userProfileId 
}: { 
  initialConversations: any[]; 
  userProfileId: string; 
}) {
  const [conversations, setConversations] = useState<any[]>(initialConversations);
  const [activeConversation, setActiveConversation] = useState<any | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isSending, setIsSending] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load messages when active conversation changes
  useEffect(() => {
    if (!activeConversation) return;
    
    let isMounted = true;
    const loadMessages = async () => {
      setIsLoadingMessages(true);
      const data = await getMessagesAction(activeConversation._id);
      if (isMounted) {
        setMessages(data);
        setIsLoadingMessages(false);
      }
    };
    
    loadMessages();
    
    return () => { isMounted = false; };
  }, [activeConversation]);

  // Setup Pusher listeners
  useEffect(() => {
    const pusher = getPusherClient();
    
    // Subscribe to all conversations to update the inbox and active chat
    conversations.forEach((conv) => {
      const channelName = `conversation-${conv._id}`;
      const channel = pusher.subscribe(channelName);
      
      channel.bind("new-message", (newMessage: any) => {
        // Update active chat if it matches
        if (activeConversation && activeConversation._id === conv._id) {
          setMessages((prev) => {
            // Prevent exact DB duplicates
            if (prev.some((m) => m._id === newMessage._id)) return prev;
            
            // Check if we have an optimistic message to replace
            const optimisticIndex = prev.findIndex(m => m._id.startsWith('temp-') && m.text === newMessage.text);
            if (optimisticIndex !== -1) {
              const newMessages = [...prev];
              newMessages[optimisticIndex] = newMessage;
              return newMessages;
            }
            
            return [...prev, newMessage];
          });
        }
        
        // Update conversation list sorting and lastMessageAt
        setConversations((prev) => {
          const updated = prev.map((c) => {
            if (c._id === conv._id) {
              return { ...c, lastMessageAt: newMessage.createdAt };
            }
            return c;
          });
          return updated.sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime());
        });
      });
    });

    return () => {
      conversations.forEach((conv) => {
        pusher.unsubscribe(`conversation-${conv._id}`);
      });
    };
  }, [conversations, activeConversation]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConversation || isSending) return;

    const textToSend = inputText.trim();
    setInputText("");
    
    // Optimistic Update: instantly show the message on the sender's screen
    const optimisticMessage = {
      _id: `temp-${Date.now()}`,
      conversationId: activeConversation._id,
      text: textToSend,
      createdAt: new Date().toISOString(),
      sender: {
        _id: userProfileId,
        // we omit detailed sender info here, it won't matter because isMe = true
      }
    };
    
    setMessages((prev) => [...prev, optimisticMessage]);
    setConversations((prev) => {
      const updated = prev.map((c) => {
        if (c._id === activeConversation._id) {
          return { ...c, lastMessageAt: optimisticMessage.createdAt };
        }
        return c;
      });
      return updated.sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime());
    });

    setIsSending(true);
    await sendMessageAction(activeConversation._id, userProfileId, textToSend);
    setIsSending(false);
  };

  const getOtherMember = (conv: any) => {
    if (conv.isGroup) return { name: { firstName: conv.name, lastName: "" }, profile_picture: "" };
    return conv.members.find((m: any) => m._id !== userProfileId) || conv.members[0];
  };

  return (
    <>
      {/* Left Pane: Inbox */}
      <div className={`w-full md:w-1/3 border-r border-gray-200 flex flex-col h-full ${activeConversation ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Messaging</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-sm">
              No conversations yet. Search for people and connect to start chatting!
            </div>
          ) : (
            conversations.map((conv) => {
              const other = getOtherMember(conv);
              const isActive = activeConversation?._id === conv._id;
              return (
                <div 
                  key={conv._id}
                  onClick={() => setActiveConversation(conv)}
                  className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100 ${isActive ? 'bg-cyan-50 hover:bg-cyan-50' : ''}`}
                >
                  <ProfileImage image={other?.profile_picture} styles="w-12 h-12" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h4 className="font-semibold text-gray-900 text-sm truncate">
                        {conv.isGroup ? conv.name : `${other?.name?.firstName} ${other?.name?.lastName}`}
                      </h4>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                        {formatRelativeTime(conv.lastMessageAt)}
                      </span>
                    </div>
                    {!conv.isGroup && (
                      <p className="text-xs text-gray-500 truncate">{other?.headline}</p>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Right Pane: Active Chat */}
      <div className={`w-full md:w-2/3 flex flex-col h-full bg-gray-50 ${!activeConversation ? 'hidden md:flex' : 'flex'}`}>
        {!activeConversation ? (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <MessageSquare size={48} className="mb-4 opacity-50" />
            <p className="text-lg font-medium">Select a conversation to start chatting</p>
          </div>
        ) : (
          <>
            {/* Chat Header */}
            <div className="p-4 bg-white border-b border-gray-200 flex items-center gap-3 shadow-sm z-10">
              <button 
                className="md:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-full cursor-pointer"
                onClick={() => setActiveConversation(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              <Link href={activeConversation.isGroup ? "#!" : `/profile/${getOtherMember(activeConversation)?._id}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <ProfileImage image={getOtherMember(activeConversation)?.profile_picture} styles="w-10 h-10" />
                <div>
                  <h3 className="font-bold text-gray-900 hover:underline">
                    {activeConversation.isGroup ? activeConversation.name : `${getOtherMember(activeConversation)?.name?.firstName} ${getOtherMember(activeConversation)?.name?.lastName}`}
                  </h3>
                </div>
              </Link>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {isLoadingMessages ? (
                <div className="flex justify-center p-8">
                  <Loader2 className="animate-spin text-cyan-600" size={32} />
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center text-gray-500 text-sm mt-8">
                  Say hi to start the conversation!
                </div>
              ) : (
                messages.map((msg, idx) => {
                  const isMe = msg.sender._id === userProfileId;
                  const showAvatar = !isMe && (idx === messages.length - 1 || messages[idx + 1]?.sender._id !== msg.sender._id);
                  
                  return (
                    <div key={msg._id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} gap-2`}>
                      {!isMe && (
                        <div className="w-8 flex-shrink-0 flex flex-col justify-end">
                          {showAvatar && <ProfileImage image={msg.sender.profile_picture} styles="w-8 h-8" />}
                        </div>
                      )}
                      
                      <div className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${isMe ? 'bg-cyan-600 text-white rounded-br-sm' : 'bg-white border border-gray-200 text-gray-900 rounded-bl-sm'}`}>
                        <div className="break-words">{msg.text}</div>
                        <div className={`text-[10px] mt-1 ${isMe ? 'text-cyan-100' : 'text-gray-400'}`}>
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <form onSubmit={handleSendMessage} className="flex gap-2 items-end">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                  placeholder="Type a message..."
                  className="flex-1 resize-none border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent max-h-32 text-sm"
                  rows={1}
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isSending}
                  className="mb-1 p-3 bg-cyan-600 text-white rounded-full hover:bg-cyan-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                >
                  <Send size={20} />
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
}
