import { useId } from "react";
import { InputType } from "../../lib/types";

const Input = ({ label, onChange, type, error }: InputType) => {
  //Stops app execution if onChange is not defined. This check is not done in TypeScript to make the
  //type reusable as possible
  const [htmlID] = useId();
  const uniqueInputId = label + htmlID;
  if (!onChange) throw new Error("The onChange function should be defined");
  if (!label) throw new Error("The label should be defined");
  return (
    <div className="space-y-2">
      <label htmlFor={uniqueInputId.replace(/:/g, "_")}>{label}</label>
      <input
        id={uniqueInputId.replace(/:/g, "_")}
        type={type}
        onChange={onChange}
        className={`input ${
          error && "border-red-500"
        }  focus:border-[#2ECC71] focus:shadow-md focus:outline-none`}
      />
    </div>
  );
};

export default Input;
