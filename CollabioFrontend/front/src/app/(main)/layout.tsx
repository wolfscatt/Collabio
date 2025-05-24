import { SelectedProjectProvider } from "@/context/SelectedProjectContext";
import ProtectedRoute from "../../../components/ProtectedRoute";
import Sidebar from "../../../components/SideBarComps/SideBar";
import TopBar from "../../../components/TopBarComps/TopBar";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={`flex h-screen ${inter.className}`}>
            {/* Sidebar */}
            <ProtectedRoute>
                <SelectedProjectProvider>
                    <ToastContainer position="top-right" autoClose={5000} />
                    <aside className="w-[15vw] bg-white border-r">
                        <Sidebar />
                    </aside>
                    {/* Main Area */}
                    <div className="flex flex-col flex-1">
                        {/* Top Navbar */}
                        <TopBar />
                        {/* Page Content */}
                        <main className="overflow-auto bg-gray-100 flex-1">{children}</main>
                    </div>
                </SelectedProjectProvider>
            </ProtectedRoute>
        </div>
    );
}
