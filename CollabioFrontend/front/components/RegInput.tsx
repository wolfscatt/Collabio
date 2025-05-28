"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

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
  const [isFocused, setIsFocused] = useState(false);
  const isPassword = type === "password";

  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-2 relative"
    >
      <motion.label
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        htmlFor={id}
        className="block text-sm text-black pl-4"
      >
        {title}
      </motion.label>
      <motion.div
        animate={{
          scale: isFocused ? 1.02 : 1,
          borderColor: isFocused ? "rgb(147 51 234)" : "rgb(216 180 254)"
        }}
        transition={{ duration: 0.2 }}
        className="relative"
      >
        <input
          type={inputType}
          id={id}
          className="w-full px-4 py-2 rounded-lg border-2 border-specPurple-300 bg-transparent text-black placeholder-gray-400 focus:outline-none focus:border-purple-500 pr-10 transition-all duration-200"
          placeholder={placeHolder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {isPassword && (
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-3 bottom-3 cursor-pointer text-gray-500"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={showPassword ? "show" : "hide"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default RegInput;
