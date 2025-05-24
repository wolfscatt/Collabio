import React, { useState } from 'react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File | null, description: string, tags: string[]) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [inputTag, setInputTag] = useState('');

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputTag.trim()) {
      setTags([...tags, inputTag.trim()]);
      setInputTag('');
      e.preventDefault();
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleUpload = () => {
    onUpload(selectedFile, description, tags);
    setSelectedFile(null);
    setDescription('');
    setTags([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg overflow-hidden">
        <div
          className="text-white px-6 py-3 text-lg font-semibold flex justify-between items-center"
          style={{ backgroundColor: '#8972e7' }}
        >
          Dosya Yükle
          <button onClick={onClose} className="text-white text-xl">&times;</button>
        </div>

        <div className="p-6">
          <div
            className="border-2 border-dashed rounded flex justify-center items-center py-6 mb-4"
            style={{ borderColor: '#8972e7' }}
          >
            <label className="cursor-pointer font-medium" style={{ color: '#8972e7' }}>
              <input type="file" onChange={handleFileChange} className="hidden" />
              Dosya Seç
            </label>
          </div>

          {selectedFile && (
            <p className="mb-4 text-sm text-gray-700 font-medium">Seçilen: {selectedFile.name}</p>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama (İsteğe bağlı)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Dosya hakkında kısa bir açıklama yazın..."
              className="w-full border rounded p-2"
              style={{ borderColor: '#8972e7' }}
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Etiketler (İsteğe bağlı)</label>
            <input
              value={inputTag}
              onChange={(e) => setInputTag(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Etiket eklemek için yazın ve Enter'a basın"
              className="w-full border rounded p-2"
              style={{ borderColor: '#8972e7' }}
            />
            <div className="flex flex-wrap mt-2 gap-2">
              {tags.map((tag, idx) => (
                <span key={idx} className="px-2 py-1 rounded-full text-sm flex items-center" style={{ backgroundColor: '#ede9fd', color: '#6b46c1' }}>
                  {tag}
                  <button
                    className="ml-1 text-xs text-red-500"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end px-6 py-4 bg-gray-50">
          <button
            onClick={onClose}
            className="mr-3 px-4 py-2 rounded text-[#8972e7] bg-[#dcd3fc] hover:bg-[#c6b7f7]"
          >
            İptal
          </button>
          <button
            onClick={handleUpload}
            className="px-4 py-2 rounded text-white"
            style={{ backgroundColor: '#8972e7' }}
            disabled={!selectedFile}
          >
            Yükle
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
