"use client"
import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import TaskBoard from '../../../../components/PanoComps/TaskBoard'
import CreateTaskModal from '../../../../components/PanoComps/CreateTaskModal'

const Page = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [reload, setReload] = useState(false);

  return (
    <div className="w-[83vw] ml-[1vh] mt-[1vh]">
      <div className='flex h-[7vh] bg-white flex-row items-center rounded-xl justify-between'>
        <h1 className='text-[2.5vh] text-[var(--color-primary)] ml-[2vh] font-bold'>Görev Panosu</h1>
        <button
          className="relative mr-[2vh] flex flex-row h-[4.5vh] w-[8vw] items-center gap-2 
          bg-[var(--color-primary)] text-[var(--color-white)] px-4 py-2 rounded-xl 
          transition-all duration-300 hover:-translate-y-[0.4vh]  hover:animate-wave"
          onClick={() => setModalOpen(true)}
        >
          <FaPlus className='text-[2.5vh]' />
          <p className='text-[1.7vh]'>Görev Ekle</p>
        </button>
      </div>
      <CreateTaskModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        onTaskCreated={() => setReload(prev => !prev)}
      />
      <div className="flex h-screen w-full">
      <TaskBoard reload={reload} />
      </div>

    </div>
  )
}

export default Page

