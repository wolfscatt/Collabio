"use client";
import React, { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { toast } from "react-toastify";

interface Props {
  ownerId: string; // parent’tan gelen ObjectId string’i
}

const CreateProject = ({ ownerId }: Props) => {
  const router = useRouter();
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [participants, setParticipants] = useState<string[]>([]); // burada email dizisi
  const [currentEmail, setCurrentEmail] = useState("");

  const handleAddEmail = () => {
    const email = currentEmail.trim().toLowerCase();
    if (!email) return toast.error("E-posta girin.");
    if (participants.includes(email))
      return toast.error("Bu e-posta zaten eklendi.");
    setParticipants([...participants, email]);
    setCurrentEmail("");
  };

  const handleRemoveEmail = (email: string) =>
    setParticipants(participants.filter((e) => e !== email));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim())
      return toast.error("Proje adı boş olamaz.");

    try {
      // 1) Her e-posta için kullanıcıyı çekelim
      const lookups = await Promise.all(
        participants.map((email) =>
          api.get("/summary", { params: { email } })
        )
      );

      // 2) Dönenlerden ID'leri çıkaralım
      const memberIds: string[] = lookups.map((res) => {
        const user = res.data;
        if (!user || !user._id) {
          throw new Error("Kullanıcı bulunamadı");
        }
        return user._id as string;
      });

      // 3) POST gövdesi
      const projectData = {
        name: projectName,
        description: projectDescription,
        owner: ownerId,
        members: memberIds,
      };

      // 4) Proje oluştur
      await api.post("/projects", projectData);
      toast.success("Proje başarıyla oluşturuldu!");
      router.push("/summary");
    } catch (err: any) {
      console.error(err);
      // Eğer lookup sırasında hata ise
      if (err.response?.status === 404) {
        toast.error("Listeden en az bir e-posta karşılığı kullanıcı bulunamadı.");
      } else {
        toast.error("Proje oluşturulurken hata oluştu.");
      }
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl mb-4">Yeni Proje Oluştur</h2>
      <form onSubmit={handleSubmit}>
        {/* Proje Adı */}
        <div className="mb-4">
          <label>Proje Adı</label>
          <input
            className="w-full border p-2 rounded"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>

        {/* Proje Açıklaması */}
        <div className="mb-4">
          <label>Proje Açıklaması</label>
          <textarea
            className="w-full border p-2 rounded"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
        </div>

        {/* Member Email Ekleme */}
        <div className="mb-6">
          <label>Üye E-posta Ekle</label>
          <div className="flex mt-1">
            <input
              className="flex-1 border p-2 rounded"
              placeholder="Üye e-postası"
              value={currentEmail}
              onChange={(e) => setCurrentEmail(e.target.value)}
            />
            <button
              type="button"
              onClick={handleAddEmail}
              className="ml-2 bg-blue-600 text-white px-4 rounded"
            >
              <FaPlus />
            </button>
          </div>
          {participants.length > 0 && (
            <ul className="mt-2 space-y-1">
              {participants.map((email) => (
                <li
                  key={email}
                  className="flex items-center justify-between bg-gray-100 p-2 rounded"
                >
                  {email}
                  <button
                    type="button"
                    onClick={() => handleRemoveEmail(email)}
                    className="text-red-600"
                  >
                    <FaTimes />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
        
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Proje Oluştur
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
