"use client";

import React, { useState } from 'react'
import { useRouter } from "next/navigation";
import RegInput from "../../../../components/RegInput";
import api from "@/lib/api";
import { FaSpinner } from 'react-icons/fa';
import { FaExclamationCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { AxiosError } from 'axios';

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
          <RegInput
            title="Şifre"
            id="password"
            type="password"
            placeHolder="Şifrenizi giriniz"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <RegInput
            title="Şifre Tekrar"
            id="confirmPassword"
            type="password"
            placeHolder="Şifrenizi tekrar giriniz"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
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
