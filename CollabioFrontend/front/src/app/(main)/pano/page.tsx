"use client";
import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import TaskBoard from '../../../../components/PanoComps/TaskBoard';
import CreateTaskModal from '../../../../components/PanoComps/CreateTaskModal';
import { useSelectedProject } from '@/context/SelectedProjectContext';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectOwner {
  _id: string;
  username?: string;
  email?: string;
  role?: string;
}

const Page = () => {
  const { selectedProject } = useSelectedProject();
  const [isOwner, setIsOwner] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [reload, setReload] = useState(false);

  // 1) LocalStorage'daki user.id ile project.owner karşılaştır
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored || !selectedProject) {
      setIsOwner(false);
      return;
    }
    const { id: myId } = JSON.parse(stored);
    // owner sahipse, string veya populate edilmiş obje olabilir
    const projOwnerId = typeof selectedProject.owner === "string"
      ? selectedProject.owner
      : (selectedProject.owner as ProjectOwner)?._id;
    setIsOwner(projOwnerId === myId);
  }, [selectedProject]);

  const handleAddClick = () => {
    if (!isOwner) {
      toast.error("Görev ekleme yetkiniz yok!");
      return;
    }
    setModalOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-[83vw] ml-[1vh] mt-[1vh]"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className='flex h-[7vh] bg-white flex-row items-center rounded-xl justify-between'
      >
        <motion.h1
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className='text-[2.5vh] text-[var(--color-primary)] ml-[2vh] font-bold'
        >
          Görev Panosu
        </motion.h1>

        <motion.button
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={isOwner ? { scale: 1.02, y: -4 } : {}}
          whileTap={isOwner ? { scale: 0.98 } : {}}
          onClick={handleAddClick}
          disabled={!isOwner}
          className={`
            relative mr-[2vh] flex flex-row h-[4.5vh] w-[8vw] items-center gap-2
            px-4 py-2 rounded-xl transition-all duration-300
            ${isOwner
              ? "bg-[var(--color-primary)] text-[var(--color-white)] hover:shadow-lg cursor-pointer"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }
          `}
        >
          <motion.div
            animate={isOwner ? { rotate: [0, 10, -10, 0] } : {}}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
          >
            <FaPlus className='text-[2.5vh]' />
          </motion.div>
          <p className='text-[1.7vh]'>Görev Ekle</p>
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <CreateTaskModal
              open={isModalOpen}
              onClose={() => setModalOpen(false)}
              onTaskCreated={() => setReload(prev => !prev)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex h-full w-full"
      >
        <TaskBoard reload={reload} />
      </motion.div>
    </motion.div>
  );
};

export default Page;
