import React from 'react'

const ProjectCart = ({name, description}: {name: string, description: string}) => {
    return (
        <div className="bg-white w-[25vw] rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-1" style={{ borderLeft: '4px solid #8972e7' }}>
            <div className="flex items-center gap-4 mb-4">
                <div className="w-9 h-9 rounded flex items-center justify-center" style={{ backgroundColor: '#8972e7' }}>
                    <span className="text-white font-bold text-sm">C</span>
                </div>
                <div>
                    <div className="font-semibold text-gray-800 text-lg">{name}</div>
                    <div className="text-gray-600 text-sm">{description}</div>
                </div>
            </div>
        </div>
    )
}

export default ProjectCart
