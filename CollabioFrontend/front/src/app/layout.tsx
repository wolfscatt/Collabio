import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "../../components/SideBarComps/SideBar";
import TopBar from "../../components/TopBarComps/TopBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Collabio",
  description: "Collabio Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r">
          <Sidebar />
        </aside>

        {/* Main Area */}
        <div className="flex flex-col flex-1">
          {/* Top Navbar */}
          <TopBar />

          {/* Page Content */}
          <main className="overflow-auto bg-gray-100 flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
