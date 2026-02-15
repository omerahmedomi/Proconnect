"use client";
import { ThreeDots } from "react-loader-spinner";

export default function ProfileLoaderIcon() {
  return (
    <div className="w-full flex justify-center ">
      <ThreeDots
      height="80"
      width="80"
      color="cyan"
      ariaLabel="audio-loading"
      wrapperStyle={{}}
      wrapperClass="wrapper-class"
      visible={true}
    />
    </div>
    
  );
}