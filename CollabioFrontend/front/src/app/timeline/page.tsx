"use client"
import React, { useState } from 'react'
import { FaCheck, FaFilter, FaUndo } from 'react-icons/fa';
import FilterSelect from '../../../components/TimelineComps/FilterSelect';
import ActivityItem from '../../../components/TimelineComps/ActivityItem';


const page = () => {
    const [filterOpen, setFilterOpen] = useState(false);
    const [date, setDate] = useState("today");
    const [activity, setActivity] = useState("all");
    const [status, setStatus] = useState("all");

    return (
        <div className="w-[83vw] min-w-[80vw] bg-[var(--color-background)] ml-[1vh] mt-[1vh] rounded-xl">
            <div className="flex flex-col gap-[2vh] mb-[2vh] p-[2vh] bg-white rounded-lg shadow">
                <div className="flex items-center gap-[2vw]">
                    <button
                        onClick={() => setFilterOpen(!filterOpen)}
                        className="flex items-center gap-[1vh] px-[2vh] py-[1vh] bg-[var(--color-primary)] text-white rounded cursor-pointer text-[1.6vh]"
                    >
                        <FaFilter /> Filtrele
                    </button>
                </div>

                {filterOpen && (
                    <div className="flex items-start flex-row gap-[2vh]">
                        <FilterSelect
                            label="Tarih Aralığı:"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            options={[
                                { value: 'all', label: 'Tüm zamanlar' },
                                { value: 'today', label: 'Bugün' },
                                { value: 'yesterday', label: 'Dün' },
                                { value: 'week', label: 'Son 7 gün' },
                                { value: 'month', label: 'Son 30 gün' },
                            ]}
                        />

                        <FilterSelect
                            label="Etkinlik Türü:"
                            value={activity}
                            onChange={e => setActivity(e.target.value)}
                            options={[
                                { value: 'all', label: 'Tüm etkinlikler' },
                                { value: 'task-created', label: 'Görev oluşturma' },
                                { value: 'task-updated', label: 'Görev güncelleme' },
                                { value: 'status-changed', label: 'Durum değişikliği' },
                                { value: 'comment-added', label: 'Yorum ekleme' },
                            ]}
                        />

                        <FilterSelect
                            label="Durum:"
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                            options={[
                                { value: 'all', label: 'Tüm durumlar' },
                                { value: 'yapilacak', label: 'YAPILACAK' },
                                { value: 'devam-ediyor', label: 'DEVAM EDİYOR' },
                                { value: 'tamam', label: 'TAMAM' },
                            ]}
                        />

                        <div className="flex gap-[2vh] p-[1vh] text-[1.8vh] mt-[2vh]">
                            <button className="flex items-center gap-[0.5vw] px-[2vh] bg-[var(--color-primary)] text-white rounded ">
                                <FaCheck /> Uygula
                            </button>
                            <button className="flex items-center gap-[0.5vw] px-[2vh] py-[0.5vh] bg-white border-[1px] border-black text-black rounded  ">
                                <FaUndo /> Sıfırla
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div className='flex flex-col w-[80vw] ml-[1vw] h-[100vh]'>
                <h1 className='text-[3vh] text-[var(--color-dark)] font-bold'>Proje Etkinlikleri</h1>
                <div className='flex flex-col mt-[3vh] gap-[2vw]'>
                    <div className='w-[80vw] border-b-2 py-[1vh]'>
                        <h1 className='text-[2.5vh] text-[var(--color-dark)] font-semibold'>Bugün</h1>
                    </div>
                    <div className='flex flex-col '>
                        <ActivityItem
                            time="10:45"
                            name="Bedirhan Özmen"
                            initials="BO"
                            status="TAMAM"
                            statusType="tamam"
                            course="COL-4: UX/UI Tasarımı"
                            message='konusunda "Revit" alanını güncellendi'
                        />

                        <ActivityItem
                            time="09:30"
                            name="Melike Danışmaz"
                            initials="MD"
                            status="YAPILACAKLAR"
                            statusType="yapilacaklar"
                            course="COL-9: Otomasyon projesi"
                            message='konusunda yorum ekledi: "Otomasyon test senaryoları hazırlanıyor"'
                            avatarBg="9c27b0"
                            avatarColor="fff"
                        />
                    </div>
                </div>
                <div className='flex flex-col mt-[3vh] gap-[2vw]'>
                    <div className='w-[80vw] border-b-2 py-[1vh]'>
                        <h1 className='text-[2.5vh] text-[var(--color-dark)] font-semibold'>Bugün</h1>
                    </div>
                    <div className='flex flex-col '>
                        <ActivityItem
                            time="10:45"
                            name="Bedirhan Özmen"
                            initials="BO"
                            status="TAMAM"
                            statusType="tamam"
                            course="COL-4: UX/UI Tasarımı"
                            message='konusunda "Revit" alanını güncellendi'
                        />

                        <ActivityItem
                            time="09:30"
                            name="Melike Danışmaz"
                            initials="MD"
                            status="YAPILACAKLAR"
                            statusType="yapilacaklar"
                            course="COL-9: Otomasyon projesi"
                            message='konusunda yorum ekledi: "Otomasyon test senaryoları hazırlanıyor"'
                            avatarBg="9c27b0"
                            avatarColor="fff"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default page
