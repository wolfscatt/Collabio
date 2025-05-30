import { SelectedProjectProvider } from "@/context/SelectedProjectContext";
import ProtectedRoute from "../../../components/ProtectedRoute";
import Sidebar from "../../../components/SideBarComps/SideBar";
import TopBar from "../../../components/TopBarComps/TopBar";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { ProjectsProvider } from "@/context/ProjectsContext";

const inter = Inter({ subsets: ["latin"] });

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={`flex h-screen ${inter.className}`}>
            {/* Sidebar */}
            <ProtectedRoute>
                <SelectedProjectProvider>
                    <ProjectsProvider>
                        <ToastContainer position="top-right" autoClose={5000} />
                        <aside className="w-[15vw] bg-white border-r">
                            <Sidebar />
                        </aside>
                        {/* Main Area */}
                        <div className="flex flex-col flex-1 ">
                            {/* Top Navbar */}
                            <TopBar />
                            {/* Page Content */}
                            <main className="overflow-auto bg-gray-100 flex-1 custom-scrollbar">{children}</main>
                        </div>
                    </ProjectsProvider>
                </SelectedProjectProvider>
            </ProtectedRoute>
        </div>
    );
}


const styles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 12px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #c4b5fd;
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #a78bfa;
  }
`;
