import React, { useEffect, useMemo, useState } from 'react';
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
import axios from 'axios';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend);

const StatCard = ({ title, value, icon, color = "blue", trend = null }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-xs text-gray-500">{title}</p>
                <p className="text-lg font-bold text-gray-900">{value}</p>
                {trend && (
                    <p className={`text-xs ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {trend > 0 ? '+' : ''}{trend}% so với tháng trước
                    </p>
                )}
            </div>
            <div className={`text-2xl text-${color}-500`}>{icon}</div>
        </div>
    </div>
);

const AlertCard = ({ title, message, type = "warning" }) => {
    const colors = {
        warning: "bg-amber-50 border-amber-200 text-amber-800",
        danger: "bg-red-50 border-red-200 text-red-800",
        info: "bg-blue-50 border-blue-200 text-blue-800"
    };

    return (
        <div className={`p-3 rounded-lg border ${colors[type]}`}>
            <div className="flex items-center">
                <div className="flex-shrink-0">
                    {type === "warning" && (
                        <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    )}
                    {type === "danger" && (
                        <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    )}
                    {type === "info" && (
                        <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                    )}
                </div>
                <div className="ml-2">
                    <h3 className="text-xs font-medium">{title}</h3>
                    <p className="text-xs mt-1">{message}</p>
                </div>
            </div>
        </div>
    );
};

// Mock data for charts
const revenueDataMock = {
    labels: ['Hôm nay', 'Tuần này', 'Tháng này'],
    datasets: [
        {
            label: 'Doanh thu (VND)',
            data: [2500000, 18000000, 75000000],
            fill: true,
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            borderColor: 'rgba(59, 130, 246, 1)',
            tension: 0.3,
        },
    ],
};

const employeePerformanceData = {
    labels: ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D', 'Hoàng Văn E'],
    datasets: [
        {
            label: 'Đơn hoàn thành',
            data: [25, 32, 28, 19, 35],
            backgroundColor: 'rgba(16, 185, 129, 0.5)',
            borderColor: 'rgba(16, 185, 129, 1)',
            borderWidth: 1,
        },
    ],
};

const sparePartsUsageDataMock = {
    labels: ['Dầu nhớt', 'Lọc gió', 'Phanh', 'Lốp xe', 'Bugi', 'Bình ắc quy'],
    datasets: [
        {
            label: 'Lượt sử dụng',
            data: [45, 32, 28, 15, 22, 18],
            backgroundColor: 'rgba(245, 158, 11, 0.5)',
            borderColor: 'rgba(245, 158, 11, 1)',
            borderWidth: 1,
        },
    ],
};

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            position: 'top',
            labels: {
                font: {
                    size: 12
                }
            }
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                font: {
                    size: 10
                }
            }
        },
        x: {
            ticks: {
                font: {
                    size: 10
                }
            }
        }
    },
};

export default function AdminReportPage() {
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());

    // Mock data
    const alertsMock = [
        {
            title: "Tồn kho thấp",
            message: "Dầu nhớt Mobil 1 chỉ còn 5 lít, cần nhập thêm",
            type: "warning"
        },
        {
            title: "Phụ tùng hết hạn bảo hành",
            message: "3 bộ lọc gió sẽ hết hạn bảo hành trong 7 ngày tới",
            type: "danger"
        },
        {
            title: "Nhân viên nghỉ phép",
            message: "Nguyễn Văn A sẽ nghỉ phép từ 15-20/01/2025",
            type: "info"
        }
    ];

    const handleFilterChange = () => {
        fetchDashboardSummary();
        fetchLowParts();
        fetchParts();
        fetchOutOfStockParts();
        fetchRevenue();
    };
    const [summary, setSummary] = useState(null);
    const [revenueData, setRevenueData] = useState(null);
    const [revenue, setRevenue] = useState(null);
    const [emplouyee, setEmployee] = useState(null);
    const [sparePartsUsageData, setSparePartsUsageData] = useState({
        labels: [],
        datasets: [],
    });
    const [lowParts, setLowParts] = useState([]);
    const [parts, setParts] = useState([]);
    const [outOfStockParts, setOutOfStockParts] = useState([]);

    useEffect(() => {
        fetchDashboardSummary();
        fetchLowParts();
        fetchParts();
        fetchOutOfStockParts();
        fetchRevenue();
        // fetchEmployeePerformace();
        // fetchSparePartsUsage();
    }, []);

    const inventoryStats = useMemo(() => {
        if (!parts || parts.length === 0) {
            return {
                totalItems: 0,
                lowStock: 0,
                outOfStock: 0,
                expiringSoon: 0,
                totalValue: "0 VND"
            };
        }

        const soonThreshold = new Date();
        soonThreshold.setMonth(soonThreshold.getMonth() + 1);

        let expiringSoon = 0;
        let totalValue = 0;

        parts.forEach(part => {
            totalValue += (part.unitPrice || 0) * (part.quantity || 0);

            if (part.expiryDate && new Date(part.expiryDate) <= soonThreshold) {
                expiringSoon++;
            }
        });

        return {
            totalItems: parts.length,
            lowStock: lowParts.length,
            outOfStock: outOfStockParts.length,
            expiringSoon,
            totalValue: totalValue.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
        };
    }, [parts, lowParts, outOfStockParts]);

    const fetchDashboardSummary = async () => {
        try {
            const res = await axios.get(`/api/Parts/dashboard-summary?month=${month}&year=${year}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("carserv-token")}`,
                    'ngrok-skip-browser-warning': 'anyvalue',
                }
            });
            setSummary(res.data);
            const partsUsage = res.data?.partsUsage;
            if (partsUsage) {
                const labels = Object.keys(partsUsage);
                const data = Object.values(partsUsage);
                setSparePartsUsageData({
                    labels,
                    datasets: [
                        {
                        label: 'Lượt sử dụng',
                        data,
                        backgroundColor: 'rgba(245, 158, 11, 0.5)',
                        borderColor: 'rgba(245, 158, 11, 1)',
                        borderWidth: 1,
                        },
                    ],
                });
            }
        } catch (err) {
            // showError("Không tải được dữ liệu thống kê");
        }
    };

    const fetchParts = async () => {
        try {
            const res = await axios.get("/api/Parts", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("carserv-token")}`,
                    'ngrok-skip-browser-warning': 'anyvalue',
                },
                withCredentials: true
            });
            setParts(res.data.items || []);
        } catch (err) {
            showError("Không tải được danh sách phụ tùng");
        }
    }

    const fetchLowParts = async () => {
        try {
            const res = await axios.get("/api/Parts/get-low-parts", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("carserv-token")}`,
                    'ngrok-skip-browser-warning': 'anyvalue',
                },
                withCredentials: true
            });
            setLowParts(res.data || []);
        } catch (err) {
            showError("Không tải được danh sách phụ tùng");
        }
    }
    const fetchOutOfStockParts = async () => {
        try {
            const res = await axios.get("/api/Parts/get-out-of-stock-parts", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("carserv-token")}`,
                    'ngrok-skip-browser-warning': 'anyvalue',
                },
                withCredentials: true
            });
            setOutOfStockParts(res.data || []);
        } catch (err) {
            showError("Không tải được danh sách phụ tùng");
        }
    }

    const fetchRevenue = async () => {
        try {
            const res = await axios.get(`/api/Parts/revenue?month=${month}&year=${year}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("carserv-token")}`,
                    'ngrok-skip-browser-warning': 'anyvalue',
                }
            });
            setRevenue(res.data.totalRevenue);
            setRevenueData({
                labels: ['Hôm nay', 'Tuần này', 'Tháng này'],
                datasets: [
                    {
                        label: 'Doanh thu (VND)',
                        data: [res.data.totalRevenue, res.data.totalRevenue, res.data.totalRevenue],
                        fill: true,
                        backgroundColor: 'rgba(59, 130, 246, 0.2)',
                        borderColor: 'rgba(59, 130, 246, 1)',
                        tension: 0.3,
                    },
                ],
            });
        } catch (err) {
            // showError("Không tải được dữ liệu thống kê");
        }
    };

    // const fetchEmployeePerformace = async () => {
    //     try {
    //         const res = await axios.get(`/api/Admin/employee-performance?month=${month}&year=${year}`, {
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem("carserv-token")}`,
    //                 'ngrok-skip-browser-warning': 'anyvalue',
    //             }
    //         });
    //         setEmployee(res.data);
    //     } catch (err) {
    //         // showError("Không tải được dữ liệu thống kê");
    //     }
    // };

    // const fetchSparePartsUsage = async () => {
    //     try {
    //         const res = await axios.get(`/api/Admin/spare-parts-usage?month=${month}&year=${year}`, {
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem("carserv-token")}`,
    //                 'ngrok-skip-browser-warning': 'anyvalue',
    //             }
    //         });
    //         setSparePartsUsageData(res.data);
    //     } catch (err) {
    //         // showError("Không tải được dữ liệu thống kê");
    //     }
    // };



    return (
        <div className="flex flex-row w-full h-screen bg-gray-50">
            {/* <SidebarAdmin /> */}
            <div className="flex flex-col w-full">
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b bg-white shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
                            <p className="text-xs text-gray-600">Tổng quan hệ thống và thống kê</p>
                        </div>
                    </div>

                    {/* Filter Controls */}
                    <div className="flex items-center gap-3">
                        <select value={month} onChange={(e) => setMonth(parseInt(e.target.value))} className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            {[...Array(12)].map((_, index) => (
                                <option key={index + 1} value={index + 1}>
                                    Tháng {index + 1}
                                </option>
                            ))}
                        </select>
                        <select value={year} onChange={(e) => setYear(parseInt(e.target.value))} className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            {[...Array(5)].map((_, index) => {
                                const y = new Date().getFullYear() - index;
                                return <option key={y} value={y}>Năm {y}</option>;
                            })}
                        </select>
                        <button onClick={handleFilterChange} className="button primary text-sm px-3 py-1">
                            Áp Dụng
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="p-6">
                    {/* Stat Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <StatCard
                            title="Đơn đang xử lý"
                            value="12"
                            icon="🔧"
                            color="blue"
                        />
                        <StatCard
                            title="Đơn hoàn thành"
                            value="45"
                            icon="✅"
                            color="green"
                            trend={8}
                        />
                        <StatCard
                            title="Doanh thu hôm nay"
                            value={`${revenue} VND`}
                            icon="💰"
                            color="amber"
                            trend={12}
                        />
                        <StatCard
                            title="Doanh thu tháng"
                            value={`${revenue} VND`}
                            icon="📈"
                            color="purple"
                            trend={-3}
                        />
                    </div>

                    {/* Alerts */}
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-3">Cảnh báo & Thông báo</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {
                                inventoryStats.lowStock > 0 && (
                                    <AlertCard
                                        // key={0}
                                        title={'Tồn kho thấp'}
                                        message={`Có ${inventoryStats.lowStock} phụ tùng sắp hết, cần nhập thêm`}
                                        type={'warning'}
                                    />
                                )
                            }
                            {
                                inventoryStats.outOfStock > 0 && (
                                    <AlertCard
                                        // key={0}
                                        title={'Phụ tùng đã hết'}
                                        message={`Có ${inventoryStats.outOfStock} phụ tùng đã hết, cần nhập thêm`}
                                        type={'danger'}
                                    />
                                )
                            }
                            {
                                inventoryStats.expiringSoon > 0 && (
                                    <AlertCard
                                        // key={0}
                                        title={'phụ tùng sắp hết hạn bảo hành'}
                                        message={`Có ${inventoryStats.expiringSoon} phụ tùng sắp hết hạn bảo hành`}
                                        type={'warning'}
                                    />
                                )
                            }
                        </div>
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Revenue Chart */}
                        <div className="lg:col-span-2 bg-white p-4 shadow-sm rounded-lg">
                            <h2 className="text-lg font-bold text-gray-900 mb-3">Doanh thu theo thời gian</h2>
                            <div className="h-64">
                                {revenueData &&
                                    <Line data={revenueData} options={chartOptions} />
                                }
                            </div>
                        </div>

                        {/* Employee Performance */}
                        <div className="bg-white p-4 shadow-sm rounded-lg">
                            <h2 className="text-lg font-bold text-gray-900 mb-3">Hiệu suất nhân viên</h2>
                            <div className="h-64">
                                <Bar data={employeePerformanceData} options={chartOptions} />
                            </div>
                        </div>
                    </div>

                    {/* Spare Parts Usage */}
                    <div className="mt-6">
                        <div className="bg-white p-4 shadow-sm rounded-lg">
                            <h2 className="text-lg font-bold text-gray-900 mb-3">Sử dụng phụ tùng</h2>
                            <div className="h-48">
                                <Bar data={sparePartsUsageData} options={chartOptions} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}