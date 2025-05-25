'use client'
import React, { useState } from 'react'
import { FaTasks, FaCheckCircle, FaBug, FaLightbulb } from 'react-icons/fa'
import FormTabs from '../../../../components/FormsComps/FormTabs'
import FormCard from '../../../../components/FormsComps/FormCard'
import FormDetails from '../../../../components/FormsComps/FormDetails'
import ProtectedRoute from '../../../../components/ProtectedRoute'

const FormlarPage = () => {
    const tabs = [
        { label: 'Tüm Formlar', value: 'tum' },
        { label: 'Görev Formları', value: 'gorev' },
        { label: 'Onay Formları', value: 'onay' },
        { label: 'Özel Formlar', value: 'ozel' },
    ]


    const [activeTab, setActiveTab] = useState('tum')
    const [openedForm, setOpenedForm] = useState<string | null>(null)



    const forms = [
        {
            category: 'gorev',
            title: 'Görev Formu',
            id: 'gorev',
            description: 'Yeni görev oluşturmak için standart form.',
            icon: <FaTasks />,
            label: 'Görev',
            onClick: () => alert('Görev Formu Açıldı'),
        },
        {
            category: 'onay',
            title: 'Onay Formu',
            id: 'onay',
            description: 'Görev onayları için kullanılan form.',
            icon: <FaCheckCircle />,
            label: 'Onay',
            onClick: () => alert('Onay Formu Açıldı'),
        },
        {
            category: 'ozel',
            title: 'Hata Bildirim Formu',
            id: 'hata',
            description: 'Hata ve sorunları bildirmek için kullanılan form.',
            icon: <FaBug />,
            label: 'Hata',
            onClick: () => alert('Hata Formu Açıldı'),
        },
        {
            category: 'ozel',
            title: 'İstek Formu',
            id: 'istek',
            description: 'Yeni özellik ve geliştirme istekleri için form.',
            icon: <FaLightbulb />,
            label: 'İstek',
            onClick: () => alert('İstek Formu Açıldı'),
        },
    ]

    const visibleForms =
        activeTab === 'tum'
            ? forms
            : forms.filter((form) => form.category === activeTab)

    const currentForm = forms.find((f) => f.id === openedForm)
    return (
        <ProtectedRoute>

            <div className="w-[83vw] mt-[1vw] ml-[1vw]">
                <FormTabs tabs={tabs} onChange={setActiveTab} />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[2vw] mt-[2vh]">
                    {visibleForms.map((form, i) => (
                        <div key={i}>
                            <FormCard
                                title={form.title}
                                description={form.description}
                                icon={form.icon}
                                label={form.label}
                                buttonText="Aç"
                                onClick={() => setOpenedForm(form?.id ?? null)}

                            />

                        </div>
                    ))}
                </div>
                <div className="flex w-full justify-center items-center">
                    <div className="mt-[4vh] w-[60vw] transition-all duration-300">
                        {currentForm ? (
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            <FormDetails formType={currentForm.id as any} />
                        ) : (
                            <div className="text-center text-gray-400 text-[1.5vh] italic">
                                Bir form seçildiğinde burada görünecek.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    )
}

export default FormlarPage
