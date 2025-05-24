"use client";

import React, { useState } from 'react'
import RegInput from '../../../../components/RegInput';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { TbLogout } from 'react-icons/tb';

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
    <div className="min-h-screen w-full bg-register bg-fixed bg-cover bg-no-repeat flex flex-col items-center justify-center">
      <div className="items-center justify-center">
        <img
          src="/images/collabio-logo.png"
          alt="Collabio Logo"
          className="w-[24vw] block mx-auto object-contain"
          width={100}
          height={100}
        />
      </div>
      <div className="bg-specPink-300 border-r-8 border-b-8 border-specPink-200 backdrop-blur-sm p-4 rounded-3xl w-[28vw] mt-[4vh]">
        <h1 className="text-2xl font-semibold text-center text-black">
          Giriş Yapın
        </h1>
        <form className="space-y-4 mb-[2vh]" onSubmit={handleLogin}>
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
          <button
            type="submit"
            className="w-full bg-purple-800 text-white py-2 rounded-lg hover:bg-purple-900 transition-colors flex items-center justify-center gap-2"
          >
            <TbLogout className="text-2xl" />
            Giriş Yap
          </button>
        </form>

        {/* ✅ Durum Mesajı */}
        {message && (
          <p className={`text-sm text-center font-medium mb-2 ${messageType === "success" ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}

        <div className="text-center text-sm text-black">
          Üye değil misiniz?{" "}
          <Link href="/register" className="text-purple-800 font-semibold hover:underline">
            Üye Ol
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
