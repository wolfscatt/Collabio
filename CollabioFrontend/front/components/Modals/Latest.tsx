"use client";

import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { useProjectActivity } from "@/hooks/useProjectActivity";
import Link from "next/link";

type ModalLatestProps = {
  onClose: () => void;
};

export default function ModalLatest({ onClose }: ModalLatestProps) {
  const [search, setSearch] = useState("");
  const { entries, loading } = useProjectActivity();

  const filteredItems = entries.filter((item) =>
    item.taskTitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-lg p-6 w-[90vw] backdrop-blur-sm max-w-md shadow-xl ${loading ? "opacity-70" : ""}`}
        onClick={(e) => e.stopPropagation()}
        style={{ borderTop: "6px solid #8972e7" }}
      >
        {/* Başlık ve Kapat */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#8972e7]">En Son</h2>
          <button
            onClick={onClose}
            className="text-2xl text-[#8972e7] hover:text-purple-700"
          >
            <IoClose />
          </button>
        </div>

        {/* Arama */}
        <input
          type="text"
          placeholder="Son öğeleri arayın..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#8972e7]"
        />

        {/* Liste */}
        <ul className="space-y-3 max-h-[300px] overflow-y-auto text-sm text-gray-700">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <Link href={`/timeline`} key={index} onClick={onClose}>
                <li key={index} className="flex bg-gray-100 mb-[1vh] hover:bg-gray-200 rounded-lg p-2 items-center gap-3">
                  <span>{item.taskTitle}</span>
                </li>
              </Link>
            ))
          ) : (
            <li className="text-gray-400 italic">Eşleşen öğe bulunamadı.</li>
          )}
        </ul>
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
