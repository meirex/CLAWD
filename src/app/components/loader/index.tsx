import { CgSpinner } from "react-icons/cg";

export function Loader() {
  return (
    <div className="flex justify-center items-center">
      <CgSpinner className="animate-spin text-red-500" size={24} />
    </div>
  );
}

