import React, { useState } from 'react';

interface NoteModalProps {
  isOpen: boolean;
  date: string;
  onClose: () => void;
  onSave: (note: string) => void;
  initialNote?: string;
}

const NoteModal: React.FC<NoteModalProps> = ({ isOpen, date, onClose, onSave, initialNote = '' }) => {
  const [note, setNote] = useState(initialNote);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[90vw] max-w-[400px] shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-purple-800">{date}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-2xl"
          >
            &times;
          </button>
        </div>
        <textarea
          className="w-full border border-gray-300 rounded-md p-2 text-sm min-h-[100px]"
          placeholder="Notunuzu yazın..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>
        <button
          onClick={() => onSave(note)}
          className="mt-4 w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600"
        >
          Kaydet
        </button>
      </div>
    </div>
  );
};

export default NoteModal;
