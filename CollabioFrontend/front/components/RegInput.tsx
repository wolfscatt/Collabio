import React from "react";

interface RegInputProps {
  title: string;
  placeHolder: string;
  type: string;
  id: string;
}

const RegInput: React.FC<RegInputProps> = ({
  title,
  placeHolder,
  type,
  id,
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor="name" className="block text-sm text-black pl-4">
        {title}
      </label>
      <input
        type={type}
        id={id}
        className="w-full px-4 py-2 rounded-lg border-2 border-specPurple-300 bg-transparent text-black placeholder-gray-400 focus:outline-none focus:border-purple-500"
        placeholder={placeHolder}
      />
    </div>
  );
};

export default RegInput;
