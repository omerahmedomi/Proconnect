"use server"
export type ProfileFormState = {
  success: boolean;
  errors?: ProfileErrors,
  values?: object
};

export type ProfileErrors = {
    firtsName?:string,
    lastName?:string,


}

export async function saveProfile(prevState:ProfileFormState,formData:FormData) {
    const firstName = formData.get("firstName");
    console.log("Hi");

    try {

        
      return {
     success:true
      
      }
    } catch (error) {
        console.log(error)
        return {
            success:false
           
        }
        
    }
}