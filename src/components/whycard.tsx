export default function WhyCard({title,description,icon}:{title:string,description:string,icon:React.ReactNode}){
    return(
     <div className="group p-6 border border-gray-100 shadow-lg rounded-xl hover:scale-103 transition-transform duration-300">
       
      
      {icon}
       <h4 className="text-xl font-semibold mb-1">{title}</h4>
       <h5 className="text-gray-500">
         {description}
       </h5>
     </div>
    )
}