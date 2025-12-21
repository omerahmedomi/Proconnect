"use client"
import { useRef,useState} from "react";
import ProfileImage from "./profileimage";
export default function MyProfile({session}){

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile,setSelectedFile] = useState<File | null>(null);
    return(
        <div className="hover:cursor-pointer" onClick={()=>{
            fileInputRef.current?.click()

        }}>
            <input type='file' accept='image/*' ref={fileInputRef} className='absolute right-[99999px]' onChange={(e)=>{
               setSelectedFile(e.target.files[0]);
            }}/>
        <ProfileImage
            session={session}
            styles={"w-25 absolute top-15 left-6 bg-cyan-50"}
          />
        </div>
    );
}