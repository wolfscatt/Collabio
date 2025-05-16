import React from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'

interface FormDetailsProps {
    formType: 'gorev' | 'onay' | 'hata' | 'istek'
    onClose?: () => void
}

const formTitles: Record<FormDetailsProps['formType'], string> = {
    gorev: 'Görev Formu',
    onay: 'Onay Formu',
    hata: 'Hata Bildirim Formu',
    istek: 'İstek Formu',
}

const FormDetails: React.FC<FormDetailsProps> = ({ formType }) => {
    return (
        <div className="mt-[2vh] bg-white rounded-xl shadow p-[3vh]">
            {/* Üst Başlık */}
            <div
                className="bg-[var(--color-primary)] rounded-t-lg text-white px-[2vh] py-[2vh] flex items-center gap-[1vh]"
            >
                <img
                    src="/images/collabio-logo.png"
                    alt="logo"
                    className="w-[3vh] h-[3vh] object-contain rounded-sm"
                />
                <h2 className="text-[2vh] font-semibold">
                    Project Collabio - {formTitles[formType]}
                </h2>
            </div>

            {/* Özet */}
            <div className="mt-[3vh]">
                <label className="block text-[1.6vh] font-medium mb-[1vh]">
                    Özet <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    className="w-full border border-gray-200 rounded px-[1vh] py-[1.2vh] bg-[#f9f9ff]"
                    placeholder="Kısa açıklama girin..."
                />
            </div>

            {/* Açıklama (Quill gibi editör olabilir) */}
            <div className="mt-[3vh]">
                <label className="block text-[1.6vh] font-medium mb-[1vh]">
                    Açıklama
                </label>
                <textarea
                    className="w-full border border-gray-200 rounded min-h-[20vh] p-[1vh]"
                    placeholder="Detaylı açıklama girin..."
                ></textarea>
            </div>

            {/* Dosya ekleme */}
            <div className="mt-[3vh]">
                <label className="block text-[1.6vh] font-medium mb-[1vh]">Ek</label>
                <div className="border border-dashed border-gray-300 rounded p-[2vh] text-center text-[1.5vh] text-gray-500">
                    <FaCloudUploadAlt className="text-[3vh] mx-auto mb-[1vh] text-[var(--color-primary)]" />
                    Eklemek için dosyaları bırakın veya{' '}
                    <label className="inline-block underline cursor-pointer text-[var(--color-primary)]">
                        <input type="file" className="hidden" />
                        Göz At
                    </label>
                </div>
            </div>

            {/* Gönder butonu */}
            <div className="mt-[3vh] text-right">
                <button className="bg-[var(--color-primary)] text-white px-[3vh] py-[1.2vh] rounded font-medium text-[1.5vh]">
                    Gönder
                </button>
            </div>
        </div>
    )
}

export default FormDetails
