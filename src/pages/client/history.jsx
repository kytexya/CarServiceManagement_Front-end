import CustomTable from "@/components/common/table";
import { formatToMoney } from "@/utils";
import React, { useEffect, useState } from "react";
const baseURL = import.meta.env.VITE_API_BASE_URL;

const columns = [
  { header: "Mã vé", field: "Id" },
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

export default function HistoryTicket() {
  const [dataList, setDataList] = useState([]);
  useEffect(() => {
    const convertedData = dataTemp.map((item) => ({
      ...item,
      Price: formatToMoney(item.Price),
      Status: item.Status === 2 ? "Đã lên xe" : "Chưa lên xe",
    }));
    setDataList(convertedData);
  }, []);

  return (
    <div className="px-8 md:px-10 mx-auto py-10 my-20">
      <div className="border shadow-lg rounded-lg p-4">
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
