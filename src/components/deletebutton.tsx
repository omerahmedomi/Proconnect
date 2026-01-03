import { useFormStatus } from "react-dom";


export default function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className=" btn-register rounded-sm disabled:bg-gray-400! disabled:cursor-not-allowed! disabled:hover:bg-none!"
    >
      {pending ? "Deleting..." : "Yes"}
    </button>
  );
}
