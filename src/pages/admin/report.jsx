import React, { useState } from 'react';
import SidebarAdmin from '@/components/common/sidebar-admin';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { showError } from '@/utils';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend);

const StatCard = ({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className="text-3xl text-primary">{icon}</div>
    </div>
);

// Mock data for charts
const revenueData = {
    labels: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'],
    datasets: [
        {
            label: 'Doanh thu',
            data: [65000000, 59000000, 80000000, 81000000],
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            tension: 0.3,
        },
    ],
};

const serviceUsageData = {
    labels: ['Bảo dưỡng', 'Sửa chữa', 'Rửa xe', 'Phụ tùng', 'Tư vấn'],
    datasets: [
        {
            label: 'Lượt sử dụng',
            data: [120, 190, 80, 50, 90],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
        },
    ],
};

const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'top',
        },
    },
};


export default function AdminReportPage() {
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());

    const handleFilterChange = () => {
        showError("Chức năng lọc chưa được kết nối API.");
    };

    return (
        <div className="flex flex-row w-full h-screen bg-gray-50">
            <SidebarAdmin />
            <div className="flex w-full flex-col p-8 overflow-y-auto">
                <h1 className="text-3xl font-bold mb-6">Báo Cáo & Thống Kê</h1>

                {/* Filter Controls */}
                <div className="flex items-center gap-4 mb-6 bg-white p-4 rounded-lg shadow-md">
                    <p className="font-semibold">Lọc theo thời gian:</p>
                    <select value={month} onChange={(e) => setMonth(parseInt(e.target.value))} className="input-field">
                        {[...Array(12)].map((_, index) => (
                            <option key={index + 1} value={index + 1}>
                                Tháng {index + 1}
                            </option>
                        ))}
                    </select>
                    <select value={year} onChange={(e) => setYear(parseInt(e.target.value))} className="input-field">
                        {[...Array(5)].map((_, index) => {
                            const y = new Date().getFullYear() - index;
                            return <option key={y} value={y}>Năm {y}</option>;
                        })}
                    </select>
                    <button onClick={handleFilterChange} className="button primary">Áp Dụng</button>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard title="Tổng Doanh Thu" value="81.000.000đ" icon="💰" />
                    <StatCard title="Khách Hàng Mới" value="42" icon="👥" />
                    <StatCard title="Dịch Vụ Hoàn Thành" value="153" icon="✔️" />
                    <StatCard title="Lợi Nhuận" value="25.000.000đ" icon="📈" />
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-6 shadow-md rounded-lg">
                        <h2 className="text-xl font-bold mb-4">Thống kê doanh thu (Tháng {month}/{year})</h2>
                        <Line data={revenueData} options={chartOptions} />
                    </div>
                    <div className="bg-white p-6 shadow-md rounded-lg">
                        <h2 className="text-xl font-bold mb-4">Thống kê sử dụng dịch vụ</h2>
                        <Bar data={serviceUsageData} options={chartOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
}