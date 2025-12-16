"use client"
import EmojiPicker from "emoji-picker-react";
import { GalleryHorizontal, Image, LucideSmile, Mountain } from "lucide-react";
import { useState } from "react";
export default function EmojiPickerLayout(){
    const [isPickerVisible,setIsPickerVisivle] = useState<boolean>(false);
    let [postText,setPostText] = useState('');
    return (
      <div className="w-full">
        <div className="self-start flex flex-col">
          <textarea
            value={postText}
            className="text-lg focus:outline-none w-full  resize-none "
            placeholder="What do you want to talk about?"
            onChange={(e) => setPostText(e.target.value)}
    
          />
        </div>
        <div className="flex items-center gap-1">
          <span title="emoji picker" className="">
            <LucideSmile
              className="p-2 text-gray-500 cursor-pointer rounded-full hover:bg-gray-100 cursor-pinter transitio-colors duration-300"
              size={40}
              onClick={() => setIsPickerVisivle((prev) => !prev)}
            />
          </span>
          <span>
            <Image
              className="p-2 hover:bg-gray-100 cursor-pointer transition-colors duration-300 text-gray-500 "
              size={40}
            />
            <input type="file" accept="image/*"  />
            
          </span>
        </div>
        {isPickerVisible && (
          <div className="flex">
            <EmojiPicker
              onEmojiClick={(emojidata) => {
                setPostText((post) => post.concat(emojidata.emoji));
              }}
            />
          </div>
        )}
      </div>
    );
}