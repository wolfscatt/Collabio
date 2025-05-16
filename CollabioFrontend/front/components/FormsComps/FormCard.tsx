import React from 'react'
import { FaTasks } from 'react-icons/fa'

interface FormCardProps {
    title: string
    description: string
    icon?: React.ReactNode
    label: string
    buttonText: string
    onClick: () => void
    color?: string // varsayılan: var(--color-primary)
}

const FormCard: React.FC<FormCardProps> = ({
    title,
    description,
    icon = <FaTasks />,
    label,
    buttonText,
    onClick,
    color = 'var(--color-primary)',
}) => {
    return (
        <div
            className="bg-white rounded-lg flex flex-col justify-between shadow hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 overflow-hidden "
        >
            <div
                className="text-white px-[2vh] py-[2vh] text-[2.1vh] font-semibold"
                style={{ backgroundColor: color }}
            >
                {title}
            </div>

            <div className="px-[2vh] py-[2vh] text-[1.8vh] font-semibold text-gray-800">
                {description}
            </div>

            <div className="flex  justify-between items-center border-t px-[2vh] py-[2vh] border-gray-200">
                <span className="text-[2vh] text-black flex items-center gap-[1vh]">
                    {icon} {label}
                </span>
                <button
                    onClick={onClick}
                    className="bg-[var(--color-primary)] hover:brightness-110 text-white text-[1.4vh] font-medium px-[2vh] py-[0.8vh] rounded"
                >
                    {buttonText}
                </button>
            </div>
        </div>
    )
}

export default FormCard
