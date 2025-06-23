import SidebarStaff from "@/components/common/sidebar-staff";
import CustomTable from "@/components/common/table";
import { showError, showSuccess } from "@/utils";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const columns = [
  { header: "Mã Khách Hàng", field: "customerId" },
  { header: "Họ và Tên", field: "name" },
  { header: "Số Điện Thoại", field: "phoneNumber" },
  { header: "Email", field: "email" },
  { header: "Số Xe Đã Đăng Ký", field: "vehicleCount" },
];

export default function StaffCustomerListPage() {
  const [dataList, setDataList] = useState([]);
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    showError("Chức năng tìm kiếm chưa được kết nối API.");
    // Placeholder for search logic
    // callApiCustomer({ keyword }); 
  };
  
  const handleViewDetails = (id) => {
    showError(`Xem chi tiết cho khách hàng ${id} chưa được cài đặt.`);
  };

  const handleViewVehicles = (id) => {
    showError(`Xem danh sách xe cho khách hàng ${id} chưa được cài đặt.`);
  };


  return (
    <div className="flex flex-row w-full">
      <SidebarStaff />
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center px-8 py-4 border-b">
          <h1 className="text-2xl font-bold">Quản Lý Khách Hàng</h1>
          <Link to="/service-staff/account/add" className="button primary">
            Thêm Khách Hàng Mới
          </Link>
        </div>
        <div className="p-8">
            <div className="flex gap-4 mb-6">
              <input
                type="search"
                name="keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Tìm kiếm theo tên, SĐT, email..."
                className="flex-grow border border-gray-300 rounded-lg py-2 px-4"
              />
              <button onClick={handleSearch} className="button primary">Tìm Kiếm</button>
            </div>

            <CustomTable
              columns={columns}
              data={dataList}
              renderActions={(row) => (
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => handleViewDetails(row.customerId)}
                    className="button !bg-blue-500 !text-white"
                  >
                    Xem Chi Tiết
                  </button>
                  <button
                    onClick={() => handleViewVehicles(row.customerId)}
                    className="button !bg-gray-600 !text-white"
                  >
                    Xem Xe
                  </button>
                </div>
              )}
            />
            {dataList.length === 0 && (
              <div className="text-center py-10 text-gray-500">
                Không có dữ liệu để hiển thị.
              </div>
            )}
        </div>
      </div>
    </div >
  );
}
