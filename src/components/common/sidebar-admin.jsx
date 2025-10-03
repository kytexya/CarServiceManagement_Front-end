import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from '@/assets/images/logo-car.png';

export default function SidebarAdmin() {
  const location = useLocation();

  const checkActive = (keyword) => {
    if (keyword === '') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(`/admin/${keyword}`);
  };

  return (
    <div className='h-screen w-[220px] bg-primary flex flex-col sticky left-0 top-0 z-50'>
      <Link className="px-6 py-4 flex items-center justify-center" to='/'>
        <div className="text-4xl py-4 text-white flex items-center gap-2 justify-center w-full">
          <img src={Logo} alt="logo" className="w-20 h-20 object-cover" />
          <span className='text-2xl font-bold'></span>
        </div>
      </Link>
      <div className='flex-grow flex flex-col'>
        <Link to='/admin/report'>
          <div
            className={`px-6 py-4 w-full text-md font-bold transition-all duration-300 ${(checkActive('report') || checkActive('')) ? 'bg-white text-primary' : 'text-white hover:bg-white/20'}`}
          >
            Báo cáo
          </div>
        </Link>
        <Link to='/admin/user-management'>
          <div
            className={`px-6 py-4 w-full text-md font-bold transition-all duration-300 ${checkActive('user-management') ? 'bg-white text-primary' : 'text-white hover:bg-white/20'}`}
          >
            Quản lý người dùng
          </div>
        </Link>
        <Link to='/admin/service-management'>
          <div
            className={`px-6 py-4 w-full text-md font-bold transition-all duration-300 ${checkActive('service-management') ? 'bg-white text-primary' : 'text-white hover:bg-white/20'}`}
          >
            Cấu hình dịch vụ
          </div>
        </Link>
        <Link to='/admin/service-orders'>
          <div
            className={`px-6 py-4 w-full text-md font-bold transition-all duration-300 ${checkActive('service-orders') ? 'bg-white text-primary' : 'text-white hover:bg-white/20'}`}
          >
            Quản lý đơn hàng
          </div>
        </Link>
        <Link to='/admin/schedule-management'>
          <div
            className={`px-6 py-4 w-full text-md font-bold transition-all duration-300 ${checkActive('schedule-management') ? 'bg-white text-primary' : 'text-white hover:bg-white/20'}`}
          >
            Quản lý lịch làm việc
          </div>
        </Link>
        <Link to='/admin/request'>
          <div
            className={`px-6 py-4 w-full text-md font-bold transition-all duration-300 ${checkActive('request') ? 'bg-white text-primary' : 'text-white hover:bg-white/20'}`}
          >
            Quản lý đơn xin nghỉ phép
          </div>
        </Link>
        <Link to='/admin/inventory-overview'>
          <div
            className={`px-6 py-4 w-full text-md font-bold transition-all duration-300 ${checkActive('inventory-overview') ? 'bg-white text-primary' : 'text-white hover:bg-white/20'}`}
          >
            Quản lý kho phụ tùng
          </div>
        </Link>
        <Link to='/admin/promotions'>
          <div
            className={`px-6 py-4 w-full text-md font-bold transition-all duration-300 ${checkActive('promotions') ? 'bg-white text-primary' : 'text-white hover:bg-white/20'}`}
          >
            Quản lý khuyến mãi
          </div>
        </Link>
      </div>
      <div className="py-4 flex flex-col justify-center w-full px-4 gap-3">
        <button className="button !bg-success !text-white !min-w-[104px]">
          Admin
        </button>
        <button onClick={() => {
          localStorage.removeItem('carserv-profile');
          localStorage.removeItem('carserv-token');
          window.location.href = '/';
        }} className="button !bg-red-500 !text-white min-w-[104px]">
          Đăng xuất
        </button>
      </div>
    </div>
  )
}