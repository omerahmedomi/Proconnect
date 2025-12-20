"use client";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import { LucideImage, LucideSmile } from "lucide-react";
import { useRef, useState, useEffect } from "react";
export default function EmojiPickerLayout() {
  const [isPickerVisible, setIsPickerVisivle] = useState<boolean>(false);
  const [postText, setPostText] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previews, setPreviews] = useState<
    { url: string; name: string; size: number }[]
  >([]);
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading,setIsUploading] = useState<boolean>(false);

  const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles:File [] = Array.from(e?.target?.files ?? []);

    // Combine existing files with new files
    const updatedFiles = [...files, ...selectedFiles];
    setFiles(updatedFiles);

    // Create previews for all files
    const newPreviews = selectedFiles.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
    }));

    // Combine existing previews with new previews
    setPreviews((prev) => [...prev, ...newPreviews]);

    // Reset file input value to allow selecting same files again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (index:number) => {
    // Revoke object URL
    URL.revokeObjectURL(previews[index].url);

    // Remove from both arrays
    const updatedPreviews = previews.filter((_, i) => i !== index);
    const updatedFiles = files.filter((_, i) => i !== index);

    setPreviews(updatedPreviews);
    setFiles(updatedFiles);
  };

  const handleUploadClick = async () => {
    // You can now upload all files in the `files` array
    const formData = new FormData();
    files.forEach((file)=>{
      formData.append('images', file)
    })
    // setIsUploading(true);


    // Upload logic here
    console.log("Files to upload:", files);
    console.log([...formData.entries()]);

     try {
       setIsUploading(true);

       const res = await axios.post("/api/files", formData, {
         headers: {
           "Content-Type": "multipart/form-data",
         },
       });

       console.log("Uploaded:", res);
       // res.data.urls → save in post later
     } catch (err) {
       console.error(err);
     } finally {
       setIsUploading(false);
     }
  };
  // useEffect(() => {
  //   return () => {
  //     if (preview) {
  //       URL.revokeObjectURL(preview);
  //     }
  //   };
  // }, [preview]);
  return (
    <div className="w-full">
      <div className="self-start flex flex-col">
        <textarea
          value={postText}
          className="text-lg focus:outline-none w-full  resize-none field-sizing-content "
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
          <LucideImage
            className="p-2 hover:bg-gray-100 cursor-pointer transition-colors duration-300 text-gray-500 "
            size={40}
            onClick={() => fileInputRef.current?.click()}
          />
          <input
            type="file"
            accept="image/*"
            multiple
            className="absolute right-[9999999px]"
            ref={fileInputRef}
            onChange={(e) => {
              handleFileChange(e);
            }}
          />
        </span>
      </div>
      <div className="flex flex-col sm:flex-row items-start gap-4">
        {isPickerVisible && (
          <div className="flex">
            <EmojiPicker
              onEmojiClick={(emojidata) => {
                setPostText((post) => post.concat(emojidata.emoji));
              }}
              className="w-50"
            />
          </div>
        )}
        <div
          className={`grid grid-cols-2 ${
            isPickerVisible ? "sm:grid-cols-2" : "sm:grid-cols-3"
          }  gap-4 mt-4`}
        >
          {previews.map((preview, index) => (
            <div key={index} className="relative border rounded p-2 hover:bg-gray-50">
              <img
                src={preview.url}
                alt={`Preview ${index + 1}`}
                className="w-full h-32 object-cover rounded"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs hover:bg-red-400 transition cursor-pointer"
              >
                ×
              </button>
              <p className="text-xs mt-1 truncate">{preview.name}</p>
            </div>
          ))}
        </div>
      </div>
      <button onClick={handleUploadClick} disabled={isUploading} className={`mt-1 px-5 py-1 cursor-pointer rounded-full bg-blue-700 text-white hover:bg-blue-500 transition disabled:hover:bg-none disabled:bg-gray-400 disabled:cursor-not-allowed`}>{isUploading ? 'Posting...' :'Post'}</button>
    </div>
  );
}
