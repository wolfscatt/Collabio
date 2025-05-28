"use client";

import React, { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";
import RegInput from "../../../../components/RegInput";
import api from "@/lib/api";
import { FaSpinner, FaExclamationCircle, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { AxiosError } from 'axios';

// Parola gücü kontrolü için yardımcı fonksiyonlar
const checkPasswordStrength = (password: string) => {
  const checks = {
    length: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  };

  const strength = Object.values(checks).filter(Boolean).length;
  const strengthText = strength <= 2 ? "Zayıf" : strength <= 3 ? "Orta" : strength <= 4 ? "İyi" : "Güçlü";
  const strengthColor = strength <= 2 ? "red" : strength <= 3 ? "yellow" : strength <= 4 ? "blue" : "green";

  return {
    checks,
    strength,
    strengthText,
    strengthColor
  };
};

const PasswordStrengthIndicator = ({ password }: { password: string }) => {
  const { checks, strengthText, strengthColor } = checkPasswordStrength(password);

  const getColorClass = (color: string) => {
    switch (color) {
      case "red": return "text-red-500";
      case "yellow": return "text-yellow-500";
      case "blue": return "text-blue-500";
      case "green": return "text-green-500";
      default: return "text-gray-500";
    }
  };

  return (
    <div className="mt-2 space-y-2">
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(checkPasswordStrength(password).strength / 5) * 100}%` }}
            className={`h-full ${strengthColor === "red" ? "bg-red-500" :
              strengthColor === "yellow" ? "bg-yellow-500" :
                strengthColor === "blue" ? "bg-blue-500" :
                  "bg-green-500"
              }`}
          />
        </div>
        <span className={`text-sm font-medium ${getColorClass(strengthColor)}`}>
          {strengthText}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-x-4 gap-y-1 text-xs">
        <div className="flex items-center gap-1.5">
          {checks.length ? <FaCheckCircle className="text-green-500" /> : <FaTimesCircle className="text-red-500" />}
          <span className={checks.length ? "text-green-500" : "text-red-500"}>8+ karakter</span>
        </div>
        <div className="flex items-center gap-1.5">
          {checks.hasUpperCase ? <FaCheckCircle className="text-green-500" /> : <FaTimesCircle className="text-red-500" />}
          <span className={checks.hasUpperCase ? "text-green-500" : "text-red-500"}>Büyük harf</span>
        </div>
        <div className="flex items-center gap-1.5">
          {checks.hasLowerCase ? <FaCheckCircle className="text-green-500" /> : <FaTimesCircle className="text-red-500" />}
          <span className={checks.hasLowerCase ? "text-green-500" : "text-red-500"}>Küçük harf</span>
        </div>
        <div className="flex items-center gap-1.5">
          {checks.hasNumber ? <FaCheckCircle className="text-green-500" /> : <FaTimesCircle className="text-red-500" />}
          <span className={checks.hasNumber ? "text-green-500" : "text-red-500"}>Rakam</span>
        </div>
        <div className="flex items-center gap-1.5">
          {checks.hasSpecialChar ? <FaCheckCircle className="text-green-500" /> : <FaTimesCircle className="text-red-500" />}
          <span className={checks.hasSpecialChar ? "text-green-500" : "text-red-500"}>Özel karakter</span>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !email.trim()) {
      setMessage("Lütfen tüm alanları doldurun.");
      setMessageType("error");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Şifreler eşleşmiyor!");
      setMessageType("error");
      return;
    }

    if (password.length < 6) {
      setMessage("Şifre en az 6 karakter olmalı.");
      setMessageType("error");
      return;
    }

    try {
      const res = await api.post("/auth/register", {
        username,
        email,
        password,
      });

      // Eğer backend beklenen token ya da user objesini dönmediyse hata göster
      if (!res.data || !res.data.token) {
        setMessage("Kayıt başarısız: geçerli bir yanıt alınamadı.");
        setMessageType("error");
        return;
      }

      setMessage("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...");
      setMessageType("success");
      localStorage.setItem("token", res.data.token);
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const errorMsg = err.response?.data?.message || "Kayıt başarısız!";
        setMessage(errorMsg);
        setMessageType("error");
      } else {
        setMessage("Beklenmeyen bir hata oluştu!");
        setMessageType("error");
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full bg-register bg-fixed bg-cover bg-no-repeat flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="items-center justify-center"
      >
        <motion.img
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          src="/images/collabio-logo.png"
          alt="Collabio Logo"
          className="w-[24vw] block mx-auto object-contain"
          width={100}
          height={100}
        />
      </motion.div>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring" }}
        className="bg-specPink-300 border-r-8 border-b-8 border-specPink-200 backdrop-blur-sm p-4 rounded-3xl w-[28vw] mt-[4vh]"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-2xl font-semibold text-center text-black"
        >
          Üye Olun
        </motion.h1>
        <motion.form
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="space-y-4 mb-[2vh]"
          onSubmit={handleRegister}
        >
          <RegInput
            title="Kullanıcı Adı"
            id="username"
            type="text"
            placeHolder="Kullanıcı adınızı giriniz"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <RegInput
            title="E-Posta"
            id="email"
            type="email"
            placeHolder="E-posta adresinizi giriniz"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div>
            <RegInput
              title="Şifre"
              id="password"
              type="password"
              placeHolder="Şifrenizi giriniz"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <RegInput
            title="Şifre Tekrar"
            id="confirmPassword"
            type="password"
            placeHolder="Şifrenizi tekrar giriniz"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {password && <PasswordStrengthIndicator password={password} />}
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "rgb(107 33 168)" }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-purple-800 text-white py-2 rounded-lg hover:bg-purple-900 transition-colors flex items-center justify-center gap-2"
          >
            <motion.div
              animate={{ rotate: messageType === "success" ? 360 : 0 }}
              transition={{ duration: 1, repeat: messageType === "success" ? Infinity : 0 }}
            >
              <FaSpinner className="text-2xl" />
            </motion.div>
            Üye Ol
          </motion.button>
        </motion.form>

        <AnimatePresence mode="wait">
          {message && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`text-[1.6vh] flex items-center gap-2 justify-center text-center font-medium mb-2 ${messageType === "success" ? "text-green-600" : "text-red-600"}`}
            >
              {messageType === "success" ?
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <FaSpinner className="text-green-600 text-[1.6vh]" />
                </motion.div>
                : <FaExclamationCircle className="text-red-600 text-[1.6vh]" />
              }
              {message}
            </motion.p>
          )}
        </AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-sm text-black"
        >
          Zaten hesabınız var mı?{" "}
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/login" className="text-purple-800 font-semibold hover:underline">
              Giriş Yap
            </Link>
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Page;
