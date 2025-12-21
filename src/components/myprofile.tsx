"use client"
import { useRef,useState} from "react";
import ProfileImage from "./profileimage";
import axios from "axios";
export default function MyProfile({session}){

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile,setSelectedFile] = useState<File | null>(null);

    async function uploadProfilePicture(){
           const formData = new FormData();
           formData.set('profileImage',selectedFile!);
           try {
            const uploadedImage = await axios.post('/api/upload/profile-picture',formData, {
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })
           } catch (error) {
            console.log(error)
            
           }
           

    }
    return(
        <div className="hover:cursor-pointer" onClick={()=>{
            fileInputRef.current?.click()

        }}>
            <input type='file' accept='image/*' ref={fileInputRef} className='absolute right-[99999px]' onChange={ async (e)=>{
               setSelectedFile(e.target.files[0]);
               console.log(e.target.files)
               await uploadProfilePicture()
            }}/>
        <ProfileImage
            session={session}
            styles={"w-25 absolute top-15 left-6 bg-cyan-50"}
          />
        </div>
    );
}