import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCar, FaHistory } from 'react-icons/fa';

// Mock data for demonstration
const mockCustomer = {
    name: "Trần Văn Khách",
    email: "tvkhach@example.com",
    phoneNumber: "0909123456",
    address: "456 Đường XYZ, Quận 2, TP. HCM",
    vehicles: [
        { id: 1, name: "Toyota Camry 2021", license: "51F-555.55" },
        { id: 2, name: "Ford Ranger 2022", license: "60C-123.45" },
    ]
};

const ProfileInfoRow = ({ icon, label, value }) => (
    <div className="flex items-center border-b py-4">
        <div className="w-8 text-primary">{icon}</div>
        <div className="w-1/3 text-gray-600 font-semibold">{label}</div>
        <div className="w-2/3 text-gray-800">{value}</div>
    </div>
);

export default function ProfilePage() {
    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white text-4xl font-bold">
                            {mockCustomer.name.charAt(0)}
                        </div>
                        <div>
                            <h1 className='text-3xl font-bold'>{mockCustomer.name}</h1>
                            <p className="text-gray-500">{mockCustomer.email}</p>
                        </div>
                        <div className="md:ml-auto">
                            <Link
                                to="/edit-profile"
                                className="button primary"
                            >
                                Chỉnh Sửa
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="px-8 pb-8">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Thông Tin Cá Nhân</h2>
                    <div className="flex flex-col">
                        <ProfileInfoRow icon={<FaUser />} label="Họ và Tên" value={mockCustomer.name} />
                        <ProfileInfoRow icon={<FaEnvelope />} label="Email" value={mockCustomer.email} />
                        <ProfileInfoRow icon={<FaPhone />} label="Số điện thoại" value={mockCustomer.phoneNumber} />
                        <ProfileInfoRow icon={<FaMapMarkerAlt />} label="Địa chỉ" value={mockCustomer.address} />
                    </div>

                    <h2 className="text-xl font-bold mt-10 mb-4 text-gray-800">Thông Tin Xe & Dịch Vụ</h2>
                    <div className="flex flex-col">
                        <ProfileInfoRow
                            icon={<FaCar />}
                            label="Số xe đã đăng ký"
                            value={`${mockCustomer.vehicles.length} xe`}
                        />
                        <div className="flex items-center border-b py-4">
                            <div className="w-8 text-primary"><FaHistory /></div>
                            <div className="w-1/3 text-gray-600 font-semibold">Lịch sử dịch vụ</div>
                            <div className="w-2/3">
                                <Link to="/service-history" className="text-primary hover:underline">
                                    Xem chi tiết
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}