import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from '@/assets/images/logo.png';

export default function SidebarAdmin() {
  const location = useLocation();

  const checkActive = (keyword) => {
    // Ensure the check is for a whole path segment to avoid partial matches
    return location.pathname.startsWith(`/admin/${keyword}`);
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
        <Link to='/admin/report'>
          <div
            className={`px-6 py-4 w-full text-md font-bold transition-all duration-300 ${checkActive('report') ? 'bg-white text-primary' : 'text-white hover:bg-white/20'}`}
          >
            Báo cáo
          </div>
        </Link>
        <Link to='/admin/account'>
          <div
            className={`px-6 py-4 w-full text-md font-bold transition-all duration-300 ${checkActive('account') ? 'bg-white text-primary' : 'text-white hover:bg-white/20'}`}
          >
            Quản lý tài khoản
          </div>
        </Link>
        <Link to='/admin/services'>
          <div
            className={`px-6 py-4 w-full text-md font-bold transition-all duration-300 ${checkActive('services') ? 'bg-white text-primary' : 'text-white hover:bg-white/20'}`}
          >
            Quản lý dịch vụ
          </div>
        </Link>
        <Link to='/admin/promotion'>
          <div
            className={`px-6 py-4 w-full text-md font-bold transition-all duration-300 ${checkActive('promotion') ? 'bg-white text-primary' : 'text-white hover:bg-white/20'}`}
          >
            Quản lý khuyến mãi
          </div>
        </Link>
        <Link to='/admin/transaction'>
          <div
            className={`px-6 py-4 w-full text-md font-bold transition-all duration-300 ${checkActive('transaction') ? 'bg-white text-primary' : 'text-white hover:bg-white/20'}`}
          >
            Quản lý giao dịch
          </div>
        </Link>
        <Link to='/admin/settings'>
          <div
            className={`px-6 py-4 w-full text-md font-bold transition-all duration-300 ${checkActive('settings') ? 'bg-white text-primary' : 'text-white hover:bg-white/20'}`}
          >
            Cài đặt
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
          window.location.href = '/login-manager';
        }} className="button !bg-red-500 !text-white min-w-[104px]">
          Đăng xuất
        </button>
      </div>
    </div>
  )
}