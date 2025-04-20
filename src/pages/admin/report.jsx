import React, { useEffect, useState } from 'react';
import SidebarAdmin from '@/components/common/sidebar-admin';
import { faker } from '@faker-js/faker';
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
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend);


const generateRevenueChartData = (type = 'day') => {
    let labels = [];
    let data = [];

    if (type === 'month') {
        labels = Array.from({ length: 12 }, (_, i) => `Tháng ${i + 1}`);
        data = labels.map(() => faker.number.int({ min: 200000, max: 1000000 }));
    } else if (type === 'year') {
        const currentYear = new Date().getFullYear();
        labels = Array.from({ length: 5 }, (_, i) => `Năm ${currentYear - 4 + i}`);
        data = labels.map(() => faker.number.int({ min: 500000, max: 2000000 }));
    } else {
        labels = Array.from({ length: 30 }, (_, i) => `Ngày ${i + 1}`);
        data = labels.map(() => faker.number.int({ min: 100000, max: 1000000 }));
    }

    return {
        labels,
        datasets: [
            {
                label: 'Doanh thu',
                data,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                fill: true,
                tension: 0.3,
            },
        ],
    };
};

const optionsRevenue = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'top',
        },
        tooltip: {
            callbacks: {
                label: (context) => `${context.dataset.label}: ${context.raw.toLocaleString()} đ`,
            },
        },
    },
    scales: {
        y: {
            ticks: {
                callback: (value) => `${value / 1000}k`,
            },
        },
    },
};

const optionsOrder = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'top',
        },
        tooltip: {
            callbacks: {
                label: (context) => `${context.dataset.label}: ${context.raw} lượt`,
            },
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                stepSize: 20,
                callback: (value) => `${value} lượt`,
            },
        },
    },
};

export default function ReportPage() {
    const [filterType, setFilterType] = useState('day')
    const [revenue, setDataRevenue] = useState({
        labels: [],
        datasets: [],
    });
    const [order, setOrder] = useState();

    useEffect(() => {
        const chartData = generateRevenueChartData(filterType);
        setDataRevenue(chartData);
    }, [filterType]);

    useEffect(() => {
        const bookingStats = [
            { route: 'Hà Nội - Đà Nẵng', bookings: 120 },
            { route: 'Hà Nội - Sài Gòn', bookings: 95 },
            { route: 'Hà Nội - Hải Phòng', bookings: 40 },
            { route: 'Sài Gòn - Cần Thơ', bookings: 65 },
            { route: 'Đà Nẵng - Huế', bookings: 30 },
        ];
        const chartData = {
            labels: bookingStats.map((item) => item.route),
            datasets: [
                {
                    label: 'Số lượt đặt vé',
                    data: bookingStats.map((item) => item.bookings),
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                },
            ],
        };
        setOrder(chartData)
    }, [])

    return (
        <div className="flex flex-row w-[calc(100vw - 230px)] overflow-y-scroll">
            <SidebarAdmin />
            <div className="flex w-full flex-col p-6">
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between">
                        <h2 className="text-2xl font-bold mb-4">Thống kê doanh thu</h2>
                        <select className="border px-5 py-2 rounded-lg" onChange={(e) => setFilterType(e.target.value)}>
                            <option value="day">Theo ngày</option>
                            <option value="month">Theo tháng</option>
                            <option value="year">Theo năm</option>
                        </select>
                    </div>

                    <div className="bg-white p-4 shadow rounded-lg">
                        <Line data={revenue} options={optionsRevenue} />
                    </div>

                    {order &&
                        <div className="flex-1 p-6">
                            <h2 className="text-2xl font-bold mb-4">Thống kê số lượt đặt vé theo tuyến đường</h2>
                            <div className="bg-white p-4 rounded-lg shadow">
                                <Bar data={order} options={optionsOrder} />
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}