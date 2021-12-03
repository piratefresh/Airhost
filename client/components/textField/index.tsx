import React from "react";
import { FieldErrors } from "react-hook-form";

interface TextProps {
  label: string;
  name: string;
  required?: Boolean;
  register: any;
  errorMsg?: FieldErrors;
  placeholder?: string;
  handleUserKeyPress?: (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => void;
}

const TextField: React.FC<TextProps> = ({
  name,
  label,
  required,
  register,
  errorMsg,
  placeholder,
  handleUserKeyPress,
}) => {
  const textClass = errorMsg
    ? "border-b border-red-700 bg-red-100 p-2 focus:bg-red-100"
    : "border rounded-sm border-gray-700 bg-gray-100 p-2 focus:border-yellow-400 focus:bg-white";

  return (
    <div className="flex flex-col my-2">
      <label htmlFor={name} className="text-gray-600 text-sm my-2">
        {label}
      </label>
      <textarea
        className={textClass}
        placeholder={placeholder ? placeholder : label}
        name={name}
        onKeyPress={handleUserKeyPress}
        ref={register({ required })}
      />
      {errorMsg && errorMsg.message}
    </div>
  );
};

export default TextField;
