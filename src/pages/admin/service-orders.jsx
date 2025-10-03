import Pagination from "@/components/common/pagination";
import SidebarAdmin from "@/components/common/sidebar-admin";
import { showError } from "@/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ServiceOrdersPage() {
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState('all');
    const [orders, setOrders] = useState([]);
    const [pagination, setPagination] = useState({
        totalItems: 0,
        totalPages: 1,
        currentPage: 1,
        pageSize: 10,
    });
    const token = localStorage.getItem("carserv-token");

    useEffect(() => {
        const fetchOrders = async (page = 1) => {
        try {
            const response = await axios.get(`/api/Order?currentPage=${page}&pageSize=${pagination.pageSize}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "anyvalue",
            },
            });
            const mapped = response.data.items?.map(order => {
                const appointment = order.appointment;
                const customer = appointment?.customer?.customerNavigation;
                const vehicle = appointment?.vehicle;

                return {
                    id: order.orderId,
                    customerName: customer?.fullName || "N/A",
                    customerPhone: customer?.phoneNumber || "N/A",
                    services: appointment?.appointmentServices?.map(s => s.service?.name) || [],
                    totalAmount: order.orderDetails?.reduce((sum, d) => sum + (d.lineTotal || 0), 0) || 0,
                    status: appointment?.status || "Scheduled",
                    scheduledDate: appointment?.appointmentDate 
                    ? new Date(appointment.appointmentDate).toISOString().split("T")[0] 
                    : "N/A",
                    scheduledTime: appointment?.appointmentDate 
                    ? new Date(appointment.appointmentDate).toISOString().split("T")[1].slice(0,5) 
                    : "N/A",
                    assignedStaff: appointment?.serviceHistory?.staff?.staff || "Chưa gán",
                    vehicleInfo: vehicle 
                    ? `${vehicle.make} ${vehicle.model} ${vehicle.year} - ${vehicle.licensePlate}` 
                    : "N/A",
                    notes: appointment?.serviceProgresses?.[0]?.note || ""
                };
                }) || [];

            setOrders(mapped);
            setPagination((prev) => ({
                ...prev,
                totalItems: response.data.totalItems,
                totalPages: response.data.totalPages,
                currentPage: response.data.currentPage,
                pageSize: response.data.pageSize,
            }));
        } catch (error) {
            console.error(error);
            showError("Không thể tải danh sách đơn dịch vụ!");
        }
        };

        fetchOrders(pagination.currentPage);
    }, [pagination.currentPage]);

    const formatDate = (dateStr) => {
        if (!dateStr) return "N/A";
        return new Date(dateStr).toLocaleString("vi-VN", {
        hour12: false
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Scheduled':
                return 'bg-blue-100 text-blue-800';
            case 'In Progress':
                return 'bg-yellow-100 text-yellow-800';
            case 'Completed':
                return 'bg-green-100 text-green-800';
            case 'Cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'Scheduled':
                return 'Đã đặt lịch';
            case 'In Progress':
                return 'Đang xử lý';
            case 'Completed':
                return 'Đã hoàn thành';
            case 'Cancelled':
                return 'Đã hủy';
            default:
                return status;
        }
    };

    const staffList = [
        { id: 1, name: "Nguyễn Thị B" },
        { id: 2, name: "Lê Văn D" },
        { id: 3, name: "Trần Văn F" },
    ];

    const filteredOrders = activeFilter === 'all' 
        ? orders 
        : orders.filter(order => order.status.toLowerCase() === activeFilter.toLowerCase());

    return (
        <div className="flex flex-row w-full h-screen bg-gray-50">
            <div className="flex flex-col w-full">
                {/* Header */}
                <div className="flex justify-between items-center px-8 py-6 border-b bg-white shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Quản Lý Đơn Hàng</h1>
                            <p className="text-sm text-gray-600">Theo dõi và quản lý các đơn dịch vụ từ khách hàng</p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="p-8">
                    {/* Filters */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        <button
                            onClick={() => setActiveFilter('all')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                activeFilter === 'all'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            Tất cả ({orders.length})
                        </button>
                        <button
                            onClick={() => setActiveFilter('scheduled')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                activeFilter === 'scheduled'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            Đã đặt lịch ({orders.filter(o => o.status === 'Scheduled').length})
                        </button>
                        <button
                            onClick={() => setActiveFilter('in progress')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                activeFilter === 'in progress'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            Đang xử lý ({orders.filter(o => o.status === 'In Progress').length})
                        </button>
                        <button
                            onClick={() => setActiveFilter('completed')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                activeFilter === 'completed'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            Đã hoàn thành ({orders.filter(o => o.status === 'Completed').length})
                        </button>
                        <button
                            onClick={() => setActiveFilter('cancelled')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                activeFilter === 'cancelled'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            Đã hủy ({orders.filter(o => o.status === 'Cancelled').length})
                        </button>
                    </div>

                    {/* Orders List */}
                    <div className="space-y-4">
                        {filteredOrders.map((order) => (
                            <div key={order.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">Đơn #{order.id}</h3>
                                            <p className="text-sm text-gray-600">{order.customerName} - {order.customerPhone}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                                {getStatusText(order.status)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 uppercase">Thông tin xe</p>
                                            <p className="text-sm text-gray-900">{order.vehicleInfo}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 uppercase">Lịch hẹn</p>
                                            <p className="text-sm text-gray-900">{order.scheduledDate} - {order.scheduledTime}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 uppercase">Nhân viên phụ trách</p>
                                            <p className="text-sm text-gray-900">{order.assignedStaff || 'Chưa gán'}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 uppercase">Tổng tiền</p>
                                            <p className="text-sm font-bold text-gray-900">{order.totalAmount.toLocaleString()} VND</p>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <p className="text-xs font-medium text-gray-500 uppercase mb-2">Dịch vụ yêu cầu</p>
                                        <div className="flex flex-wrap gap-2">
                                            {order.services.map((service, index) => (
                                                <span key={index} className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs">
                                                    {service}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {order.notes && (
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 uppercase mb-2">Ghi chú</p>
                                            <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">{order.notes}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {filteredOrders.length === 0 && (
                            <div className="text-center py-12">
                                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p className="text-gray-500">Không có đơn dịch vụ nào</p>
                            </div>
                        )}
                        {pagination.totalItems > 0 && filteredOrders.length > 0 && (
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
    );
} 