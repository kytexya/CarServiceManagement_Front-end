import React, { useEffect, useMemo, useState } from 'react';
import SidebarAdmin from '@/components/common/sidebar-admin';
import { showError } from '@/utils';
import axios from 'axios';

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

const AlertCard = ({ title, message, type = "warning", count = 0 }) => {
    const colors = {
        warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
        danger: "bg-red-50 border-red-200 text-red-800",
        info: "bg-blue-50 border-blue-200 text-blue-800"
    };
    
    return (
        <div className={`p-3 rounded-lg border ${colors[type]}`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        {type === "warning" && (
                            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
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
                {count > 0 && (
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                        {count}
                    </span>
                )}
            </div>
        </div>
    );
};

const InventoryItem = ({ item }) => (
    <div className="bg-white p-3 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">{item.partName}</span>
                </div>
                <div>
                    <h4 className="text-sm font-medium text-gray-900">{item.partName}</h4>
                    <p className="text-xs text-gray-500">{item.category}</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{item.quantity} {item.unit}</p>
                <p className={`text-xs ${item.status === 'low' ? 'text-red-600' : item.status === 'normal' ? 'text-green-600' : 'text-yellow-600'}`}>
                    {item.status === 'low' ? 'Sắp hết' : item.status === 'normal' ? 'Bình thường' : 'Cần nhập'}
                </p>
            </div>
        </div>
    </div>
);

const HistoryItem = ({ transaction }) => (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border">
        <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                transaction.type === 'import' ? 'bg-green-100' : 'bg-red-100'
            }`}>
                <span className={`text-sm font-medium ${
                    transaction.type === 'import' ? 'text-green-600' : 'text-red-600'
                }`}>
                    {transaction.type === 'import' ? '↓' : '↑'}
                </span>
            </div>
            <div>
                <h4 className="text-sm font-medium text-gray-900">{transaction.item}</h4>
                <p className="text-xs text-gray-500">{transaction.date}</p>
            </div>
        </div>
        <div className="text-right">
            <p className={`text-sm font-medium ${
                transaction.type === 'import' ? 'text-green-600' : 'text-red-600'
            }`}>
                {transaction.type === 'import' ? '+' : '-'}{transaction.quantity} {transaction.unit}
            </p>
            <p className="text-xs text-gray-500">{transaction.user}</p>
        </div>
    </div>
);

export default function InventoryOverviewPage() {
    const [activeTab, setActiveTab] = useState('overview');
    const [parts, setParts] = useState([]);
    const [lowParts, setLowParts] = useState([]);
    const [outOfStockParts, setOutOfStockParts] = useState([]);
    const token = localStorage.getItem("carserv-token");

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


    const alerts = [
        {
            title: "Phụ tùng sắp hết",
            message: `${inventoryStats.lowStock} loại phụ tùng có số lượng dưới mức tối thiểu`,
            type: "warning",
            count: inventoryStats.lowStock
        },
        {
            title: "Phụ tùng hết hàng",
            message: `${inventoryStats.outOfStock} loại phụ tùng đã hết sạch trong kho`,
            type: "danger",
            count: inventoryStats.outOfStock
        },
        {
            title: "Sắp hết hạn bảo hành",
            message: `${inventoryStats.expiringSoon} loại phụ tùng sẽ hết hạn bảo hành trong 30 ngày tới`,
            type: "info",
            count: inventoryStats.expiringSoon
        }
    ].filter(alert => alert.count > 0);

    const lowStockItemsMock = [
        { name: "Dầu nhớt Mobil 1", category: "Dầu nhớt", quantity: 5, unit: "lít", status: "low" },
        { name: "Lọc gió động cơ", category: "Lọc", quantity: 2, unit: "cái", status: "low" },
        { name: "Phanh trước", category: "Phanh", quantity: 1, unit: "bộ", status: "out" },
        { name: "Bugi đánh lửa", category: "Điện", quantity: 3, unit: "bộ", status: "low" },
        { name: "Bình ắc quy", category: "Điện", quantity: 0, unit: "cái", status: "out" }
    ];

    const lowStockItems = parts
    .filter(part => part.quantity <= 10 && part.quantity > 0)
    .map(part => ({
        name: part.partName,
        category: "Chưa phân loại",
        quantity: part.quantity,
        unit: 'cái',
        status: part.quantity === 0 ? "out" : "low"
    }));

    const recentHistory = [
        { type: "import", item: "Dầu nhớt Mobil 1", quantity: 50, unit: "lít", date: "Hôm nay 14:30", user: "Nguyễn Văn A" },
        { type: "export", item: "Lọc gió động cơ", quantity: 2, unit: "cái", date: "Hôm nay 11:15", user: "Trần Thị B" },
        { type: "import", item: "Phanh trước", quantity: 10, unit: "bộ", date: "Hôm qua 16:45", user: "Lê Văn C" },
        { type: "export", item: "Bugi đánh lửa", quantity: 1, unit: "bộ", date: "Hôm qua 09:20", user: "Phạm Thị D" },
        { type: "import", item: "Bình ắc quy", quantity: 5, unit: "cái", date: "2 ngày trước", user: "Hoàng Văn E" }
    ];

    const handleViewDetails = () => {
        showError("Chức năng xem chi tiết chưa được kết nối API.");
    };

    const handleExportReport = () => {
        showError("Chức năng xuất báo cáo chưa được kết nối API.");
    };

    useEffect(() => {
        fetchParts()
        fetchLowParts()
        fetchOutOfStockParts()
    }, []);

    const fetchParts = async () => {
        try {
            const res = await axios.get("/api/Parts", { 
                headers: {
                    Authorization: `Bearer ${token}`,
                    'ngrok-skip-browser-warning': 'anyvalue',
                },
                withCredentials: true
            });
            setParts(res.data || []);
        } catch (err) {
            showError("Không tải được danh sách phụ tùng");
        }
    }
    const fetchLowParts = async () => {
        try {
            const res = await axios.get("/api/Parts/get-low-parts", { 
                headers: {
                    Authorization: `Bearer ${token}`,
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
                    Authorization: `Bearer ${token}`,
                    'ngrok-skip-browser-warning': 'anyvalue',
                },
                withCredentials: true
            });
            setOutOfStockParts(res.data || []);
        } catch (err) {
            showError("Không tải được danh sách phụ tùng");
        }
    }

    return (
        <div className="flex flex-row w-full h-screen bg-gray-50">
            <div className="flex flex-col w-full">
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b bg-white shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Quản lý kho phụ tùng</h1>
                            <p className="text-xs text-gray-600">Tổng quan kho và cảnh báo</p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                        <button onClick={handleViewDetails} className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                            Xem chi tiết
                        </button>
                        <button onClick={handleExportReport} className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Xuất báo cáo
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="p-6">
                    {/* Stat Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                        <StatCard 
                            title="Tổng phụ tùng" 
                            value={inventoryStats.totalItems.toString()} 
                            icon="📦" 
                            color="blue"
                        />
                        <StatCard 
                            title="Sắp hết" 
                            value={inventoryStats.lowStock.toString()} 
                            icon="⚠️" 
                            color="yellow"
                        />
                        <StatCard 
                            title="Hết hàng" 
                            value={inventoryStats.outOfStock.toString()} 
                            icon="❌" 
                            color="red"
                        />
                        <StatCard 
                            title="Sắp hết hạn" 
                            value={inventoryStats.expiringSoon.toString()} 
                            icon="⏰" 
                            color="orange"
                        />
                        <StatCard 
                            title="Tổng giá trị" 
                            value={inventoryStats.totalValue} 
                            icon="💰" 
                            color="green"
                        />
                    </div>

                    {/* Alerts */}
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-3">Cảnh báo kho</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {alerts.map((alert, index) => (
                                <AlertCard 
                                    key={index}
                                    title={alert.title}
                                    message={alert.message}
                                    type={alert.type}
                                    count={alert.count}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="mb-6">
                        <div className="border-b border-gray-200">
                            <nav className="-mb-px flex space-x-8">
                                <button
                                    onClick={() => setActiveTab('overview')}
                                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                        activeTab === 'overview'
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    Tổng quan
                                </button>
                                <button
                                    onClick={() => setActiveTab('lowStock')}
                                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                        activeTab === 'lowStock'
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    Sắp hết hàng
                                </button>
                                <button
                                    onClick={() => setActiveTab('history')}
                                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                        activeTab === 'history'
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    Lịch sử gần đây
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div>
                        {activeTab === 'overview' && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <h3 className="text-lg font-bold text-gray-900 mb-3">Phân bố theo danh mục</h3>
                                    <div className="space-y-3">
                                        {parts?.map(part => {
                                            return (
                                                <div key={part.partId} className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-600">{part.partName}</span>
                                                    {/* <span className="text-sm text-gray-600">{part.partName} loại</span> */}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <h3 className="text-lg font-bold text-gray-900 mb-3">Hoạt động gần đây</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">Nhập hàng hôm nay</span>
                                            <span className="text-sm font-medium text-green-600">+15</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">Xuất hàng hôm nay</span>
                                            <span className="text-sm font-medium text-red-600">-8</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">Đơn hàng đang xử lý</span>
                                            <span className="text-sm font-medium">3</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">Cần nhập gấp</span>
                                            <span className="text-sm font-medium text-red-600">5</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'lowStock' && (
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Phụ tùng sắp hết / hết hàng</h3>
                                <div className="space-y-3">
                                    {lowParts.map((item, index) => (
                                        <InventoryItem key={index} item={item} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'history' && (
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Lịch sử nhập - xuất gần đây</h3>
                                <div className="space-y-3">
                                    {recentHistory.map((transaction, index) => (
                                        <HistoryItem key={index} transaction={transaction} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 