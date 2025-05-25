"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Project } from "@/types/project";

interface SelectedProjectContextType {
    selectedProject: Project | null;
    setSelectedProject: (project: Project | null) => void;
}

const SelectedProjectContext = createContext<SelectedProjectContextType | undefined>(undefined);

export const SelectedProjectProvider = ({ children }: { children: ReactNode }) => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <SelectedProjectContext.Provider value={{ selectedProject, setSelectedProject }}>
            {children}
        </SelectedProjectContext.Provider>
    );
};

export const useSelectedProject = () => {
    const context = useContext(SelectedProjectContext);
    if (!context) throw new Error("useSelectedProject must be used inside SelectedProjectProvider");
    return context;
};
