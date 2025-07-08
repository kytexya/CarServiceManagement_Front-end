import React from 'react';
import { Link } from 'react-router-dom';
import { FaCar, FaCog, FaShieldAlt, FaWrench } from 'react-icons/fa';

const ServiceCard = ({ icon, title, description }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
        <div className="text-4xl text-primary mx-auto mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const BenefitCard = ({ title, description }) => (
    <div className="bg-gray-100 p-6 rounded-lg">
        <h4 className="font-bold text-lg text-primary">{title}</h4>
        <p className="text-gray-700 mt-2">{description}</p>
    </div>
)

export default function Homepage() {
    return (
        <div className="w-full min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 py-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-primary">Trang Quản Trị Hệ Thống CarServ</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-3xl">
                <Link to="/admin/account" className="bg-white rounded-lg shadow p-8 flex flex-col items-center hover:scale-105 transition">
                    <span className="text-3xl mb-2">👤</span>
                    <span className="font-semibold">Quản lý tài khoản</span>
                </Link>
                <Link to="/admin/services" className="bg-white rounded-lg shadow p-8 flex flex-col items-center hover:scale-105 transition">
                    <span className="text-3xl mb-2">🛠️</span>
                    <span className="font-semibold">Quản lý dịch vụ</span>
                </Link>
                <Link to="/admin/report" className="bg-white rounded-lg shadow p-8 flex flex-col items-center hover:scale-105 transition">
                    <span className="text-3xl mb-2">📊</span>
                    <span className="font-semibold">Báo cáo & Thống kê</span>
                </Link>
            </div>
        </div>
    );
}