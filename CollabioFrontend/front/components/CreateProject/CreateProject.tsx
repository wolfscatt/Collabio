// components/CreateProject.tsx
"use client";
import React, { useState } from "react";
import { FaPlus, FaTimes, FaPaperPlane, FaUsers, FaInfoCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { toast } from "react-toastify";
import { AxiosError } from 'axios';
import { motion } from "framer-motion";
import { useProjects } from "@/context/ProjectsContext";

export default function CreateProject() {
  const router = useRouter();
  const { refreshProjects } = useProjects();
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [participants, setParticipants] = useState<string[]>([]);
  const [currentEmail, setCurrentEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const stored = localStorage.getItem("user");

  const handleAddEmail = () => {
    const email = currentEmail.trim().toLowerCase();
    if (!email) return toast.error("E-posta girin.");
    if (participants.includes(email)) return toast.error("Bu e-posta zaten eklendi.");
    setParticipants((p) => [...p, email]);
    setCurrentEmail("");
  };

  const handleRemoveEmail = (email: string) =>
    setParticipants((p) => p.filter((e) => e !== email));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim()) return toast.error("Proje adı boş olamaz.");
    setIsLoading(true);

    try {
      const { data: project } = await api.post("/projects", {
        name: projectName,
        description: projectDescription,
      });
      toast.success(`"${project.name}" projesi oluşturuldu.`);

      if (participants.length) {
        await Promise.all(
          participants.map((email) =>
            api.post(`/projects/${project._id}/members`, { email })
          )
        );
        toast.success("Üyeler başarıyla eklendi.");
      }

      refreshProjects();
      router.push("/summary");
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        console.error(err);
        if (err.response?.status === 404) {
          toast.error("Bazı e-postalar kullanıcıyla eşleşmedi.");
        } else {
          toast.error("Proje oluşturulurken veya üye eklerken hata oluştu.");
        }
      } else {
        toast.error("Beklenmeyen bir hata oluştu.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-6"
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Yeni Proje Oluştur</h2>
            <p className="text-gray-600">Takımınızla birlikte çalışmaya başlayın</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Proje Adı */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Proje Adı
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Projenize bir isim verin"
                required
              />
            </div>

            {/* Proje Açıklaması */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Proje Açıklaması
              </label>
              <textarea
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 min-h-[60px] resize-none"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="Projeniz hakkında kısa bir açıklama yazın"
              />
            </div>

            {/* Üye Ekleme */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FaUsers className="text-purple-600" />
                <label className="block text-sm font-medium text-gray-700">
                  Takım Üyeleri
                </label>
              </div>

              <div className="flex gap-2">
                <input
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Üye e-postası ekleyin"
                  value={currentEmail}
                  onChange={(e) => setCurrentEmail(e.target.value)}
                  type="email"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={handleAddEmail}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center gap-2"
                >
                  <FaPlus />
                  <span className="hidden sm:inline">Ekle</span>
                </motion.button>
              </div>

              {participants.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-2"
                >
                  {participants.map((email) => (
                    <motion.div
                      key={email}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between bg-purple-50 p-3 rounded-lg"
                    >
                      <span className="text-sm text-purple-800">{email}</span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={() => handleRemoveEmail(email)}
                        className="text-purple-600 hover:text-purple-800 transition-colors"
                      >
                        <FaTimes />
                      </motion.button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-all duration-200 ${isLoading
                  ? "bg-purple-400 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700"
                }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Oluşturuluyor...</span>
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  <span>Projeyi Oluştur</span>
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              <FaInfoCircle />
              Projeyi oluşturduktan sonra daha fazla üye ekleyebilirsiniz
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
