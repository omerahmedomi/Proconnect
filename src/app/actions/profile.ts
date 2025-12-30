

export type ProfileFormState = {
  success: boolean;
  errors?: ProfileErrors,
  values?: object
};

export type ProfileErrors = {
    firtsName?:string,
    lastName?:string,


}

export async function saveProfile(prevState:ProfileState,formData:FormData) {

    try {
        
      return {
        success:true,
      
      }
    } catch (error) {
        console.log(error)
        return {
            success:false,
            error:"Something"
        }
        
    }
}