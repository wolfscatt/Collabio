import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { ProjectsProvider } from "@/context/ProjectsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Collabio",
  description: "Collabio Website",
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="tr" className={inter.className}>
      <body>
        <ProjectsProvider>
          {children}
        </ProjectsProvider>
      </body>
    </html>
  );
}
