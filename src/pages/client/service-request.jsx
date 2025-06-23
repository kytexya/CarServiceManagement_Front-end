import Loading from '@/components/common/loading';
import { showError, showSuccess } from '@/utils';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const baseURL = import.meta.env.VITE_API_BASE_URL;

// Mock data for available services, this would ideally come from the backend
const availableServices = [
    { id: 'regular_maintenance', name: 'Bảo dưỡng định kỳ' },
    { id: 'general_repair', name: 'Sửa chữa chung' },
    { id: 'tire_service', name: 'Dịch vụ lốp xe' },
    { id: 'oil_change', name: 'Thay dầu' },
    { id: 'diagnostics', name: 'Kiểm tra & chẩn đoán' },
];

export default function ServiceRequestPage() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [vehicles, setVehicles] = useState([]); // User's registered vehicles
    const [loading, setLoading] = useState(false);
    const [requestSubmitted, setRequestSubmitted] = useState(false);
    const [submittedData, setSubmittedData] = useState(null);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        // Check for user profile
        const storedProfile = localStorage.getItem("carserv-profile");
        if (storedProfile) {
            const parsedProfile = JSON.parse(storedProfile);
            setProfile(parsedProfile);

            // --- MOCK API CALL to get user's vehicles ---
            // In a real app, you would fetch this from your backend
            setLoading(true);
            // Example: axios.get(`${baseURL}/api/Customer/${parsedProfile.customerId}/vehicles`)
            setTimeout(() => {
                setVehicles([
                    { id: 'veh1', name: 'Toyota Camry - 51F-123.45' },
                    { id: 'veh2', name: 'Ford Ranger - 51C-678.90' },
                ]);
                setLoading(false);
            }, 1000);

        } else {
            // Redirect to login if not logged in
            navigate('/login');
        }
    }, [navigate]);

    const onSubmit = (data) => {
        if (!profile?.customerId) {
            showError('Vui lòng đăng nhập để đặt lịch hẹn.');
            return;
        }
        setLoading(true);

        const payload = {
            customerId: profile.customerId,
            vehicleId: data.vehicle,
            serviceType: data.serviceType,
            appointmentDate: data.appointmentDate,
            notes: data.notes,
        };

        console.log('Service Request Payload:', payload);

        // --- MOCK API CALL to submit the service request ---
        // Example: axios.post(`${baseURL}/api/ServiceRequest/create`, payload)
        setTimeout(() => {
            showSuccess('Yêu cầu của bạn đã được gửi thành công!');
            setSubmittedData(payload);
            setRequestSubmitted(true);
            setLoading(false);
        }, 1500);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="px-8 md:px-10 w-full max-w-[800px] mx-auto py-10 my-20">
            {requestSubmitted ? (
                <div className="flex flex-col items-center gap-4 border shadow-lg rounded-md p-8 bg-green-50">
                    <h1 className='text-2xl font-bold text-center text-green-700'>Lịch hẹn đã được ghi nhận!</h1>
                    <p className="text-center">Cảm ơn bạn đã đặt lịch. Chúng tôi sẽ sớm liên hệ với bạn để xác nhận. Dưới đây là thông tin chi tiết:</p>
                    <div className='w-full max-w-md mt-4 text-left space-y-2'>
                        <p><strong>Xe:</strong> {vehicles.find(v => v.id === submittedData.vehicleId)?.name}</p>
                        <p><strong>Dịch vụ:</strong> {availableServices.find(s => s.id === submittedData.serviceType)?.name}</p>
                        <p><strong>Ngày hẹn:</strong> {new Date(submittedData.appointmentDate).toLocaleDateString('vi-VN')}</p>
                        <p><strong>Ghi chú:</strong> {submittedData.notes || 'Không có'}</p>
                    </div>
                    <button onClick={() => navigate('/')} className="bg-primary text-white font-bold py-2 mt-4 px-6 rounded-md hover:bg-blue-700">
                        Quay về trang chủ
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full justify-center gap-6 border shadow-lg rounded-md p-8">
                    <h1 className='text-2xl font-bold text-center mb-4'>Đặt lịch hẹn dịch vụ</h1>

                    <div className="flex flex-col gap-2">
                        <label className="text-md font-semibold">Chọn xe của bạn</label>
                        <select
                            className={`border px-5 py-3 rounded-lg ${errors.vehicle ? "border-red-500" : "border-gray-300"}`}
                            {...register("vehicle", { required: "Vui lòng chọn xe" })}
                        >
                            <option value="">-- Chọn xe --</option>
                            {vehicles.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                            <option value="add_new">-- Thêm xe mới --</option>
                        </select>
                        {errors.vehicle && <p className="text-red-500 text-sm">{errors.vehicle.message}</p>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-md font-semibold">Loại dịch vụ</label>
                        <select
                            className={`border px-5 py-3 rounded-lg ${errors.serviceType ? "border-red-500" : "border-gray-300"}`}
                            {...register("serviceType", { required: "Vui lòng chọn dịch vụ" })}
                        >
                            <option value="">-- Chọn dịch vụ --</option>
                            {availableServices.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                        {errors.serviceType && <p className="text-red-500 text-sm">{errors.serviceType.message}</p>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-md font-semibold">Ngày hẹn mong muốn</label>
                        <input
                            type="date"
                            min={new Date().toISOString().split("T")[0]} // Today as minimum date
                            className={`border px-5 py-3 rounded-lg ${errors.appointmentDate ? "border-red-500" : "border-gray-300"}`}
                            {...register("appointmentDate", { required: "Vui lòng chọn ngày hẹn" })}
                        />
                        {errors.appointmentDate && <p className="text-red-500 text-sm">{errors.appointmentDate.message}</p>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-md font-semibold">Ghi chú thêm</label>
                        <textarea
                            rows="4"
                            placeholder="Mô tả thêm về tình trạng xe hoặc yêu cầu của bạn..."
                            className="border px-5 py-3 rounded-lg border-gray-300"
                            {...register("notes")}
                        />
                    </div>

                    <button type="submit" className="bg-primary text-white font-bold py-3 mt-4 px-4 rounded-md w-full hover:bg-blue-700">
                        Gửi yêu cầu
                    </button>
                </form>
            )}
        </div>
    );
} 