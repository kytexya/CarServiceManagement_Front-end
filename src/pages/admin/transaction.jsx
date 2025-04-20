import SidebarAdmin from "@/components/common/sidebar-admin";
import CustomTable from "@/components/common/table";
import { formatToMoney } from "@/utils";
import React, { useEffect, useState } from "react";

const columns = [
  { header: "Mã giao dịch", field: "Id" },
  { header: "Mã vé", field: "TicketId" },
  { header: "Ngày tạo", field: "CreatedAt" },
  { header: "Trạng thái", field: "Status", className: "status-box" },
  { header: "Giá tiền", field: "Amount" },
];

const dataTemp = [
  {
    Id: 1,
    TicketId: "123456",
    CreatedAt: "2024-01-01",
    Status: true,
    Amount: 100000,
  },
  {
    Id: 2,
    TicketId: "123451",
    CreatedAt: "2024-01-01",
    Status: true,
    Amount: 320000,
  },
  {
    Id: 1,
    TicketId: "123423",
    CreatedAt: "2024-01-01",
    Status: true,
    Amount: 430000,
  },
];

export default function TransactionListPage() {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    const convertedData = dataTemp.map((item) => ({
      ...item,
      Status: item.Status ? "Hoàn thành" : "Lỗi giao dịch",
      Amount: formatToMoney(item.Amount),
    }));
    setDataList(convertedData);
  }, []);

  return (
    <div className="flex flex-row w-full">
      <SidebarAdmin />
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center h-[60px] px-4 shadow-lg">
          <h1 className="text-2xl font-bold">Danh sách giao dịch</h1>
        </div>

        <div className="flex justify-between items-center px-4 h-[64px]">
          <input
            type="search"
            name="keyword"
            placeholder="Nhập từ khoá tìm kiếm..."
            className="w-[300px] border border-slate-600 rounded-lg py-2 px-4"
          />
        </div>

        <CustomTable columns={columns} data={dataList} />
      </div>
    </div>
  );
}
