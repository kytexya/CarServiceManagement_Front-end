import CustomTable from "@/components/common/table";
import { formatDateTime, formatToMoney, showError } from "@/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const baseURL = import.meta.env.VITE_API_BASE_URL;

// New columns for the service history table
const columns = [
    { header: "Mã Dịch Vụ", field: "serviceId" },
    { header: "Tên Xe", field: "vehicleName" },
    { header: "Loại Dịch Vụ", field: "serviceType" },
    { header: "Ngày Hẹn", field: "appointmentDate" },
    { header: "Chi Phí", field: "cost" },
    { header: "Trạng Thái", field: "status", className: "status-box" },
];

// Mock status styles
const getStatusClass = (status) => {
    switch (status) {
        case 'Hoàn thành':
            return 'bg-green-100 text-green-800';
        case 'Đã hủy':
            return 'bg-red-100 text-red-800';
        case 'Đang xử lý':
            return 'bg-yellow-100 text-yellow-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};


export default function ServiceHistoryPage() {
    const [dataList, setDataList] = useState([]);
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedProfile = localStorage.getItem("carserv-profile");
        if (storedProfile) {
            const parsedProfile = JSON.parse(storedProfile);
            setProfile(parsedProfile);
        } else {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        if (profile?.customerId) {
            fetchServiceHistory(profile.customerId);
        }
    }, [profile]);

    function fetchServiceHistory(customerId) {
        // --- MOCK API CALL to get service history ---
        // Example: axios.get(`${baseURL}/api/ServiceRequest/history/${customerId}`)
        console.log(`Fetching history for customer ${customerId}...`);
        const mockData = [
            { serviceId: 'SRV001', vehicleName: 'Toyota Camry - 51F-123.45', serviceType: 'Bảo dưỡng định kỳ', appointmentDate: '2024-05-20', cost: 1500000, status: 'Hoàn thành' },
            { serviceId: 'SRV002', vehicleName: 'Ford Ranger - 51C-678.90', serviceType: 'Kiểm tra & chẩn đoán', appointmentDate: '2024-06-10', cost: 500000, status: 'Hoàn thành' },
            { serviceId: 'SRV003', vehicleName: 'Toyota Camry - 51F-123.45', serviceType: 'Sửa chữa chung', appointmentDate: '2024-07-25', cost: 0, status: 'Đang xử lý' },
            { serviceId: 'SRV004', vehicleName: 'Toyota Camry - 51F-123.45', serviceType: 'Thay dầu', appointmentDate: '2024-04-15', cost: 700000, status: 'Đã hủy' },
        ];

        setDataList(
            mockData.map((item) => ({
                ...item,
                appointmentDate: formatDateTime(item.appointmentDate),
                cost: formatToMoney(item.cost),
                // Apply status styling
                status: <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusClass(item.status)}`}>{item.status}</span>
            }))
        );
    }

    function handleViewDetails(id) {
        // Navigate to a detailed view of the service
        console.log("Viewing details for service ID:", id);
        // navigate(`/service-history/${id}`);
        showError("Chức năng xem chi tiết chưa được cài đặt.");
    }

    return (
        <div className="px-8 md:px-10 max-w-[1200px] mx-auto py-10 my-20">
            <div className="border shadow-lg rounded-lg p-4">
                <h1 className="text-2xl font-bold mb-4">Lịch sử dịch vụ</h1>
                <CustomTable
                    columns={columns}
                    data={dataList}
                    renderActions={(row) => (
                        <div className="flex gap-2 justify-center">
                            <button
                                onClick={() => handleViewDetails(row.serviceId)}
                                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                            >
                                Xem chi tiết
                            </button>
                        </div>
                    )}
                />
            </div>
        </div>
    );
} 