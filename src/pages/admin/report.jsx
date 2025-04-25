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
import { showError } from '@/utils';
import axios from 'axios';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend);
const baseURL = import.meta.env.VITE_API_BASE_URL;

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
    const [revenue, setDataRevenue] = useState({
        labels: [],
        datasets: [],
    });
    const [order, setOrder] = useState();
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const yourToken = localStorage.getItem('bus-token');

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

    useEffect(() => {
        callApi(year, month);
    }, [year, month]);

    function callApi(year, month) {
        axios.get(`${baseURL}/api/Transaction/revenue-by-month`, {
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 69420,
                'Authorization': `Bearer ${yourToken}`
            },
            params: {
                year,
                month,
            },
        })
            .then((res) => {
                if (res.status === 200) {
                    const listData = res?.data || [];
                    const labels = listData.map((item) => `Ngày ${item.day}`);
                    const data = listData.map((item) => item.amount);
                    const chartData = {
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
                    setDataRevenue(chartData);
                } else {
                    showError();
                }
            })
            .catch((error) => {
                console.error('Axios error:', error);
                showError();
            });
    }

    const handleMonthChange = (e) => {
        const newMonth = parseInt(e.target.value);
        setMonth(newMonth);
    };

    const handleYearChange = (e) => {
        const newYear = parseInt(e.target.value);
        setYear(newYear);
    };


    return (
        <div className="flex flex-row w-[calc(100vw - 230px)] overflow-y-scroll">
            <SidebarAdmin />
            <div className="flex w-full flex-col p-6">
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between">
                        <h2 className="text-2xl font-bold mb-4">Thống kê doanh thu</h2>

                        <div className="flex gap-4">
                            <select value={month} onChange={handleMonthChange} className="border px-3 py-2 rounded">
                                {[...Array(12)].map((_, index) => (
                                    <option key={index + 1} value={index + 1}>
                                        Tháng {index + 1}
                                    </option>
                                ))}
                            </select>
                            <select value={year} onChange={handleYearChange} className="border px-3 py-2 rounded">
                                {[...Array(10)].map((_, index) => {
                                    const y = new Date().getFullYear() - 5 + index;
                                    return (
                                        <option key={y} value={y}>
                                            Năm {y}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
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