import React from 'react'

export default function DriveHeader() {
  return (
    <div className="relative flex justify-between items-center min-h-[72px] px-6 bg-primary">
      <div className="min-h-72px aspect-video flex items-center" to='/'>
        <div className="text-4xl py-4 text-white">
          LOGO
        </div>
      </div>
      <div className="flex flex-row gap-4 justify-end">
        <button className="button !bg-success !text-white min-w-[104px]">
          Minh Hải
        </button>
        <button
          onClick={() => {
            localStorage.removeItem('bus-profile');
            localStorage.removeItem('bus-token');
            window.location.href = '/login-manager';
          }}
          className="button !bg-red-500 !text-white min-w-[104px]">
          Đăng xuất
        </button>
      </div>
    </div>
  )
}