"use client";

import React, { useState } from 'react'
import RegInput from '../../../../components/RegInput';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { TbLogout } from 'react-icons/tb';
import { FaSpinner } from 'react-icons/fa';
import { FaExclamationCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });
      localStorage.setItem("user", JSON.stringify({
        id: res.data.id,
        email: res.data.email,
        username: res.data.username,
        token: res.data.token
      }));
      localStorage.setItem("token", res.data.token);
      setMessage("Giriş başarılı! Yönlendiriliyorsunuz...");
      setMessageType("success");

      setTimeout(() => {
        router.push("/summary");
      }, 1500);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Giriş başarısız!";
      setMessage(errorMsg);
      setMessageType("error");
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
          Giriş Yapın
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
          onSubmit={handleLogin}
        >
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
              <TbLogout className="text-2xl" />
            </motion.div>
            Giriş Yap
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
          Üye değil misiniz?{" "}
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/register" className="text-purple-800 font-semibold hover:underline">
              Üye Ol
            </Link>
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Page;
