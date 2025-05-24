"use client";
import React, { useState } from 'react';
import { FaPlus, FaTimes, FaArrowLeft } from 'react-icons/fa';


const CreateProject = () => {
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [participants, setParticipants] = useState<string[]>([]);
    const [currentEmail, setCurrentEmail] = useState('');

    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleAddEmail = () => {
        const email = currentEmail.trim();

        if (email && isValidEmail(email) && !participants.includes(email)) {
            setParticipants([...participants, email]);
            setCurrentEmail('');
        } else if (!isValidEmail(email) && email) {
            alert('Lütfen geçerli bir e-posta adresi girin.');
        } else if (participants.includes(email)) {
            alert('Bu e-posta adresi zaten eklenmiş.');
            setCurrentEmail('');
        }
    };

    const handleRemoveEmail = (emailToRemove: string) => {
        setParticipants(participants.filter(email => email !== emailToRemove));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const projectData = {
            name: projectName,
            description: projectDescription,
            participants: participants
        };

        console.log('Proje oluşturuluyor:', projectData);
        alert('Proje başarıyla oluşturuldu!');
    };

    const handleCancel = () => {
        setProjectName('');
        setProjectDescription('');
        setParticipants([]);
        setCurrentEmail('');
    };

    const morRenk = '#8972e7';

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <header className="mb-8">
                <div className="flex items-center mb-6">
                    <button
                        onClick={handleCancel}
                        className="flex items-center mr-4"
                        style={{ color: morRenk }}
                    >
                        <FaArrowLeft className="mr-2" />
                        Geri Dön
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Yeni Proje Oluştur</h2>

                <div>
                    {/* Project Header */}
                    <div className="flex items-start mb-8">

                        <div className="flex-1">
                            <div className="mb-4">
                                <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-2">
                                    Proje Adı
                                </label>
                                <input
                                    type="text"
                                    id="projectName"
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8972e7] focus:border-transparent"
                                    placeholder="Projenin adını girin"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Project Description */}
                    <div className="mb-6">
                        <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700 mb-2">
                            Proje Açıklaması
                        </label>
                        <textarea
                            id="projectDescription"
                            value={projectDescription}
                            onChange={(e) => setProjectDescription(e.target.value)}
                            rows={5}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8972e7] focus:border-transparent resize-y"
                            placeholder="Projenin detaylı açıklamasını girin"
                        />
                    </div>

                    {/* Participants Section */}
                    <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-[#8972e7] mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Katılımcı Ekle</h3>
                        <p className="text-gray-600 mb-4">Projeye katılımcı eklemek için e-posta adreslerini girin.</p>

                        <div className="flex items-center mb-4">
                            <input
                                type="email"
                                value={currentEmail}
                                onChange={(e) => setCurrentEmail(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddEmail())}
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8972e7] focus:border-transparent mr-3"
                                placeholder="E-posta adresi girin"
                            />
                            <button
                                type="button"
                                onClick={handleAddEmail}
                                className="px-4 py-3 bg-[#8972e7] text-white rounded-lg hover:bg-[#6e57b5] transition-colors flex items-center justify-center"
                                aria-label="Katılımcı ekle"
                            >
                                <FaPlus />
                            </button>
                        </div>

                        {participants.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {participants.map((email, index) => (
                                    <div key={index} className="inline-flex items-center bg-[#8972e7] bg-opacity-20 text-[#8972e7] px-3 py-2 rounded-full text-sm">
                                        {email}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveEmail(email)}
                                            className="ml-2 transition-colors"
                                            style={{ color: morRenk }}
                                            aria-label={`Remove ${email}`}
                                        >
                                            <FaTimes className="text-xs" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                        >
                            İptal
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="px-6 py-3 bg-[#8972e7] text-white rounded-lg font-medium hover:bg-[#6e57b5] hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                        >
                            Proje Oluştur
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateProject;
