"use server";
export type ProfileFormState = {
  success: boolean;
  errors?: ProfileErrors;
  values?: any;
};

export type ProfileErrors = {
  firstName?: string;
  lastName?: string;
};

export async function saveProfile(
  prevState: ProfileFormState,
  formData: FormData
): Promise<ProfileFormState> {
  const firstName = formData.get("firstName") as string | null;
  const errors: ProfileErrors = {};

  if (!firstName) {
    errors.firstName = "First Name is required";
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
      values: {
        firstName,
      },
    };
  }

  return {
    success: true,
    errors: {},
    values: {
      firstName,
    },
  };
}
