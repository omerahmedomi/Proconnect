"use client"

import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"

export default function Password(){
    const [isVisible, setIsVisible] = useState<boolean>(false)
    return (
      <div className="relative">
        <input
          type={`${isVisible ? 'text' : 'password'}`}
          className="auth-input "
          placeholder="min 8 length" required
        />
        <span onClick={()=>setIsVisible(prev=>!prev)} className="cursor-pointer">
          {isVisible ? (
              <EyeOff
                size={14}
                className="absolute top-0 right-2 translate-y-1/2 "
              />
            ) : (
        <Eye
          size={14}
          className="absolute top-0 right-2 translate-y-1/2 "
        />
            )}
        </span>
      </div>
    );
}