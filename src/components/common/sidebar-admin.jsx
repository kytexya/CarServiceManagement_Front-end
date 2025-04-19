import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function SidebarAdmin() {
  const location = useLocation();

  const checkActive = (keyword) => {
    return location.pathname.includes(keyword);
  };

  return (
    <div className="h-[calc(100vh-72px)] w-[260px] bg-primary drop-shadow-sm">
      <Link to="/admin/account">
        <div
          className={`px-6 py-4 w-full text-md font-bold transition-all duration-300 ${
            checkActive("account") ? "bg-white text-primary" : "text-white"
          }`}
        >
          Quản lý tài khoản
        </div>
      </Link>
      <Link to="/admin/router">
        <div
          className={`px-6 py-4 w-full text-md font-bold transition-all duration-300 ${
            checkActive("router") ? "bg-white text-primary" : "text-white"
          }`}
        >
          Quản lý tuyến đường
        </div>
      </Link>
      <Link to="/admin/location">
        <div
          className={`px-6 py-4 w-full text-md font-bold transition-all duration-300 ${
            checkActive("location") ? "bg-white text-primary" : "text-white"
          }`}
        >
          Quản lý địa điểm
        </div>
      </Link>
      <Link to="/admin/bus">
        <div
          className={`px-6 py-4 w-full text-md font-bold transition-all duration-300 ${
            checkActive("bus") ? "bg-white text-primary" : "text-white"
          }`}
        >
          Quản lý xe
        </div>
      </Link>
      <Link to="/admin/seat">
        <div
          className={`px-6 py-4 w-full text-md font-bold transition-all duration-300 ${
            checkActive("seat") ? "bg-white text-primary" : "text-white"
          }`}
        >
          Quản lý ghế
        </div>
      </Link>
      <Link to="/admin/trip">
        <div
          className={`px-6 py-4 w-full text-md font-bold transition-all duration-300 ${
            checkActive("trip") ? "bg-white text-primary" : "text-white"
          }`}
        >
          Quản lý chuyến đi
        </div>
      </Link>
      <Link to="/admin/promotion">
        <div
          className={`px-6 py-4 w-full text-md font-bold transition-all duration-300 ${
            checkActive("promotion") ? "bg-white text-primary" : "text-white"
          }`}
        >
          Quản lý khuyến mãi
        </div>
      </Link>
      <Link to="/admin/report">
        <div
          className={`px-6 py-4 w-full text-md font-bold transition-all duration-300 ${
            checkActive("report") ? "bg-white text-primary" : "text-white"
          }`}
        >
          Báo cáo
        </div>
      </Link>
      <Link to="/admin/transaction">
        <div
          className={`px-6 py-4 w-full text-md font-bold transition-all duration-300 ${
            checkActive("transaction") ? "bg-white text-primary" : "text-white"
          }`}
        >
          Quản lý giao dịch
        </div>
      </Link>
      <Link to="/admin/ticket">
        <div
          className={`px-6 py-4 w-full text-md font-bold transition-all duration-300 ${
            checkActive("ticket") ? "bg-white text-primary" : "text-white"
          }`}
        >
          Quản lý vé
        </div>
      </Link>
    </div>
  );
}
