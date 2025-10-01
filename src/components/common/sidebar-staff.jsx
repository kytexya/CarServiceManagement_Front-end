import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "@/assets/images/logo-car.png";

export default function SidebarStaff() {
  const location = useLocation();

  const checkActive = (keyword) => {
    if (keyword === '') {
      return location.pathname === '/service-staff';
    }
    return location.pathname.startsWith(`/service-staff/${keyword}`);
  };

  return (
    <div className="h-[100vh] min-w-[220px] sticky top-0 bg-primary drop-shadow-sm flex flex-col">
      <Link className="px-6 aspect-video flex items-center max-h-[64px]" to="/">
        <div className="text-4xl py-4 text-white flex items-center gap-2">
          <img src={Logo} alt="logo" className="w-12 h-12 object-cover" />
          <span className="text-2xl font-bold">CarServ</span>
        </div>
      </Link>
      <div className="flex-grow">
        <Link to="/service-staff/dashboard">
          <div
            className={`px-6 py-4 w-full text-md font-bold transition-all duration-300 ${
              (checkActive("dashboard") || checkActive("")) ? "bg-white text-primary" : "text-white hover:bg-white/20"
            }`}
          >
            Dashboard
          </div>
        </Link>
        <Link to="/service-staff/service-orders">
          <div
            className={`px-6 py-4 w-full text-md font-bold transition-all duration-300 ${
              checkActive("service-orders") ? "bg-white text-primary" : "text-white hover:bg-white/20"
            }`}
          >
            Danh sách lịch hẹn
          </div>
        </Link>
        {/* <Link to="/service-staff/update-service-history">
          <div
            className={`px-6 py-4 w-full text-md font-bold transition-all duration-300 ${
              checkActive("update-service-history") ? "bg-white text-primary" : "text-white hover:bg-white/20"
            }`}
          >
            Cập nhật lịch sử sửa chữa
          </div>
        </Link> */}
        <Link to="/service-staff/used-parts-management">
          <div
            className={`px-6 py-4 w-full text-md font-bold transition-all duration-300 ${
              checkActive("used-parts-management") ? "bg-white text-primary" : "text-white hover:bg-white/20"
            }`}
          >
            Quản lý phụ tùng đã sử dụng
          </div>
        </Link>
        <Link to="/service-staff/my-schedule">
          <div
            className={`px-6 py-4 w-full text-md font-bold transition-all duration-300 ${
              checkActive("my-schedule") ? "bg-white text-primary" : "text-white hover:bg-white/20"
            }`}
          >
            Lịch làm việc cá nhân
          </div>
        </Link>
        <Link to="/service-staff/notify-customer">
          <div
            className={`px-6 py-4 w-full text-md font-bold transition-all duration-300 ${
              checkActive("notify-customer") ? "bg-white text-primary" : "text-white hover:bg-white/20"
            }`}
          >
            Thông báo dịch vụ
          </div>
        </Link>
        <Link to="/service-staff/vehicle-records">
          <div
            className={`px-6 py-4 w-full text-md font-bold transition-all duration-300 ${
              checkActive("vehicle-records") ? "bg-white text-primary" : "text-white hover:bg-white/20"
            }`}
          >
            Quản lý hồ sơ xe khách hàng
          </div>
        </Link>
        <Link to="/service-staff/problem-reporting">
          <div
            className={`px-6 py-4 w-full text-md font-bold transition-all duration-300 ${
              checkActive("problem-reporting") ? "bg-white text-primary" : "text-white hover:bg-white/20"
            }`}
          >
            Báo cáo lỗi / Tạm ngừng xử lý
          </div>
        </Link>
      </div>
      <div className="py-4 flex flex-col justify-center w-full px-4 gap-3">
        <button className="button !bg-blue-600 !text-white !min-w-[104px]">
          Nhân viên Dịch vụ
        </button>
        <button
          onClick={() => {
            localStorage.removeItem("carserv-profile");
            localStorage.removeItem("carserv-token");
            window.location.href = "/";
          }}
          className="button !bg-red-500 !text-white min-w-[104px]"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
}
