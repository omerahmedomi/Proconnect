"use client";

import { useFormStatus } from "react-dom";

export default function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className="final-action-button self-end mt-0"
      type="submit"
      disabled={pending}
    >
      Save
    </button>
  );
}
