import React from 'react'
import { FaCode, FaCog, FaDatabase, FaLaptop, FaPaintBrush, FaStream } from 'react-icons/fa';
import ListRow from '../../../components/ListComps/ListRow';

const page = () => {
    const tasks = [
        {
            icon: <FaCode />,
            code: 'COL-3',
            summary: 'Api geliştirme',
            status: 'DEVAM EDİYOR',
            commentLength: 1,
            category: 'backend',
            categoryColor: '#cce5ff',
            assignee: { initials: 'ÖF', color: '#18a0fb' },
        },
        {
            icon: <FaLaptop />,
            code: 'COL-5',
            summary: 'Login Page kodlama',
            status: 'DEVAM EDİYOR',
            commentLength: 1,
            category: 'frontend',
            categoryColor: '#ffe5b4',
            assignee: { initials: 'CY', color: '#9c27b0' },
        },
        {
            icon: <FaDatabase />,
            code: 'COL-6',
            summary: 'Veri Tabanı Tasarımı Emre',
            status: 'DEVAM EDİYOR',
            commentLength: 0,
            category: 'database',
            categoryColor: '#ffebf0',
            assignee: { initials: 'EK', color: '#00bfa5' },
        },
        {
            icon: <FaPaintBrush />,
            code: 'COL-4',
            summary: 'UX/UI Tasarımı',
            status: 'TAMAMLANDI',
            commentLength: 0,
            category: 'ux/ui',
            categoryColor: '#e3dcff',
            assignee: { initials: 'BO', color: '#fdd835' },
        },
        {
            icon: <FaStream />,
            code: 'COL-12',
            summary: 'İş akışları',
            status: 'YAPILACAKLAR',
            commentLength: 0,
            category: 'iş analizi',
            categoryColor: '#d5ccff',
            assignee: { initials: 'BT', color: '#2979ff' },
        },
        {
            icon: <FaCog />,
            code: 'COL-9',
            summary: 'Otomasyon projesinin temel yapısını oluşturmak.',
            status: 'YAPILACAKLAR',
            commentLength: 4,
            category: 'test',
            categoryColor: '#e0d4f8',
            assignee: { initials: 'MD', color: '#ab47bc' },
        },
    ] as const;
    return (
        <div className="w-[83vw] ml-[1vh] mt-[1vh] rounded-xl overflow-hidden shadow-md bg-white">
            <table className="min-w-full text-left text-sm">
                <thead>
                    <tr className="bg-purple-100 h-[7vh] text-[1vw] text-purple-900">
                        <th className="px-[1vh] py-[0.5vh]"></th>
                        <th className="px-[1vh] py-[0.5vh]">Tür</th>
                        <th className="px-[1vh] py-[0.5vh]">Anahtar</th>
                        <th className="px-[1vh] py-[0.5vh]">Özet</th>
                        <th className="px-[1vh] py-[0.5vh]">Durum</th>
                        <th className="px-[1vh] py-[0.5vh]">Yorumlar</th>
                        <th className="px-[1vh] py-[0.5vh]">Kategori</th>
                        <th className="px-[1vh] py-[0.5vh]">Atanan</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, index) => (
                        <ListRow key={index} {...task} />
                    ))}
                </tbody>
            </table>
        </div>

    )
}

export default page
