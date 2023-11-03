import { InputType } from "../../lib/types";

const Input = ({ label, onChange }: InputType) => {
  //Stops app execution if onChange is not defined. This check is not done in TypeScript to make the
  //type reusable as possible
  if (!onChange) throw new Error("The onChange function should be defined");
  return (
    <div className="space-y-2">
      <label htmlFor="input">{label}</label>
      <input
        onChange={onChange}
        className="w-full rounded-sm border border-[#cecece] p-2 focus:shadow-md focus:outline-none focus:border-[#2ECC71]"
      />
    </div>
  );
};

export default Input;