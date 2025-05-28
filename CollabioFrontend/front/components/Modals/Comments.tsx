"use client";
import api from "@/lib/api";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperclip, FaTimes } from "react-icons/fa";

interface Comment {
    _id: string;
    content: string;
    authorUserId: {
        _id: string;
        username: string;
    };
    fileUrl?: string;
    fileName?: string;
    createdAt: string;
}

interface CommentModalProps {
    onClose: () => void;
    onSubmit: (comment: string, file?: File) => Promise<void>;
    taskId: string;
}

const CommentModal: React.FC<CommentModalProps> = ({ onClose, onSubmit, taskId }) => {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File>();

    useEffect(() => {
        setLoading(true);
        api
            .get<Comment[]>(`/comments/${taskId}`)
            .then(res => setComments(res.data))
            .catch(err => console.error("Yorumlar yüklenemedi:", err))
            .finally(() => setLoading(false));
    }, [taskId]);

    const handleFileClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleSend = async () => {
        if (!comment.trim() && !selectedFile) return;
        await onSubmit(comment.trim(), selectedFile);
        setComment("");
        setSelectedFile(undefined);
        // Yorum listesini yenile
        setLoading(true);
        api
            .get<Comment[]>(`/comments/${taskId}`)
            .then(res => setComments(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg p-4 w-[100vw] max-w-[50vw] max-h-[80vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl border-b-2 border-gray-300 pb-2 font-bold">
                        Yorumlar
                    </h1>
                    <button onClick={onClose} aria-label="Kapat" className="text-gray-600 hover:text-purple-600">
                        <FaTimes />
                    </button>
                </div>

                <motion.div
                    className="flex flex-col gap-2 mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    {loading ? (
                        <div className="flex items-center justify-center h-[200px]">
                            <motion.div
                                className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                        </div>
                    ) : (
                        <AnimatePresence>
                            {comments.length > 0 ? (
                                <motion.ul
                                    className="space-y-3"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {comments.map((c, i) => (
                                        <motion.li
                                            key={c._id}
                                            className="flex items-center gap-4"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                        >
                                            <img
                                                src={`https://ui-avatars.com/api/?name=${c.authorUserId.username}&background=9c27b0&color=fff`}
                                                alt={c.authorUserId.username}
                                                className="w-[4vh] h-[4vh] rounded-full"
                                            />
                                            <div className="flex-1">
                                                <div className="flex justify-between">
                                                    <span className="font-medium text-lg">
                                                        {c.authorUserId.username.toUpperCase()}
                                                    </span>
                                                    <span className="text-sm text-gray-500">
                                                        {new Date(c.createdAt).toLocaleString("tr-TR")}
                                                    </span>
                                                </div>
                                                <p className="text-gray-700">{c.content}</p>
                                                {c.fileUrl && (
                                                    <a
                                                        href={c.fileUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-block mt-1 text-blue-600 underline text-sm"
                                                    >
                                                        {c.fileName || "Dosya"}
                                                    </a>
                                                )}
                                            </div>
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            ) : (
                                <motion.p
                                    className="text-gray-500 text-center py-8"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    Henüz yorum yok.
                                </motion.p>
                            )}
                        </AnimatePresence>
                    )}
                </motion.div>

                <div className="mb-4">
                    <textarea
                        rows={2}
                        className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Yorumunuzu yazın..."
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                    />
                    <div className="flex items-center justify-between mt-2">
                        <button
                            type="button"
                            onClick={handleFileClick}
                            className="flex items-center gap-2 px-2 py-1 bg-gray-200 rounded hover:bg-purple-600 hover:text-white transition"
                        >
                            <FaPaperclip /> Dosya Ekle
                        </button>
                        {selectedFile && (
                            <span className="text-sm text-gray-700">
                                {selectedFile.name}
                            </span>
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
                    >
                        İptal
                    </button>
                    <button
                        onClick={async () => {
                            await handleSend();
                            onClose();
                        }}
                        className="px-4 py-2 rounded text-white bg-purple-600 hover:bg-purple-700 transition"
                    >
                        Gönder
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommentModal;
