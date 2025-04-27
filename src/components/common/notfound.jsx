import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
            <h1 className="text-7xl font-bold mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-2">Trang không tồn tại</h2>
            <p className="mb-6">Rất tiếc, chúng tôi không tìm thấy trang bạn yêu cầu.</p>
            <Link
                to="/"
                className="px-6 py-3 border border-black rounded-md font-bold hover:bg-black hover:text-white transition-all"
            >
                Về trang chủ
            </Link>
        </div>
    );
}