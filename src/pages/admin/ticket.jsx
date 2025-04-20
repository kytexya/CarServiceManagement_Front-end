import SidebarAdmin from "@/components/common/sidebar-admin";
import CustomTable from "@/components/common/table";
import { formatToMoney } from "@/utils";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const columns = [
  { header: "Tên tuyến đường", field: "RouterName" },
  { header: "Tên khách hàng", field: "CustomerName" },
  { header: "Mã vé", field: "TicketId" },
  { header: "Mã ghế", field: "SeatId" },
  { header: "Giá vé", field: "Price" },
  { header: "Giờ khởi tạo", field: "CreatedAt" },
  { header: "Trạng thái", field: "Status" },
];

const dataTemp = [
  {
    Id: 1,
    RouterName: "Hà Nội - Đà Nẵng",
    CustomerName: "Hoàng Minh",
    TicketId: "Tài xế Minh",
    SeatId: "S101",
    Price: 300000,
    CreatedAt: "10:00",
    Status: 1,
  },
  {
    Id: 2,
    RouterName: "Đà Nẵng - Hà Nội",
    CustomerName: "Hoàng Nam",
    SeatId: "S102",
    TicketId: "Tài xế Hoà",
    Price: 120000,
    CreatedAt: "12:00",
    Status: 2,
  },
];

export default function TicketListPage() {
  const [dataList, setDataList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const convertedData = dataTemp.map((item) => ({
      ...item,
      Price: formatToMoney(item.Price),
      Status: item.Status === 2 ? "Đã lên xe" : "Chưa lên xe",
    }));
    setDataList(convertedData);
  }, []);

  return (
    <div className="flex flex-row w-full">
      <SidebarAdmin />
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center h-[60px] px-4 shadow-lg">
          <h1 className="text-2xl font-bold">Danh sách vé</h1>
        </div>

        <div className="flex justify-between items-center px-4 h-[64px]">
          <input
            type="search"
            name="keyword"
            placeholder="Nhập từ khoá tìm kiếm..."
            className="w-[300px] border border-slate-600 rounded-lg py-2 px-4"
          />
        </div>

        <CustomTable
          columns={columns}
          data={dataList}
          renderActions={(row) => (
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => alert(row.Id)}
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Xác nhận lên xe
              </button>
            </div>
          )}
        />
      </div>
    </div>
  );
}
