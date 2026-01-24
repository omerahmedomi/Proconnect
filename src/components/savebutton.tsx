"use client";

import { useFormStatus } from "react-dom";

export default function SaveButton({disabled}:{disabled?:boolean}) {
  const { pending } = useFormStatus();
  return (
    <button
      className="final-action-button self-end mt-0"
      type="submit"
      disabled={pending || disabled}
    >
      Save
    </button>
  );
}
