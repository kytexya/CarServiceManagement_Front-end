import SidebarAdmin from "@/components/common/sidebar-admin";
import CustomTable from "@/components/common/table";
import { showError } from "@/utils";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const columns = [
  { header: "Tên Chương Trình", field: "name" },
  { header: "Mã Voucher", field: "code" },
  { header: "Mức Giảm", field: "discountValue" },
  { header: "Ngày Bắt Đầu", field: "startDate" },
  { header: "Ngày Kết Thúc", field: "endDate" },
  { header: "Trạng thái", field: "status", className: "status-box" },
];

export default function AdminPromotionListPage() {
  const [dataList, setDataList] = useState([]);
  const [keyword, setKeyword] = useState("");
  
  const handleAction = (message) => {
    showError(message);
  };

  return (
    <div className="flex flex-row w-full h-screen">
      <SidebarAdmin />
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center px-8 py-4 border-b">
          <h1 className="text-2xl font-bold">Quản Lý Khuyến Mãi & Vouchers</h1>
          <Link to="/admin/promotion/add" className="button primary">
            Thêm Khuyến Mãi
          </Link>
        </div>

        <div className="p-8">
          <div className="flex gap-4 mb-6">
            <input
              type="search"
              name="keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Tìm kiếm theo tên chương trình, mã voucher..."
              className="flex-grow border border-gray-300 rounded-lg py-2 px-4"
            />
            <button onClick={() => handleAction("Chức năng tìm kiếm chưa được kết nối API.")} className="button primary">Tìm Kiếm</button>
          </div>

          <CustomTable
            columns={columns}
            data={dataList}
            renderAction={(row) => (
              <div className="flex gap-2 justify-center">
                <Link
                  to={`/admin/promotion/edit/${row.id}`}
                  className="button !bg-blue-500 !text-white"
                >
                  Cập nhật
                </Link>
                <button
                  onClick={() => handleAction(`Vô hiệu hoá khuyến mãi ${row.name} chưa được cài đặt.`)}
                  className="button !bg-red-500 !text-white"
                >
                  Vô hiệu hoá
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
