import SidebarAdmin from "@/components/common/sidebar-admin";
import { showError } from "@/utils";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ServiceOrdersPage() {
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState('all');
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [selectedStaff, setSelectedStaff] = useState("");

    // Mock data
    const serviceOrders = [
        {
            id: "SO001",
            customerName: "Nguyễn Văn A",
            customerPhone: "0123456789",
            services: ["Bảo trì định kỳ", "Thay nhớt động cơ"],
            totalAmount: 700000,
            status: "Scheduled",
            scheduledDate: "2024-01-15",
            scheduledTime: "09:00",
            assignedStaff: "Nguyễn Thị B",
            vehicleInfo: "Toyota Vios 2022 - 30A-12345",
            notes: "Khách hàng yêu cầu kiểm tra thêm hệ thống phanh"
        },
        {
            id: "SO002",
            customerName: "Trần Thị C",
            customerPhone: "0987654321",
            services: ["Kiểm tra động cơ"],
            totalAmount: 400000,
            status: "In Progress",
            scheduledDate: "2024-01-15",
            scheduledTime: "10:30",
            assignedStaff: "Lê Văn D",
            vehicleInfo: "Honda City 2021 - 29B-67890",
            notes: ""
        },
        {
            id: "SO003",
            customerName: "Phạm Văn E",
            customerPhone: "0555666777",
            services: ["Thay lốp xe", "Bảo trì định kỳ"],
            totalAmount: 1200000,
            status: "Completed",
            scheduledDate: "2024-01-14",
            scheduledTime: "14:00",
            assignedStaff: "Nguyễn Thị B",
            vehicleInfo: "Ford Ranger 2023 - 30C-11111",
            notes: "Đã hoàn thành, khách hàng hài lòng"
        },
        {
            id: "SO004",
            customerName: "Hoàng Thị F",
            customerPhone: "0333444555",
            services: ["Gói Bảo Dưỡng Cơ Bản"],
            totalAmount: 630000,
            status: "Cancelled",
            scheduledDate: "2024-01-16",
            scheduledTime: "11:00",
            assignedStaff: "",
            vehicleInfo: "Mazda 3 2020 - 29A-22222",
            notes: "Khách hàng hủy do có việc đột xuất"
        }
    ];

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
        ? serviceOrders 
        : serviceOrders.filter(order => order.status.toLowerCase() === activeFilter.toLowerCase());

    const handleAssignStaff = (appointment) => {
        setSelectedAppointment(appointment);
        setSelectedStaff(appointment.assignedStaff);
        setShowAssignModal(true);
    };

    const handleUpdateStatus = (orderId) => {
        navigate(`/admin/service-order/${orderId}`)
    };

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
                            <h1 className="text-2xl font-bold text-gray-900">Quản Lý Đơn Dịch Vụ</h1>
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
                            Tất cả ({serviceOrders.length})
                        </button>
                        <button
                            onClick={() => setActiveFilter('scheduled')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                activeFilter === 'scheduled'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            Đã đặt lịch ({serviceOrders.filter(o => o.status === 'Scheduled').length})
                        </button>
                        <button
                            onClick={() => setActiveFilter('in progress')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                activeFilter === 'in progress'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            Đang xử lý ({serviceOrders.filter(o => o.status === 'In Progress').length})
                        </button>
                        <button
                            onClick={() => setActiveFilter('completed')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                activeFilter === 'completed'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            Đã hoàn thành ({serviceOrders.filter(o => o.status === 'Completed').length})
                        </button>
                        <button
                            onClick={() => setActiveFilter('cancelled')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                activeFilter === 'cancelled'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            Đã hủy ({serviceOrders.filter(o => o.status === 'Cancelled').length})
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
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleAssignStaff(order)}
                                                    className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                                                >
                                                    Gán NV
                                                </button>
                                                <button
                                                    onClick={() => handleUpdateStatus(order.id)}
                                                    className="text-green-600 hover:text-green-900 text-sm font-medium"
                                                >
                                                    Cập nhật
                                                </button>
                                            </div>
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
                    </div>
                </div>
            </div>
            {showAssignModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
                    <h2 className="text-lg font-bold mb-4">Gán nhân viên</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                        Chọn nhân viên
                        </label>
                        <select
                        value={selectedStaff}
                        onChange={(e) => setSelectedStaff(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                        <option value="">-- Chọn nhân viên --</option>
                        {staffList.map((staff) => (
                            <option key={staff.id} value={staff.name}>
                            {staff.name}
                            </option>
                        ))}
                        </select>
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                        onClick={() => setShowAssignModal(false)}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
                        >
                        Huỷ
                        </button>
                        <button
                        onClick={() => {
                            if (!selectedStaff) {
                            showError("Vui lòng chọn nhân viên!");
                            return;
                            }
                            // TODO: call API
                            console.log(
                            `Gán ${selectedStaff} cho lịch hẹn ${selectedAppointment.id}`
                            );
                            setShowAssignModal(false);
                        }}
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                        >
                        Xác nhận
                        </button>
                    </div>
                    </div>
                </div>
            )}
        </div>
    );
} 