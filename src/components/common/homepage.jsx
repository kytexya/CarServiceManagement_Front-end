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
        <div className="w-full">
            {/* Hero Section */}
            <div
                className="relative bg-cover bg-center text-white py-40 px-4"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1553974403-3e75e913a483?q=80&w=2070&auto=format&fit=crop')" }}
            >
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl font-extrabold mb-4 leading-tight">Dịch Vụ Chăm Sóc Xe Hơi Toàn Diện</h1>
                    <p className="text-xl mb-8">
                        Mang đến sự an tâm và hiệu suất tối ưu cho chiếc xe của bạn với đội ngũ chuyên gia hàng đầu.
                    </p>
                    <Link to="/service-request" className="button primary !text-lg !py-3 !px-8">
                        Đặt Lịch Dịch Vụ
                    </Link>
                </div>
            </div>

            {/* Services Section */}
            <div className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold">Dịch Vụ Của Chúng Tôi</h2>
                        <p className="text-gray-600 mt-2">Từ bảo dưỡng định kỳ đến sửa chữa phức tạp, chúng tôi lo tất cả.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <ServiceCard
                            icon={<FaWrench />}
                            title="Bảo Dưỡng Định Kỳ"
                            description="Kiểm tra và bảo dưỡng toàn diện để xe luôn hoạt động ở trạng thái tốt nhất."
                        />
                        <ServiceCard
                            icon={<FaCog />}
                            title="Sửa Chữa Phức Tạp"
                            description="Chẩn đoán và sửa chữa các vấn đề về động cơ, hộp số, và hệ thống điện."
                        />
                        <ServiceCard
                            icon={<FaCar />}
                            title="Chăm Sóc Thân Vỏ"
                            description="Dịch vụ đồng sơn, detailing, và phủ ceramic để xe luôn bóng đẹp như mới."
                        />
                        <ServiceCard
                            icon={<FaShieldAlt />}
                            title="Kiểm Tra An Toàn"
                            description="Kiểm tra hệ thống phanh, lốp, và các tính năng an toàn khác cho mỗi chuyến đi."
                        />
                    </div>
                </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold">Tại Sao Chọn CarServ?</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <BenefitCard
                            title="Kỹ Thuật Viên Chuyên Nghiệp"
                            description="Đội ngũ của chúng tôi được đào tạo chuyên sâu và có nhiều năm kinh nghiệm trong ngành."
                        />
                        <BenefitCard
                            title="Phụ Tùng Chính Hãng"
                            description="Chúng tôi cam kết sử dụng phụ tùng chất lượng cao, đảm bảo độ bền và an toàn."
                        />
                        <BenefitCard
                            title="Giá Cả Minh Bạch"
                            description="Mọi chi phí đều được báo giá rõ ràng, chi tiết trước khi thực hiện dịch vụ."
                        />
                        <BenefitCard
                            title="Bảo Hành Uy Tín"
                            description="Chính sách bảo hành dài hạn cho cả dịch vụ và phụ tùng thay thế."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}