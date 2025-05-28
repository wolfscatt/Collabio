"use client";
import { FaTimes, FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Project } from "@/types/project";
import api from "@/lib/api";

type ModalFavoriProps = {
  onClose: () => void;
};

export default function ModalFavorites({ onClose }: ModalFavoriProps) {
  const [favorites, setFavorites] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      const token = localStorage.getItem("token");
      const res = await api.get("/users/favorites", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites(res.data.favorites);
      setLoading(false);
    };
    fetchFavorites();
  }, []);



  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-lg p-6 w-[90vw] max-w-md relative ${loading ? "opacity-70" : ""}`}
        onClick={(e) => e.stopPropagation()}
        style={{ borderTop: "4px solid #8972e7" }}
      >
        {/* Üstte başlık ve kapatma ikonu */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Favori Projeler</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-[#8972e7] transition text-2xl"
            aria-label="Kapat"          >
            <FaTimes />
          </button>
        </div>
        {/* Favori öğeler listesi */}
        {favorites.length > 0 ? (
          <ul className="space-y-3 max-h-[300px] overflow-y-auto">
            {favorites.map((favorite) => (
              <li key={favorite._id} className="flex items-center gap-3 p-2 border rounded">
                <span className="flex-grow font-medium">{favorite.name}</span>
                <FaStar className="text-yellow-400" />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Favori projeleriniz yok.</p>
        )}
        {loading &&
          <div className="flex-1 mt-[2vh] flex items-center justify-center">
            <div className="w-[4vw] h-[4vw] rounded-full animate-spin">
              <img src="/images/collabio-logo-c.png" alt="loading" className="w-full h-full" />
            </div>
          </div>}
      </div>
    </div>
  );
}
