"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RegInput from "../../../../components/RegInput";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

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
      // const res = await api.post("/auth/register", {
      //   username,
      //   email,
      //   password,
      // });

      setMessage("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...");
      setMessageType("success");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Kayıt başarısız!";
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
      <div className="bg-specPink-300 border-r-8 border-b-8 border-specPink-200 backdrop-blur-sm p-4 rounded-3xl w-96 mt-16">
        <h1 className="text-2xl font-semibold text-center text-black">
          Üye Olun
        </h1>
        <form className="space-y-4 mb-4" onSubmit={handleRegister}>
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
          <button
            type="submit"
            className="w-full bg-purple-800 text-white py-2 rounded-lg hover:bg-purple-900 transition-colors flex items-center justify-center gap-2"
          >
            Üye Ol
          </button>
        </form>
        {message && (
          <p className={`text-sm text-center font-medium ${messageType === "success" ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}

        <div className="text-center text-sm text-black">
          Zaten hesabınız var mı?{" "}
          <a href="/login" className="text-purple-800 font-semibold hover:underline">
            Giriş Yap
          </a>
        </div>
      </div>
    </div>
  );
}
