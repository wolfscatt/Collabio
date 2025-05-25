"use client";
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import UploadModal from './UploadModal';
import FileRow from './FileRow';
import { Attachment } from '@/types/attachment';
import { getIconByExtension } from '@/utils/iconUtils';

const ProjectFiles: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [files, setFiles] = useState([
    {
      _id: "1",
      fileUrl: '/files/ProjeGereksinimleri.pdf', // Örnek dosya url'si (sunucunda olmalı)
      fileName: 'Proje Gereksinimleri.pdf',
      createdAt: '15 May 2025',
      uploadedBy: 'Bedirhan Özmen',
      taskId: '1',
    },
    {
      _id: "2",
      fileUrl: '/files/ArayuzTasarimi.png',
      fileName: 'Arayüz Tasarımı.png',
      createdAt: '14 May 2025',
      uploadedBy: 'Ceren Yolur',
      taskId: '2',
    },
    {
      _id: "3",
      fileUrl: '/files/ToplantiNotlari.docx',
      fileName: 'Toplantı Notları.docx',
      createdAt: '12 May 2025',
      uploadedBy: 'Bahri Talha Baş',
      taskId: '3',
    },
    {
      _id: "4",
      fileUrl: '/files/ButcePlanlamasi.xlsx',
      fileName: 'Bütçe Planlaması.xlsx',
      createdAt: '10 May 2025',
      uploadedBy: 'Melike Danışmaz',
      taskId: '4',
    },
    {
      _id: "5",
      fileUrl: '/files/KaynakKodlari.zip',
      fileName: 'Kaynak Kodları.zip',
      createdAt: '8 May 2025',
      uploadedBy: 'Ömer Faruk Bingöl',
      taskId: '5',
    },
  ]);


  const handleDownload = (file: Attachment) => {
    if (file.fileUrl) {
      const link = document.createElement('a');
      link.href = file.fileUrl;
      link.download = file.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('Dosya indirilemiyor: Dosya URL\'si bulunamadı.');
    }
  };


  const handleDelete = (id: string) => {
    if (window.confirm('Bu dosyayı silmek istediğinize emin misiniz?')) {
      setFiles((prevFiles) => prevFiles.filter((file) => file._id !== id));
    }
  };

  const handleUpload = (file: File | null) => {
    if (!file) return; // null geldiyse hiçbir şey yapma
    // const newFile = {
    //   id: Date.now(),
    //   name: file.name,
    //   date: new Date().toLocaleDateString('tr-TR', {
    //     day: '2-digit',
    //     month: 'short',
    //     year: 'numeric',
    //   }),
    // };

    setIsModalOpen(false);
  };


  return (
    <div className="p-6 text-black">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-[#8972e7]">Proje Ekleri</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#8972e7] hover:bg-[#7f67e0] text-white px-4 py-2 rounded"
        >
          Dosya Yükle
        </button>
      </div>

      <UploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpload={handleUpload}
      />

      <div className="bg-[#f3f0fd] p-4 rounded mb-6 flex flex-wrap gap-4 items-center">
        <select className="p-2 rounded border">
          <option>Tümü</option>
        </select>
        <select className="p-2 rounded border">
          <option>En yeni</option>
        </select>
        <select className="p-2 rounded border">
          <option>Tümü</option>
        </select>
        <div className="relative ml-auto">
          <input
            type="text"
            placeholder="Dosya adı ara..."
            className="p-2 pl-10 rounded border w-64"
          />
          <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>

      <div className="space-y-4">
        {files.map((file) => (
          <FileRow key={file._id} icon={getIconByExtension(file.fileName)} file={file} handleDownload={handleDownload} handleDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default ProjectFiles;
