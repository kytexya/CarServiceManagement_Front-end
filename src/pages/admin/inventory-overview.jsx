import React, { useEffect, useMemo, useState } from 'react';
import { showError, showSuccess } from '@/utils';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '@/components/common/pagination';

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

export default function InventoryOverviewPage() {
    const navigate = useNavigate();
    const [parts, setParts] = useState([]);
    const [lowParts, setLowParts] = useState([]);
    const [outOfStockParts, setOutOfStockParts] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [supplierFilter, setSupplierFilter] = useState('all');
    const [pagination, setPagination] = useState({
        totalItems: 0,
        totalPages: 1,
        currentPage: 1,
        pageSize: 10,
    });
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

    useEffect(() => {
        fetchParts(pagination.currentPage)
        fetchLowParts()
        fetchOutOfStockParts()
    }, [pagination.currentPage]);

    const fetchParts = async (page = 1) => {
        try {
            const res = await axios.get(`/api/Parts?currentPage=${page}&pageSize=${pagination.pageSize}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'ngrok-skip-browser-warning': 'anyvalue',
                },
                withCredentials: true
            });
            setParts(res.data.items || []);
            setPagination((prev) => ({
                ...prev,
                totalItems: res.data.totalItems,
                totalPages: res.data.totalPages,
                currentPage: res.data.currentPage,
                pageSize: res.data.pageSize,
            }));
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

    const suppliers = Array.from(new Set(parts.map(item => item.supplierName)));

    const filteredList = parts.filter(item => {
        const status =
            item.quantity === 0
                ? 'Hết hàng'
                : item.quantity < 10
                    ? 'Sắp hết'
                    : 'Còn hàng';
        const matchKeyword =
            item.partName.toLowerCase().includes(keyword.toLowerCase()) ||
            item.partId.toString().toLowerCase().includes(keyword.toLowerCase());
        const matchStatus = statusFilter === 'all' || status === statusFilter;
        const matchSupplier = supplierFilter === 'all' || item.supplierName === supplierFilter;
        return matchKeyword && matchStatus && matchSupplier;
    });

    const statusColor = {
        'Còn hàng': 'bg-green-100 text-green-700',
        'Sắp hết': 'bg-yellow-100 text-yellow-800',
        'Hết hàng': 'bg-red-100 text-red-700',
    };

    const handleDeletePart = async (partId) => {
        if (!window.confirm("Bạn có chắc muốn xóa phụ tùng này?")) return;

        try {
            await axios.delete(`/api/Parts/delete-part/${partId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'ngrok-skip-browser-warning': 'anyvalue',
                }
            });
            fetchParts();
            showSuccess("Xóa phụ tùng thành công!");
        } catch (err) {
            console.error("Lỗi khi xoá:", err);
            showError("Xóa phụ tùng thất bại!");
        }
    };

    // Icon component for out of stock warning
    const OutOfStockIcon = () => (
        <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
    );

    // Icon component for low stock warning (yellow)
    const LowStockIcon = () => (
        <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
    );

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

                    {/* Tab Content */}
                    <div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <div className='flex justify-between px-2'>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Danh sách phụ tùng</h3>
                                <Link to="/admin/inventory/add" className="button primary">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Thêm Phụ Tùng
                                </Link>
                            </div>
                            <div className="p-2">
                                <div className="bg-white rounded-lg border p-6 mb-6">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Tìm kiếm</label>
                                            <input
                                                type="text"
                                                placeholder="Tìm theo tên hoặc mã phụ tùng..."
                                                value={keyword}
                                                onChange={(e) => setKeyword(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
                                            <select
                                                value={statusFilter}
                                                onChange={(e) => setStatusFilter(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="all">Tất cả trạng thái</option>
                                                <option value="Còn hàng">Còn hàng</option>
                                                <option value="Sắp hết">Sắp hết</option>
                                                <option value="Hết hàng">Hết hàng</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Nhà cung cấp</label>
                                            <select
                                                value={supplierFilter}
                                                onChange={(e) => setSupplierFilter(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="all">Tất cả</option>
                                                {suppliers.map(supplier => (
                                                    <option key={supplier} value={supplier}>{supplier}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="flex items-end">
                                            <button
                                                onClick={() => {
                                                    setKeyword('');
                                                    setStatusFilter('all');
                                                    setSupplierFilter('all');
                                                }}
                                                className="w-full button"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                </svg>
                                                Làm mới
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg border overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Mã phụ tùng
                                                    </th>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Tên phụ tùng
                                                    </th>
                                                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Số lượng
                                                    </th>
                                                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Giá nhập
                                                    </th>
                                                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Giá bán
                                                    </th>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Nhà cung cấp
                                                    </th>
                                                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Hạn bảo hành
                                                    </th>
                                                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Trạng thái
                                                    </th>
                                                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Hành động
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {filteredList.map(item => {
                                                    const isLowStock = item.quantity < 10;
                                                    const isOutOfStock = item.quantity === 0;
                                                    return (
                                                        <tr key={item.partId} className={`border-b last:border-0 ${isOutOfStock ? 'bg-red-50' : isLowStock ? 'bg-amber-50' : ''
                                                            }`}>
                                                            <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                                                {item.partId}
                                                            </td>
                                                            <td className="px-4 py-3 text-sm text-gray-900">
                                                                {item.partName}
                                                            </td>
                                                            <td className="px-4 py-3 text-center">
                                                                <div className="flex items-center justify-center gap-2">
                                                                    <span className={`font-bold ${isOutOfStock ? 'text-red-600' :
                                                                        isLowStock ? 'text-amber-600' :
                                                                            'text-gray-900'
                                                                        }`}>
                                                                        {item.quantity}
                                                                    </span>
                                                                    {isOutOfStock && <OutOfStockIcon />}
                                                                    {isLowStock && <LowStockIcon />}
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-3 text-sm text-right text-gray-900">
                                                                {item.currentUnitPrice?.toLocaleString('vi-VN')} ₫
                                                            </td>
                                                            <td className="px-4 py-3 text-sm text-right text-gray-900">
                                                                {item.currentUnitPrice?.toLocaleString('vi-VN')} ₫
                                                            </td>
                                                            <td className="px-4 py-3 text-sm text-gray-900">
                                                                {item.supplierName}
                                                            </td>
                                                            <td className="px-4 py-3 text-sm text-center text-gray-900">
                                                                {item.expiryDate}
                                                            </td>
                                                            <td className="px-4 py-3 text-center">
                                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColor[item.status]}`}>
                                                                    {item.quantity === 0 ? 'Hết hàng' : item.quantity < 10 ? 'Sắp hết hàng' : 'Còn hàng'}
                                                                </span>
                                                            </td>
                                                            <td className="px-4 py-3 text-center">
                                                                <div className="flex items-center justify-center gap-2">
                                                                    <button
                                                                        onClick={() => navigate(`/admin/inventory/edit/${item.partId}`)}
                                                                        className="button button-info button-sm"
                                                                    >
                                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                        </svg>
                                                                        Sửa
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDeletePart(item.partId)}
                                                                        className="button button-danger button-sm"
                                                                    >
                                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                        </svg>
                                                                        Xóa
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {pagination.totalItems > 0 && filteredList.length > 0 && (
                                    <Pagination
                                        totalPage={pagination.totalPages}
                                        currentPage={pagination.currentPage}
                                        totalItems={pagination.totalItems}
                                        pageSize={pagination.pageSize}
                                        onPageChange={(page) =>
                                            setPagination((prev) => ({ ...prev, currentPage: page }))
                                        }
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 