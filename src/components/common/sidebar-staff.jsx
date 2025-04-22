import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function SidebarStaff() {
    const location = useLocation();

    const checkActive = (keyword) => {
        return location.pathname.includes(keyword);
    };

    return (
        <div className='h-[100vh] min-w-[220px] sticky top-0 bg-primary drop-shadow-sm'>
            <Link to='/staff/trip'>
                <div
                    className={`px-6 py-4 w-full text-md font-bold transition-all duration-300 ${checkActive('trip') ? 'bg-white text-primary' : 'text-white'}`}
                >
                    Quản lý chuyến xe
                </div>
            </Link>
            <Link to='/staff/trip-calendar'>
                <div
                    className={`px-6 py-4 w-full text-md font-bold transition-all duration-300 ${checkActive('trip-calendar') ? 'bg-white text-primary' : 'text-white'}`}
                >
                    Lịch chạy xe
                </div>
            </Link>
            <Link to='/staff/ticket'>
                <div
                    className={`px-6 py-4 w-full text-md font-bold transition-all duration-300 ${checkActive('ticket') ? 'bg-white text-primary' : 'text-white'}`}
                >
                    Quản lý vé
                </div>
            </Link>
            <Link to='/staff/account'>
                <div
                    className={`px-6 py-4 w-full text-md font-bold transition-all duration-300 ${checkActive('account') ? 'bg-white text-primary' : 'text-white'
                        }`}
                >
                    Quản lý khách hàng
                </div>
            </Link>
            <Link to='/staff/transaction'>
                <div
                    className={`px-6 py-4 w-full text-md font-bold transition-all duration-300 ${checkActive('transaction') ? 'bg-white text-primary' : 'text-white'}`}
                >
                    Quản lý giao dịch
                </div>
            </Link>
        </div>
    )
}