import React from 'react'

interface FilterModalProps {
    open: boolean;
    onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ open }) => {
    if (!open) return null;

  return (
    <select>
        <div className="fixed z-[1000] left-0 top-0 w-full h-full bg-black bg-opacity-50 animate-fadeIn">
            <div className="bg-white mt-[5%] mx-auto rounded-lg w-[80%] max-w-[800px] shadow-lg animate-slideDown max-h-[80vh] flex flex-col overflow-hidden">
                <h2 className="text-xl font-semibold text-[var(--color-dark)]">Filtrele</h2>
            </div>
        </div>
    </select>
  )
}

export default FilterModal
