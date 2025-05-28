"use client";
import React from 'react';
import ProjectFiles from '../../../../components/FileComps/FileUploader';
import { motion } from 'framer-motion';

export default function FilesPage() {
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 p-6"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <ProjectFiles />
      </motion.div>
    </motion.main>
  );
}
