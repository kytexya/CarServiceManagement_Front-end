import SidebarStaff from "@/components/common/sidebar-staff";
import CustomTable from "@/components/common/table";
import { showError } from "@/utils";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const columns = [
  { header: 'Mã Giao Dịch', field: 'transactionId' },
  { header: 'Mã Yêu Cầu Dịch Vụ', field: 'serviceRequestId' },
  { header: 'Tên Khách Hàng', field: 'customerName' },
  { header: 'Ngày Giao Dịch', field: 'transactionDate' },
  { header: 'Số Tiền', field: 'amount' },
  { header: 'Phương Thức', field: 'paymentMethod' },
  {
    header: 'Trạng Thái', field: 'status',
    className: 'status-box'
  },
];

export default function StaffTransactionListPage() {
  const [dataList, setDataList] = useState([]); // Leave empty
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleSearch = () => {
    showError("Chức năng tìm kiếm chưa được kết nối API.");
    // Placeholder for search logic
  };

  const handleViewDetails = (id) => {
    showError(`Xem chi tiết cho giao dịch ${id} chưa được cài đặt.`);
  };

  return (
    <div className="flex flex-row w-full">
      <SidebarStaff />
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center px-8 py-4 border-b">
          <h1 className="text-2xl font-bold">Quản Lý Giao Dịch</h1>
        </div>
        <div className="p-8">
            <div className="flex gap-4 mb-6">
              <input
                type="search"
                name="keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Tìm theo mã giao dịch, tên khách hàng..."
                className="flex-grow border border-gray-300 rounded-lg py-2 px-4"
              />
              <select
                className="border border-gray-300 rounded-lg py-2 px-4"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="paid">Đã thanh toán</option>
                <option value="unpaid">Chưa thanh toán</option>
                <option value="refunded">Đã hoàn tiền</option>
              </select>
              <button onClick={handleSearch} className="button primary">Lọc</button>
            </div>

            <CustomTable
              columns={columns}
              data={dataList}
              renderActions={(row) => (
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => handleViewDetails(row.transactionId)}
                    className="button !bg-blue-500 !text-white"
                  >
                    Xem Chi Tiết
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
    </div>
  );
} 