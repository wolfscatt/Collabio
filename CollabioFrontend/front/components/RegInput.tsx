"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface RegInputProps {
  title: string;
  placeHolder: string;
  type: string;
  id: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RegInput: React.FC<RegInputProps> = ({
  title,
  placeHolder,
  type,
  id,
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="space-y-2 relative">
      <label htmlFor={id} className="block text-sm text-black pl-4">
        {title}
      </label>
      <input
        type={inputType}
        id={id}
        className="w-full px-4 py-2 rounded-lg border-2 border-specPurple-300 bg-transparent text-black placeholder-gray-400 focus:outline-none focus:border-purple-500 pr-10"
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
      />
      {isPassword && (
        <div
          className="absolute right-3 bottom-3 cursor-pointer text-gray-500"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
        </div>
      )}
    </div>
  );
};

export default RegInput;
