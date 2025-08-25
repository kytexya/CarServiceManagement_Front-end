import Pagination from "@/components/common/pagination";
import SidebarAdmin from "@/components/common/sidebar-admin";
import { showError } from "@/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ScheduleManagementPage() {
    const [activeTab, setActiveTab] = useState('appointments');
    const [selectedDate, setSelectedDate] = useState('2025-08-01');
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [selectedStaff, setSelectedStaff] = useState("");
    const [appointments, setAppointments] = useState(null);
    const [pagination, setPagination] = useState({
        totalItems: 0,
        totalPages: 1,
        currentPage: 1,
        pageSize: 10,
    });
    const token = localStorage.getItem("carserv-token");

    useEffect(() => {
        if (activeTab === "appointments") {
          fetchAppointments(pagination.currentPage);
        } else {
          fetchWokingHours();
        }
    }, [activeTab, pagination.currentPage]);

    const fetchAppointments = async (page = 1) => {
        try {
        const res = await axios.get(`/api/Appointment?currentPage=${page}&pageSize=${pagination.pageSize}`, { 
            headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'anyvalue',
            },
            withCredentials: true
        });
        setAppointments(res.data.items || []);
        setPagination((prev) => ({
            ...prev,
            totalItems: res.data.totalItems,
            totalPages: res.data.totalPages,
            currentPage: res.data.currentPage,
            pageSize: res.data.pageSize,
        }));
        } catch (err) {
        console.log(err);
        showError("Không tải được");
        }
    };

    const fetchWokingHours = async () => {
        try {
        const res = await axios.get("/api/Appointment", { 
            headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'anyvalue',
            },
            withCredentials: true
        });
        // setAppointments(res.data || []);
        } catch (err) {
        console.log(err);
        showError("Không tải được");
        }
    };

    // Mock data
    const workingHours = {
        monday: { start: "08:00", end: "18:00", isOpen: true },
        tuesday: { start: "08:00", end: "18:00", isOpen: true },
        wednesday: { start: "08:00", end: "18:00", isOpen: true },
        thursday: { start: "08:00", end: "18:00", isOpen: true },
        friday: { start: "08:00", end: "18:00", isOpen: true },
        saturday: { start: "08:00", end: "16:00", isOpen: true },
        sunday: { start: "09:00", end: "15:00", isOpen: false },
    };

    const appointmentsMock = [
        {
            id: 1,
            customerName: "Nguyễn Văn A",
            customerPhone: "0123456789",
            service: "Bảo trì định kỳ",
            date: "2024-01-15",
            time: "09:00",
            duration: 120,
            status: "Confirmed",
            assignedStaff: "Nguyễn Thị B",
            vehicleInfo: "Toyota Vios 2022"
        },
        {
            id: 2,
            customerName: "Trần Thị C",
            customerPhone: "0987654321",
            service: "Thay nhớt động cơ",
            date: "2024-01-15",
            time: "10:30",
            duration: 45,
            status: "Confirmed",
            assignedStaff: "Lê Văn D",
            vehicleInfo: "Honda City 2021"
        },
        {
            id: 3,
            customerName: "Phạm Văn E",
            customerPhone: "0555666777",
            service: "Kiểm tra động cơ",
            date: "2024-01-15",
            time: "14:00",
            duration: 90,
            status: "Pending",
            assignedStaff: "",
            vehicleInfo: "Ford Ranger 2023"
        },
        {
            id: 4,
            customerName: "Hoàng Thị F",
            customerPhone: "0333444555",
            service: "Gói Bảo Dưỡng Cơ Bản",
            date: "2024-01-16",
            time: "11:00",
            duration: 180,
            status: "Confirmed",
            assignedStaff: "Nguyễn Thị B",
            vehicleInfo: "Mazda 3 2020"
        }
    ];

    const timeSlots = [
        "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
        "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Confirmed':
                return 'bg-green-100 text-green-800';
            case 'Pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'Cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'Confirmed':
                return 'Đã xác nhận';
            case 'Pending':
                return 'Chờ xác nhận';
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

    const handleUpdateWorkingHours = () => {
        showError("Chức năng cập nhật giờ làm việc chưa được kết nối API.");
    };

    const handleConfirmAppointment = async (appointment) => {
        showError("Chức năng cập nhật giờ làm việc chưa được kết nối API.");
        // try {
        //     const token = localStorage.getItem("carserv-token");
        //     const response = await axios.post(
        //         `/api/Appointment/schedule`,
        //         {
        //             vehicleId: appointment.vehicleId,
        //             packageId: appointment.packageId,
        //             promotionId: appointment.promotionId,
        //             appointmentDate: appointment.appointmentDate,
        //             serviceIds: appointment.appointmentServices,
        //         },
        //         {
        //             headers: {
        //                 Authorization: `Bearer ${token}`,
        //                 "ngrok-skip-browser-warning": "anyvalue",
        //             },
        //             params: {
        //                 customerId: appointment.customerId
        //             }
        //         }
        //     );
        //     showSuccess("Xác nhận lịch hẹn thành công!");

        //     navigate('/admin/service-management')
        // } catch (error) {
        //     console.error("Error:", error);
        //     showError(
        //         error.response?.data?.message || "Xác nhận lịch hẹn thất bại!"
        //     );
        // }
    };

    const handleAssignStaff = (appointment) => {
        setSelectedAppointment(appointment);
        setSelectedStaff(appointment.assignedStaff);
        setShowAssignModal(true);
    };

    const roundToNearest30 = (dateString) => {
        const d = new Date(dateString);

        let hours = d.getHours();
        let minutes = d.getMinutes();

        minutes = minutes < 15 ? 0 : minutes < 45 ? 30 : 0;
        if (minutes === 0 && d.getMinutes() >= 45) {
            hours = (hours + 1) % 24;
        }

        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
        }


    return (
        <div className="flex flex-row w-full h-screen bg-gray-50">
            <div className="flex flex-col w-full">
                {/* Header */}
                <div className="flex justify-between items-center px-8 py-6 border-b bg-white shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Quản Lý Lịch Làm Việc</h1>
                            <p className="text-sm text-gray-600">Cấu hình giờ làm việc và quản lý lịch hẹn</p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="p-8">
                    {/* Tabs */}
                    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
                        <button
                            onClick={() => setActiveTab('appointments')}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                                activeTab === 'appointments'
                                    ? 'bg-white text-blue-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Lịch Hẹn
                        </button>
                        <button
                            onClick={() => setActiveTab('working-hours')}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                                activeTab === 'working-hours'
                                    ? 'bg-white text-blue-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Giờ Làm Việc
                        </button>
                    </div>

                    {/* Appointments Tab */}
                    {activeTab === 'appointments' && (
                        <div className="space-y-6">
                            {/* Date Selector */}
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-bold text-gray-900">Lịch Hẹn Ngày {selectedDate}</h2>
                                    <input
                                        type="date"
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                {/* Time Slots */}
                                <div className="grid grid-cols-6 gap-2">
                                    {timeSlots.map((time) => {
                                        const appointment = appointments?.find(apt => {
                                            const datePart = apt.appointmentDate.split("T")[0];
                                            const timePart = roundToNearest30(apt.appointmentDate);
                                            return datePart === selectedDate && timePart.slice(0, 5) === time;
                                        });
                                        return (
                                            <div key={time} className="relative">
                                                <div className={`p-3 rounded-lg border text-center text-sm ${
                                                    appointment 
                                                        ? 'bg-blue-100 border-blue-300' 
                                                        : 'bg-gray-50 border-gray-200'
                                                }`}>
                                                    <div className="font-medium">{time}</div>
                                                    {appointment && (
                                                        <div className="text-xs text-blue-700 mt-1">
                                                            {appointment.customerName}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Appointments List */}
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 px-8 py-6 border-b border-gray-100">
                                    <h2 className="text-xl font-bold text-gray-900">Danh Sách Lịch Hẹn</h2>
                                    <p className="text-sm text-gray-600">Quản lý và xác nhận lịch hẹn của khách hàng</p>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khách Hàng</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dịch Vụ</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời Gian</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nhân Viên</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng Thái</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao Tác</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {appointments?.map((appointment) => (
                                                <tr key={appointment.appointmentId} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">{appointment?.customerName}</div>
                                                            <div className="text-sm text-gray-500">{appointment?.customerPhone}</div>
                                                            <div className="text-xs text-gray-400">{appointment?.vehicleMake + ' ' + appointment?.vehicleModel}</div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div>
                                                            <div className="text-sm text-gray-900">
                                                                {appointment.services.length <= 2 
                                                                    ? appointment.services.join(", ") 
                                                                    : `${appointment.services.slice(0, 2).join(", ")}, ...`}
                                                            </div>
                                                            <div className="text-xs text-gray-500">{appointment.duration} giờ</div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {new Date(appointment.appointmentDate).toLocaleDateString("vi-VN", { year: "numeric", month: "2-digit", day: "2-digit" })}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {new Date(appointment.appointmentDate).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{appointment.assignedStaff || 'Chưa gán'}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                                                            {getStatusText(appointment.status)}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => handleConfirmAppointment(appointment)}
                                                                className="text-blue-600 hover:text-blue-900"
                                                            >
                                                                Xác nhận
                                                            </button>
                                                            <button
                                                                onClick={() => handleAssignStaff(appointment)}
                                                                className="text-green-600 hover:text-green-900"
                                                            >
                                                                Gán NV
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {pagination.totalItems > 0 && (
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
                    )}

                    {/* Working Hours Tab */}
                    {activeTab === 'working-hours' && (
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-8 py-6 border-b border-gray-100">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">Cấu Hình Giờ Làm Việc</h2>
                                        <p className="text-sm text-gray-600">Thiết lập khung giờ làm việc của trung tâm</p>
                                    </div>
                                    <button
                                        onClick={handleUpdateWorkingHours}
                                        className="button primary"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Cập Nhật
                                    </button>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="space-y-4">
                                    {Object.entries(workingHours).map(([day, hours]) => (
                                        <div key={day} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-4">
                                                <div className="w-24">
                                                    <span className="text-sm font-medium text-gray-900 capitalize">
                                                        {day === 'monday' ? 'Thứ 2' :
                                                         day === 'tuesday' ? 'Thứ 3' :
                                                         day === 'wednesday' ? 'Thứ 4' :
                                                         day === 'thursday' ? 'Thứ 5' :
                                                         day === 'friday' ? 'Thứ 6' :
                                                         day === 'saturday' ? 'Thứ 7' : 'Chủ nhật'}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="time"
                                                        value={hours.start}
                                                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                        disabled={!hours.isOpen}
                                                        readOnly
                                                    />
                                                    <span className="text-gray-500">-</span>
                                                    <input
                                                        type="time"
                                                        value={hours.end}
                                                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                        disabled={!hours.isOpen}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <label className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={hours.isOpen}
                                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                        readOnly
                                                    />
                                                    <span className="ml-2 text-sm text-gray-700">Mở cửa</span>
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
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