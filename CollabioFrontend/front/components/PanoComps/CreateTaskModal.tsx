"use client"
import { useSelectedProject } from "@/context/SelectedProjectContext";
import api from "@/lib/api";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";


interface CreateTaskModalProps {
    open: boolean;
    onClose: () => void;
    onTaskCreated?: () => void;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
    open,
    onClose,
    onTaskCreated,
}) => {
    const { selectedProject } = useSelectedProject();
    const router = useRouter();

    useEffect(() => {
        if (open) {
            console.log("Modal açıkken proje verisi:", selectedProject);
        }
    }, [open, selectedProject]);

    if (!open) return null;

    const TaskTags = [
        "Backend",
        "Frontend",
        "Database",
        "UX/UI",
        "İş Analizi",
        "Test",
    ]




    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const priority = formData.get("priority") as string;
        const assignee = formData.get("assignee") as string;
        const tag = formData.get("tag") as string;
        const dueDate = formData.get("dueDate") as string;
        if (!selectedProject?._id) return;

        try {
            const res = await api.post("/tasks", {
                title,
                description,
                priority,
                assignee,
                tags: [tag],
                projectId: selectedProject._id,
                status: "to-do",
                startDate: new Date().toISOString(),
                endDate: new Date(dueDate).toISOString(),
            });

            console.log("Görev başarıyla oluşturuldu:", res.data);
            toast.success("Görev başarıyla eklendi!");
            
            // Önce modalı kapat
            onClose();
            
            // Sonra callback'i çağır ve router.refresh() yap
            if (onTaskCreated) {
                onTaskCreated();
                // Kısa bir gecikme ile router.refresh() çağır
                setTimeout(() => {
                    router.refresh();
                }, 100);
            }
        } catch (err) {
            console.error("Görev oluşturulamadı:", err);
            toast.error("Görev oluşturulurken bir hata oluştu!");
        }
    };
    const hasAssignees = !!selectedProject?.members?.length;
    return (
        <div className="fixed z-[1000] left-0 top-0 w-full h-full bg-black bg-opacity-50 animate-fadeIn">
            <div className="bg-white mt-[5%] mx-auto rounded-lg w-[80%] max-w-[800px] shadow-lg animate-slideDown max-h-[80vh] flex flex-col overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-gray-100 rounded-t-lg">
                    <h2 className="text-xl font-semibold text-[var(--color-dark)]">Yeni Görev Ekle</h2>
                    <span
                        onClick={onClose}
                        className="text-2xl font-bold text-gray-400 cursor-pointer hover:text-[var(--color-primary)]"
                    >
                        &times;
                    </span>
                </div>

                {/* Body */}
                <div className="px-6 py-5 overflow-y-auto">
                    <form id="add-task-form" onSubmit={handleSubmit}>
                        <input type="hidden" name="columnId" value="" />

                        <div className="mb-4">
                            <label htmlFor="task-title" className="block font-medium mb-1">
                                Görev Başlığı
                            </label>
                            <input
                                type="text"
                                id="task-title"
                                name="title"
                                className="w-full border border-gray-300 px-3 py-2 rounded"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="task-description" className="block font-medium mb-1">
                                Görev Açıklaması
                            </label>
                            <textarea
                                id="task-description"
                                name="description"
                                className="w-full border border-gray-300 px-3 py-2 rounded"
                                placeholder="Görev Açıklaması"
                                required
                            />
                        </div>

                        <div className="mb-4 flex flex-row gap-2">
                            <div className="w-full">
                                <label htmlFor="task-priority" className="block font-medium mb-1">
                                    Öncelik
                                </label>
                                <select
                                    id="task-priority"
                                    name="priority"
                                    className="w-full border border-gray-300 px-3 py-2 rounded"
                                >
                                    <option value="high">Yüksek</option>
                                    <option value="medium">Orta</option>
                                    <option value="low">Düşük</option>
                                </select>
                            </div>
                            <div className="w-full">
                                <label htmlFor="task-priority" className="block font-medium mb-1">
                                    Görev Etiketi
                                </label>
                                <select
                                    id="task-tag"
                                    name="tag"
                                    className="w-full border border-gray-300 px-3 py-2 rounded"
                                >
                                    {TaskTags.map((tag) => (
                                        <option key={tag} value={tag}>
                                            {tag}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="mb-4 flex flex-row gap-2">
                            <div className="mb-4 w-full">
                                <label htmlFor="task-due-date" className="block font-medium mb-1">
                                    Teslim Tarihi
                                </label>
                                <input
                                    type="date"
                                    id="task-due-date"
                                    name="dueDate"
                                    className="w-full border border-gray-300 px-3 py-1 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4 w-full">
                                <label htmlFor="task-assignee" className="block font-medium mb-1">
                                    Sorumlu
                                </label>
                                {selectedProject?.members?.length ? (
                                    <select
                                        id="task-assignee"
                                        name="assignee"
                                        className="w-full border border-gray-300 px-3 py-2 rounded"
                                    >
                                        {selectedProject.members.map((member: User) => (
                                            <option key={member._id} value={member._id}>
                                                {member.username}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <p className="text-sm text-gray-500">Projeye ait kullanıcı bulunamadı.</p>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                            >
                                İptal
                            </button>
                            <button
                                type="submit"
                                disabled={!hasAssignees}
                                className={`px-4 py-2 rounded transition ${hasAssignees
                                    ? "bg-[var(--color-primary)] text-white hover:opacity-90"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                            >Ekle
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateTaskModal;
