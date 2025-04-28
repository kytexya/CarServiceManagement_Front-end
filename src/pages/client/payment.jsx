import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { formatToMoney, showError, showSuccess } from '@/utils';
import Loading from '@/components/common/loading';
const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function PaymentSuccessPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlParams);
    const vnp_Amount = params.vnp_Amount / 100;
    const vnp_BankCode = params.vnp_BankCode;
    const vnp_BankTranNo = params.vnp_BankTranNo;
    const vnp_ResponseCode = params.vnp_ResponseCode;
    const [customerId, setCustomerId] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const profile = localStorage.getItem("bus-profile");
        if (profile) {
            const parsedProfile = JSON.parse(profile);
            setCustomerId(parsedProfile?.customerId);
        }
    }, []);

    const vnp_TxnRef = params.vnp_TxnRef;
    const [status, setStatus] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (customerId && vnp_ResponseCode === '00') {
            setLoading(true);
            const payload = { customerId: customerId };
            axios.post(`${baseURL}/api/Transaction`, payload, {
                headers: {
                    'ngrok-skip-browser-warning': 69420,
                    'Content-Type': 'application/json',
                }
            })
                .then((res) => {
                    if (res?.status === 200) {
                        showSuccess();
                        setStatus('success');
                        setLoading(false);
                    }
                })
                .catch((e) => {
                    setLoading(false);
                    setStatus('fail');
                    showError(e.response?.data?.message);
                });
        }
    }, [customerId, vnp_ResponseCode]);

    if (loading | status) {
        <Loading />
    }

    return (
        <div className="mx-auto max-w-md px-5 flex flex-col mt-32 gap-6 mb-20">
            <div className="border rounded-2xl shadow-md p-8">
                <div className="flex flex-col items-center gap-4">
                    {status === 'success' && (
                        <div className="flex flex-col items-center gap-4">

                            <p className="text-success text-center font-bold">
                                Thanh toán giao dịch thành công
                            </p>
                        </div>
                    )}
                    {status === 'fail' &&
                        (
                            <div className="flex flex-col items-center gap-4">
                                <p className="text-danger text-center font-bold">
                                    Thanh toán giao dịch thất bại
                                </p>
                            </div>
                        )}
                </div>

                <div className="my-6 border-t"></div>

                <div className="flex flex-col gap-4 text-sm">
                    <div className="flex justify-between">
                        <span className="font-semibold">Ngân hàng:</span>
                        <span>{vnp_BankCode}</span>
                    </div>

                    {vnp_BankTranNo && (
                        <div className="flex justify-between">
                            <span className="font-semibold">Mã chuyển khoản:</span>
                            <span>{vnp_BankTranNo}</span>
                        </div>
                    )}

                    <div className="flex justify-between">
                        <span className="font-semibold">Mã giao dịch:</span>
                        <span>{vnp_TxnRef}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="font-semibold">Số tiền:</span>
                        <span>{formatToMoney(vnp_Amount)}</span>
                    </div>

                    <button
                        onClick={() => navigate("/history")}
                        className="button !bg-blue-500 !text-white"
                    >
                        Lịch sử đặt vé
                    </button>
                </div>
            </div>
        </div>
    );
}