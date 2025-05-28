"use client";
import React, { createContext, useContext, useState } from 'react';

interface ProjectsContextType {
  refreshProjects: () => void;
  setRefreshProjects: (callback: () => void) => void;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  const [refreshProjects, setRefreshProjects] = useState<() => void>(() => {});

  return (
    <ProjectsContext.Provider value={{ refreshProjects, setRefreshProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
} 