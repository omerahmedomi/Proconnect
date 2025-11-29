export default function Noty({count}:{count:number}){
    return(
        <span className="absolute rounded-full p-2 size-px text-white text-[10px] bg-red-500 flex justify-center items-center -top-1.5 -right-1.5">{count}</span>
    )
}