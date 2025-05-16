'use client'
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface StatusDonutChartProps {
  data: {
    yapılacak: number;
    devam: number;
    tamam: number;
  };
}

const StatusDonutChart: React.FC<StatusDonutChartProps> = ({ data }) => {
  const total = data.yapılacak + data.devam + data.tamam;

  const chartData = {
    labels: ['Yapılacaklar', 'Devam Ediyor', 'Tamam'],
    datasets: [
      {
        data: [data.yapılacak, data.devam, data.tamam],
        backgroundColor: ['#f4a261', '#e76f51', '#2a9d8f'],
        borderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    cutout: '75%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const label = chartData.labels[tooltipItem.dataIndex] || '';
            const value = chartData.datasets[0].data[tooltipItem.dataIndex];
            return `${label}: ${value}`;
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="p-5">
      <div className="relative h-[200px] mb-5">
        <Doughnut data={chartData} options={options} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <span className="block text-[2.5rem] font-bold text-[var(--color-dark)]">
            {total}
          </span>
          <span className="text-[0.9rem] text-[var(--color-light)]">
            Toplam konu
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 text-[0.9rem]">
        <div className="flex items-center gap-2">
          <span className="w-[1rem] h-[1rem] rounded" style={{ backgroundColor: '#f4a261' }}></span>
          <span className="text-[var(--color-dark)]">Yapılacaklar: {data.yapılacak}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-[1rem] h-[1rem] rounded" style={{ backgroundColor: '#e76f51' }}></span>
          <span className="text-[var(--color-dark)]">Devam Ediyor: {data.devam}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-[1rem] h-[1rem] rounded" style={{ backgroundColor: '#2a9d8f' }}></span>
          <span className="text-[var(--color-dark)]">Tamam: {data.tamam}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusDonutChart;
