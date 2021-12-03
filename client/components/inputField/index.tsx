import React from "react";
import { FieldErrors } from "react-hook-form";

interface InputProps {
  label: string;
  name: string;
  required?: Boolean;
  minLength?: string;
  register: any;
  type: string;
  errorMsg?: FieldErrors;
}

const InputField: React.FC<InputProps> = ({
  name,
  label,
  required,
  register,
  minLength,
  type,
  errorMsg,
}) => {
  const inputClass = errorMsg
    ? "border-b border-red-700 bg-red-100 p-2 focus:bg-red-100"
    : "border-b border-gray-700 bg-gray-100 p-2 focus:border-yellow-400 focus:bg-yellow-50";

  return (
    <div className="flex flex-col my-2">
      <label htmlFor={name} className="text-gray-600">
        {label}
      </label>
      <input
        className={inputClass}
        type={type}
        placeholder={label}
        name={name}
        ref={register({ required })}
      />
      {errorMsg && errorMsg.message}
    </div>
  );
};

export const baseInputClasses =
  "border-b border-gray-700 bg-gray-100 p-2 focus:border-yellow-400 focus:bg-yellow-50";

export default InputField;
