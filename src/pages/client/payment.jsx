import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatToMoney } from '@/utils';
import { FaCheckCircle, FaTimesCircle, FaCreditCard, FaReceipt, FaTag } from 'react-icons/fa';

// Mock data for demonstration
const mockTransaction = {
    bankCode: "NCB",
    bankTranNo: "VNP14282036",
    transactionId: "SRV-1721722883",
    amount: 750000,
};

export default function PaymentConfirmationPage() {
    // Demo-only state to toggle between success and failure views
    const [isSuccess, setIsSuccess] = useState(true);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full mx-auto">
                {/* Demo-only controls */}
                <div className="flex justify-center gap-4 mb-4">
                    <button onClick={() => setIsSuccess(true)} className={`button ${isSuccess ? 'primary' : ''}`}>Xem Giao Diện Thành Công</button>
                    <button onClick={() => setIsSuccess(false)} className={`button ${!isSuccess ? '!bg-red-500 text-white' : ''}`}>Xem Giao Diện Thất Bại</button>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {isSuccess ? (
                        <div className="flex flex-col items-center gap-4 text-center">
                            <FaCheckCircle className="text-6xl text-green-500" />
                            <h1 className="text-2xl font-bold text-gray-800">Thanh toán thành công!</h1>
                            <p className="text-gray-600">Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của CarServ.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-4 text-center">
                            <FaTimesCircle className="text-6xl text-red-500" />
                            <h1 className="text-2xl font-bold text-gray-800">Thanh toán thất bại</h1>
                            <p className="text-gray-600">Đã có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại hoặc liên hệ hỗ trợ.</p>
                        </div>
                    )}

                    <div className="my-6 border-t border-gray-200"></div>

                    <div className="flex flex-col gap-4 text-sm">
                        <div className="flex justify-between">
                            <span className="font-semibold text-gray-500 flex items-center gap-2"><FaCreditCard /> Ngân hàng</span>
                            <span className="font-mono">{mockTransaction.bankCode}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold text-gray-500 flex items-center gap-2"><FaReceipt /> Mã GD Ngân hàng</span>
                            <span className="font-mono">{isSuccess ? mockTransaction.bankTranNo : "N/A"}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold text-gray-500 flex items-center gap-2"><FaTag /> Mã đơn hàng</span>
                            <span className="font-mono">{mockTransaction.transactionId}</span>
                        </div>
                        <div className="flex justify-between text-base font-bold">
                            <span>TỔNG CỘNG</span>
                            <span>{formatToMoney(mockTransaction.amount)}</span>
                        </div>
                    </div>

                    <div className="mt-8">
                        <Link to="/service-history" className="button primary w-full">
                            Xem Lịch Sử Dịch Vụ
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}