import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { Attachment } from '@/types/attachment'
import { FaCalendarAlt, FaDownload, FaUser } from 'react-icons/fa'

const FileRow = ({ file, handleDownload, handleDelete, icon }: { file: Attachment, handleDownload: (file: Attachment) => void, handleDelete: (id: string) => void, icon: React.ReactNode }) => {
    return (
        <div
            key={file._id}
            className="flex items-center bg-white p-4 rounded shadow-sm"
        >
            <div className="mr-4 text-2xl">{icon}</div> 
            <div className="flex-1">
                <div className="font-semibold text-lg text-black">{file.fileName}</div>
                <div className="text-sm text-gray-700 flex gap-4 items-center">
                    <span className="flex items-center gap-1">
                        <FaCalendarAlt className="text-[#8972e7]" /> {file.createdAt}
                    </span>
                    <span className="flex items-center gap-1">
                        <FaUser className="text-[#8972e7]" /> {file.uploadedBy}
                    </span>
                </div>
            </div>
            <div className="flex gap-3 items-center">
                <FaDownload
                    title="İndir"
                    className="text-[#8972e7] cursor-pointer"
                    onClick={() => handleDownload(file)}
                />
                <FaTrash
                    title="Sil"
                    className="text-[#8972e7] cursor-pointer"
                    onClick={() => handleDelete(file._id || '')}
                />
            </div>
        </div>
    )
}

export default FileRow
