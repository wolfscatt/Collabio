"use client";
import { FaTimes, FaStar } from "react-icons/fa";

type ModalFavoriProps = {
  onClose: () => void;
};

export default function ModalFavorites({ onClose }: ModalFavoriProps) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 w-[90vw] max-w-md relative"
        onClick={(e) => e.stopPropagation()}
        style={{ borderTop: "4px solid #8972e7" }}
      >
        {/* Üstte başlık ve kapatma ikonu */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Favori Projeler</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-[#8972e7] transition text-2xl"
            aria-label="Kapat"
          >
            <FaTimes />
          </button>
        </div>


        {/* Favori öğeler listesi */}
        <ul className="space-y-3 max-h-[300px] overflow-y-auto">
          <li className="flex items-center gap-3 p-2 border rounded">
            <span className="flex-grow font-medium">Collabio</span>
            <FaStar className="text-yellow-400" />
          </li>
        </ul>
      </div>
    </div>
  );
}
