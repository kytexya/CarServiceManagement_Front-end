import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from '@/assets/images/logo.png';

export default function SidebarInventoryManager() {
  const location = useLocation();

  const checkActive = (keyword) => {
    return location.pathname.startsWith(`/inventory-manager/${keyword}`);
  };

  return (
    <div className='h-[100vh] min-w-[220px] sticky top-0 bg-primary drop-shadow-sm flex flex-col'>
      <Link className="px-6 aspect-video flex items-center max-h-[64px]" to='/'>
        <div className="text-4xl py-4 text-white flex items-center gap-2">
          <img src={Logo} alt="logo" className="w-12 h-12 object-cover" />
          <span className='text-2xl font-bold'>CarServ</span>
        </div>
      </Link>
      <div className='flex-grow'>
        <Link to='/inventory-manager/inventory'>
          <div
            className={`px-6 py-4 w-full text-md font-bold transition-all duration-300 ${checkActive('inventory') ? 'bg-white text-primary' : 'text-white hover:bg-white/20'}`}
          >
            Quản Lý Kho
          </div>
        </Link>
        <Link to='/inventory-manager/orders'>
          <div
            className={`px-6 py-4 w-full text-md font-bold transition-all duration-300 ${checkActive('orders') ? 'bg-white text-primary' : 'text-white hover:bg-white/20'}`}
          >
            Đơn Hàng NCC
          </div>
        </Link>
        <Link to='/inventory-manager/reports'>
          <div
            className={`px-6 py-4 w-full text-md font-bold transition-all duration-300 ${checkActive('reports') ? 'bg-white text-primary' : 'text-white hover:bg-white/20'}`}
          >
            Báo Cáo Tồn Kho
          </div>
        </Link>
      </div>
      <div className="py-4 flex flex-col justify-center w-full px-4 gap-3">
        <button className="button !bg-success !text-white !min-w-[104px]">
          Quản Lý Kho
        </button>
        <button onClick={() => {
          // Add logout logic here
          localStorage.removeItem('carserv-profile');
          localStorage.removeItem('carserv-token');
          window.location.href = '/login-manager';
        }} className="button !bg-red-500 !text-white min-w-[104px]">
          Đăng xuất
        </button>
      </div>
    </div>
  )
} 