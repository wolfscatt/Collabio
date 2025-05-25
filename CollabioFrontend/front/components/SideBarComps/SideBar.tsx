import SidebarButton from "./SidebarButton";
import {
  FaClock,
  FaCompass,
  FaFilter,
  FaStar,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { MdApps } from "react-icons/md";
import { LuListTodo } from "react-icons/lu";
import { FiPlus } from "react-icons/fi";
import { CiBoxList, CiViewList } from "react-icons/ci";
import { FaTableColumns } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";

export default function Sidebar() {
  return (
    <nav className="w-full min-w-[240px] bg-white h-screen p-4 border-r border-[var(--color-medium)] flex flex-col gap-[2vh] overflow-y-auto">
      <div className="w-full h-[8vh] p-6 mb-2 border-b border-[var(--color-medium)] bg-white flex items-center justify-center overflow-hidden">
        <img
          src="images/collabio-logo.png"
          alt="Collabio Logo"
          className="w-[250px] max-w-[200px] h-auto block mx-auto object-contain"
        />
      </div>

      <div className="flex flex-col gap-2 ">
        <SidebarButton href="" title="Sizin İçin" icon={FaUser} />
        <SidebarButton href="" title="En son" icon={FaClock} />
        <SidebarButton href="" title="Favori" icon={FaStar} />
        <SidebarButton href="" title="Uygulamalar" icon={MdApps} />
        <SidebarButton href="" title="Planlar" icon={LuListTodo} />
      </div>

      <div className="flex flex-col gap-2 ml-[1vh]">
        <div className="flex items-center justify-between">
          <span className="text-[2vh] font-semibold">Projeler</span>
          <button className="bg-none border-none text-[var(--color-light)] cursor-pointer rounded hover:bg-[var(--color-background)] hover:text-[var(--color-primary)]">
            <FiPlus />
          </button>
        </div>
        <div className="flex items-center gap-2 p-2 text-[var(--color-light)] rounded text-sm cursor-pointer hover:bg-[var(--color-background)]">
          <img
            src="images/collabio-logo.png"
            alt="Collabio"
            className="w-5 h-5 rounded"
          />
          <span>Collabio</span>
        </div>
      </div>

      <div className="flex flex-col">
        <SidebarButton title="Önerilen" href="" icon={CiBoxList} />
        <SidebarButton title="Yeni keşif projesi" href="" icon={FaCompass} />
        <SidebarButton
          title="Tüm projeleri görüntüle"
          href=""
          icon={CiViewList}
        />
        <SidebarButton title="Filtreler" href="" icon={FaFilter} />
        <SidebarButton
          title="Gösterge Panoları"
          href=""
          icon={FaTableColumns}
        />
        <SidebarButton title="Takımlar" href="" icon={FaUsers} />
        <SidebarButton
          title="Kenar çubuğunu özelleştir"
          href=""
          icon={IoMdSettings}
        />
      </div>
    </nav>
  );
}
