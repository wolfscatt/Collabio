"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaSave, FaStar, FaPlus, FaUserMinus, FaCrown, FaTrash } from 'react-icons/fa';
import api from '@/lib/api';
import { toast } from 'react-toastify';
import { Project } from '@/types/project';

interface EditProjectProps {
    isOpen: boolean;
    onClose: () => void;
    project: Project | null;
    onProjectUpdate: () => void;
}

interface ProjectData {
    _id: string;
    owner: {
        _id: string;
        email?: string;
        username: string;
    };
    members: Array<{
        _id: string;
        email?: string;
        username: string;
    }>;
}

const EditProject: React.FC<EditProjectProps> = ({ isOpen, onClose, project, onProjectUpdate }) => {
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);
    const [userFavorites, setUserFavorites] = useState<string[]>([]);
    const [currentUser, setCurrentUser] = useState<{ id: string; email: string; username: string } | null>(null);
    const [currentEmail, setCurrentEmail] = useState('');
    const [isAddingMember, setIsAddingMember] = useState(false);
    const [projectMembers, setProjectMembers] = useState<{ id: string; email: string; username: string; isOwner: boolean }[]>([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchProjectMembers = useCallback(async () => {
        if (!project) return;
        try {
            const token = localStorage.getItem("token");
            const { data: projects } = await api.get<ProjectData[]>(`/projects/`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Seçilen projeyi bul
            const selectedProject = projects.find((p) => p._id === project._id);
            if (selectedProject) {
                // Önce proje sahibini ekle
                const ownerDetails = {
                    id: selectedProject.owner._id,
                    email: selectedProject.owner.email || 'Bilinmiyor',
                    username: selectedProject.owner.username,
                    isOwner: true
                };

                // Sonra diğer üyeleri ekle (owner'ı hariç tut)
                const memberDetails = selectedProject.members
                    .filter((member) => member._id !== selectedProject.owner._id)
                    .map((member) => ({
                        id: member._id,
                        email: member.email || 'Bilinmiyor',
                        username: member.username,
                        isOwner: false
                    }));

                // Tüm üyeleri birleştir (önce owner, sonra diğer üyeler)
                setProjectMembers([ownerDetails, ...memberDetails]);
            }
        } catch (error) {
            console.error('Üyeler alınamadı:', error);
            toast.error('Üyeler alınırken bir hata oluştu');
        }
    }, [project]);

    useEffect(() => {
        const fetchFavoriteStatus = async () => {
            if (!project) return;
            
            setIsFavoriteLoading(true);
            try {
                const token = localStorage.getItem("token");
                const res = await api.get<{ favorites: Project[] }>("/users/favorites", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                
                // Seçilen projenin favorilerde olup olmadığını kontrol et
                const isProjectFavorite = res.data.favorites.some((fav) => fav._id === project._id);
                setIsFavorite(isProjectFavorite);
            } catch (error) {
                console.error('Favori durumu alınamadı:', error);
            } finally {
                setIsFavoriteLoading(false);
            }
        };

        if (project) {
            setProjectName(project.name);
            setProjectDescription(project.description || '');
            
            // Kullanıcı bilgilerini localStorage'dan al
            const stored = localStorage.getItem("user");
            if (stored) {
                const userData = JSON.parse(stored);
                setCurrentUser({
                    id: userData.id,
                    email: userData.email,
                    username: userData.username
                });
                setUserFavorites(userData.favorites || []);
            }

            // Favori durumunu API'den kontrol et
            fetchFavoriteStatus();
            // Proje üyelerini al
            fetchProjectMembers();
        }
    }, [project, fetchProjectMembers]);

    // Proje sahibi kontrolü - localStorage'dan gelen kullanıcı ID'si ile karşılaştırma
    const isOwner = currentUser?.id === project?.owner._id;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!project || !isOwner) return;

        setIsLoading(true);
        try {
            await api.put(`/projects/${project._id}`, {
                name: projectName,
                description: projectDescription,
            });

            toast.success('Proje başarıyla güncellendi');
            onProjectUpdate();
            onClose();
        } catch (error) {
            toast.error('Proje güncellenirken bir hata oluştu');
            console.error('Proje güncelleme hatası:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleFavorite = async () => {
        if (!project || isFavoriteLoading) return;
        
        setIsFavoriteLoading(true);
        try {
            if (isFavorite) {
                // Favorilerden çıkar
                await api.delete(`/users/favorites/${project._id}`);
                setIsFavorite(false);
                toast.success('Proje favorilerden çıkarıldı');
            } else {
                // Favorilere ekle
                await api.post(`/users/favorites/${project._id}`);
                setIsFavorite(true);
                toast.success('Proje favorilere eklendi');
            }
            onProjectUpdate();
        } catch (error) {
            toast.error('Favori işlemi sırasında bir hata oluştu');
            console.error('Favori işlemi hatası:', error);
        } finally {
            setIsFavoriteLoading(false);
        }
    };

    const handleAddMember = async () => {
        if (!project || !isOwner || !currentEmail.trim()) return;

        setIsAddingMember(true);
        try {
            await api.post(`/projects/${project._id}/members`, { email: currentEmail.trim() });
            toast.success('Üye başarıyla eklendi');
            setCurrentEmail('');
            fetchProjectMembers();
        } catch (error) {
            toast.error('Üye eklenirken bir hata oluştu');
            console.error('Üye ekleme hatası:', error);
        } finally {
            setIsAddingMember(false);
        }
    };

    const handleRemoveMember = async (memberId: string) => {
        if (!project || !isOwner) return;

        try {
            await api.delete(`/projects/${project._id}/members/${memberId}`);
            toast.success('Üye başarıyla çıkarıldı');
            fetchProjectMembers();
        } catch (error) {
            toast.error('Üye çıkarılırken bir hata oluştu');
            console.error('Üye çıkarma hatası:', error);
        }
    };

    const handleDeleteProject = async () => {
        if (!project || !isOwner || isDeleting) return;

        setIsDeleting(true);
        try {
            await api.delete(`/projects/${project._id}`);
            toast.success('Proje başarıyla silindi');
            onProjectUpdate();
            onClose();
        } catch (error) {
            toast.error('Proje silinirken bir hata oluştu');
            console.error('Proje silme hatası:', error);
        } finally {
            setIsDeleting(false);
            setIsDeleteModalOpen(false);
        }
    };

    if (!isOpen || !project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-white rounded-xl shadow-xl w-full min-w-[35vw] max-w-3xl my-8"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-semibold text-gray-800">Proje Detayları</h2>
                                <div className="flex items-center gap-2">
                                    {isOwner && (
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setIsDeleteModalOpen(true)}
                                            className="p-2 rounded-full text-red-500 hover:bg-red-50 transition-colors duration-200"
                                            title="Projeyi Sil"
                                        >
                                            <FaTrash className="w-5 h-5" />
                                        </motion.button>
                                    )}
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={toggleFavorite}
                                        disabled={isFavoriteLoading}
                                        className={`p-2 rounded-full transition-colors duration-200 ${
                                            isFavorite 
                                                ? 'text-yellow-500 hover:bg-yellow-50' 
                                                : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
                                        }`}
                                        title={isFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
                                    >
                                        <FaStar className={`w-5 h-5 ${isFavoriteLoading ? 'animate-pulse' : ''}`} />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={onClose}
                                        className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
                                    >
                                        <FaTimes />
                                    </motion.button>
                                </div>
                            </div>

                            {isOwner ? (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Proje Adı
                                        </label>
                                        <input
                                            type="text"
                                            value={projectName}
                                            onChange={(e) => setProjectName(e.target.value)}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Proje Açıklaması
                                        </label>
                                        <textarea
                                            value={projectDescription}
                                            onChange={(e) => setProjectDescription(e.target.value)}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 min-h-[100px] resize-none"
                                        />
                                    </div>

                                    {/* Üye Yönetimi */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-medium text-gray-800">Proje Üyeleri</h3>
                                            <div className="flex gap-2">
                                                <input
                                                    type="email"
                                                    value={currentEmail}
                                                    onChange={(e) => setCurrentEmail(e.target.value)}
                                                    placeholder="Üye e-postası"
                                                    className="px-3 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                                />
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    type="button"
                                                    onClick={handleAddMember}
                                                    disabled={isAddingMember || !currentEmail.trim()}
                                                    className={`px-3 py-1 rounded-lg text-white flex items-center gap-1 ${isAddingMember || !currentEmail.trim()
                                                            ? 'bg-purple-400 cursor-not-allowed'
                                                            : 'bg-purple-600 hover:bg-purple-700'
                                                        }`}
                                                >
                                                    <FaPlus className="w-4 h-4" />
                                                    <span>Ekle</span>
                                                </motion.button>
                                            </div>
                                        </div>

                                        <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                                            {projectMembers.map((member) => (
                                                <motion.div
                                                    key={member.id}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className={`flex items-center justify-between p-2 rounded-lg ${member.isOwner ? 'bg-purple-50' : 'bg-gray-50'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        {member.isOwner ? (
                                                            <FaCrown className="w-5 h-5 text-yellow-500" />
                                                        ) : (
                                                            <div className="w-2 h-2 rounded-full bg-purple-500" />
                                                        )}
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <p className="font-medium text-gray-800">{member.username}</p>
                                                                {member.isOwner && (
                                                                    <span className="px-2 py-0.5 text-xs font-medium text-purple-700 bg-purple-100 rounded-full">
                                                                        Proje Sahibi
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {!member.isOwner && isOwner && (
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            onClick={() => handleRemoveMember(member.id)}
                                                            className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
                                                            title="Üyeyi Çıkar"
                                                        >
                                                            <FaUserMinus />
                                                        </motion.button>
                                                    )}
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        disabled={isLoading}
                                        className={`w-full py-3 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-all duration-200 ${isLoading
                                            ? 'bg-purple-400 cursor-not-allowed'
                                            : 'bg-purple-600 hover:bg-purple-700'
                                            }`}
                                    >
                                        {isLoading ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                <span>Kaydediliyor...</span>
                                            </>
                                        ) : (
                                            <>
                                                <FaSave />
                                                <span>Değişiklikleri Kaydet</span>
                                            </>
                                        )}
                                    </motion.button>
                                </form>
                            ) : (
                                <div className="space-y-4">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="font-medium text-gray-800 mb-2">Proje Adı</h3>
                                        <p className="text-gray-600">{project.name}</p>
                                    </div>
                                    {project.description && (
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h3 className="font-medium text-gray-800 mb-2">Proje Açıklaması</h3>
                                            <p className="text-gray-600">{project.description}</p>
                                        </div>
                                    )}
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="font-medium text-gray-800 mb-2">Proje Üyeleri</h3>
                                        <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                                            {projectMembers.map((member) => (
                                                <div key={member.id} className="flex items-center gap-3">
                                                    {member.isOwner ? (
                                                        <FaCrown className="w-5 h-5 text-yellow-500" />
                                                    ) : (
                                                        <div className="w-2 h-2 rounded-full bg-purple-500" />
                                                    )}
                                                    <div>
                                                        <p className="text-gray-600">{member.username}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Silme Onay Modalı */}
                            <AnimatePresence>
                                {isDeleteModalOpen && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4"
                                        onClick={() => setIsDeleteModalOpen(false)}
                                    >
                                        <motion.div
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0.9, opacity: 0 }}
                                            className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full"
                                            onClick={e => e.stopPropagation()}
                                        >
                                            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                                Projeyi Sil
                                            </h3>
                                            <p className="text-gray-600 mb-6">
                                                &ldquo;{project?.name}&rdquo; projesini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
                                            </p>
                                            <div className="flex justify-end gap-3">
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => setIsDeleteModalOpen(false)}
                                                    className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                                                >
                                                    İptal
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={handleDeleteProject}
                                                    disabled={isDeleting}
                                                    className={`px-4 py-2 rounded-lg text-white flex items-center gap-2 ${
                                                        isDeleting
                                                            ? 'bg-red-400 cursor-not-allowed'
                                                            : 'bg-red-600 hover:bg-red-700'
                                                    }`}
                                                >
                                                    {isDeleting ? (
                                                        <>
                                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                            <span>Siliniyor...</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FaTrash className="w-4 h-4" />
                                                            <span>Projeyi Sil</span>
                                                        </>
                                                    )}
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// Özel scrollbar stilleri
const styles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #c4b5fd;
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #a78bfa;
  }
`;

// Stil etiketini head'e ekle
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}

export default EditProject;
