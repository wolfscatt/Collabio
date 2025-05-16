'use client'
import React, { useState } from 'react'

interface TabItem {
    label: string
    value: string
}

interface FormTabsProps {
    tabs: TabItem[]
    onChange?: (active: string) => void
}

const FormTabs: React.FC<FormTabsProps> = ({ tabs, onChange }) => {
    const [active, setActive] = useState<string>(tabs[0]?.value || '')

    const handleClick = (value: string) => {
        setActive(value)
        onChange?.(value)
    }

    return (
        <div className="flex mb-[2vh] border-b border-[#eee]">
            {tabs.map((tab) => (
                <div
                    key={tab.value}
                    onClick={() => handleClick(tab.value)}
                    className={`px-[2vw] py-[1vh] cursor-pointer border-b-[0.4vh] font-medium text-[2.1vh] transition-all
            ${active === tab.value
                            ? 'text-[var(--color-primary)] border-[var(--color-primary)]'
                            : 'text-[var(--color-light)] border-transparent hover:text-[var(--color-dark)] hover:border-[#ddd]'
                        }
          `}
                >
                    {tab.label}
                </div>
            ))}
        </div>
    )
}

export default FormTabs
