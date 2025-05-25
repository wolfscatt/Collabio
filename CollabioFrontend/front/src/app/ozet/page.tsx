import React from "react";
import { FaFilter } from "react-icons/fa";
import FilterBarText from "../../../components/SummaryComps/FilterBarText";
import GridTitle from "../../../components/SummaryComps/GridTitle";
import OncomingTaskRow from "../../../components/SummaryComps/OncomingTaskRow";
import TaskDistribution from "../../../components/SummaryComps/TaskDistribution";
import ActivityItem from "../../../components/SummaryComps/ActivityItem";
import StatusDonutChart from "../../../components/SummaryComps/StatusDonutChart";

const Summary = () => {
  return (
    <div className="bg-[var(--color-background)]">
      <div className="flex items-center gap-5 mb-5 p-4 bg-white rounded-lg shadow">
        <button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white border-none rounded font-medium cursor-pointer">
          <FaFilter /> Filtrele
        </button>
        <FilterBarText text="2 öğe tamamlandı" />
        <FilterBarText text="2 öğe güncellendi" />
        <FilterBarText text="0 öğe oluşturuldu" />
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-[var(--color-dark)]">
            0 öğenin bitiş tarihi yaklaştı
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Durum Genel Bakışı Kartı */}
        <div className="bg-white rounded-lg shadow">
          <GridTitle
            title="Durum genel bakışı"
            text="Konularınız durumunu anlık olarak görün."
            isShowAll={false}
          />
          <StatusDonutChart data={{ yapılacak: 3, devam: 4, tamam: 2 }} />

          {/* <div className="p-5">
            <div className="relative h-[200px] mb-5">
              <canvas id="statusChart"></canvas>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="block text-4xl font-bold text-[var(--color-dark)]">
                  9
                </span>
                <span className="text-sm text-[var(--color-light)]">
                  Toplam konu
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: "#f4a261" }}
                ></span>
                <span className="text-sm text-[var(--color-dark)]">
                  Yapılacaklar: 3
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: "#e76f51" }}
                ></span>
                <span className="text-sm text-[var(--color-dark)]">
                  Devam Ediyor: 4
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: "#2a9d8f" }}
                ></span>
                <span className="text-sm text-[var(--color-dark)]">
                  Tamam: 2
                </span>
              </div>
            </div>
          </div> */}
        </div>

        {/* En Son Etkinlikler Kartı */}
        <div className="bg-white rounded-lg shadow">
          <GridTitle
            title="En son etkinlikleriniz"
            text="Proje genelinde neler olduğundan haberdar olun."
            isShowAll={true}
          />
          <ActivityItem
            name="Bedirhan Özmen"
            avatarUrl="https://ui-avatars.com/api/?name=BO&background=ffd600&color=333"
            status="TAMAM"
            taskTitle="COL-4: UX/UI Tasarımı"
            description='Revit'
            timeAgo={5}
          />
          <ActivityItem
            name="Bedirhan Özmen"
            avatarUrl="https://ui-avatars.com/api/?name=BO&background=ffd600&color=333"
            status="TAMAM"
            taskTitle="COL-4: UX/UI Tasarımı"
            description='Status'
            timeAgo={21}
          />
          <ActivityItem
            name="Melike Danışmaz"
            avatarUrl="https://ui-avatars.com/api/?name=MD&background=9c27b0&color=fff"
            status="YAPILACAKLAR"
            taskTitle="COL-9: Otomasyon projesi"
            description='Görev'
            timeAgo={25}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Yaklaşan Görevler Kartı */}
        <div className="bg-white rounded-lg shadow">
          <GridTitle
            title="Yaklaşan Görevler"
            text="Yaklaşan bitiş tarihleri olan görevler"
          />
          <div className="px-5">
            {/* Görev 1 */}
            <OncomingTaskRow
              mission="COL-3: Api geliştirme"
              name="Ömer Faruk"
              date="9 Nis 2025"
              status="DEVAM EDİYOR"
              avatarUrl="https://ui-avatars.com/api/?name=ÖF&background=18a0fb&color=fff"
            />
            <OncomingTaskRow
              mission="COL-5: Login Page kodlama"
              name="Ceren Yolur"
              date="27 Mar 2025"
              status="DEVAM EDİYOR"
              avatarUrl="https://ui-avatars.com/api/?name=CY&background=9c27b0&color=fff"
            />
            <OncomingTaskRow
              mission="COL-3: Api geliştirme"
              name="Ömer Faruk"
              date="9 Nis 2025"
              status="DEVAM EDİYOR"
              avatarUrl="https://ui-avatars.com/api/?name=ÖF&background=18a0fb&color=fff"
            />
            <OncomingTaskRow
              mission="COL-6: Veri Tabanı Tasarımı"
              name="Emre Kandazoğlu"
              date="20 Mar 2025"
              status="DEVAM EDİYOR"
              avatarUrl="https://ui-avatars.com/api/?name=EK&background=00bfae&color=fff"
            />

          </div>
        </div>

        {/* Görev Dağılımı Kartı */}
        <div className="bg-white rounded-lg shadow">
          <GridTitle
            title="Görev Dağılımı"
            text="Takım üyelerinin görev durumları"
          />
          <div className="p-5 space-y-4">
            {/* Üye 1 */}
            <TaskDistribution
              name="Ömer Faruk"
              avatarUrl="https://ui-avatars.com/api/?name=ÖF&background=18a0fb&color=fff"
              tasks={[
                { label: 'Yapılacak', count: 1 },
                { label: 'Devam Ediyor', count: 1 },
              ]}
            />
            <TaskDistribution
              name="Ceren Yolur"
              avatarUrl="https://ui-avatars.com/api/?name=CY&background=9c27b0&color=fff"
              tasks={[
                { label: 'Devam Ediyor', count: 1 },
              ]}
            />
            <TaskDistribution
              name="Bedirhan Özmen"
              avatarUrl="https://ui-avatars.com/api/?name=BO&background=ffd600&color=333"
              tasks={[
                { label: 'Tamamlandı', count: 1 },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
