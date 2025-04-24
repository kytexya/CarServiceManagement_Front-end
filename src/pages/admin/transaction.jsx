import SidebarAdmin from "@/components/common/sidebar-admin";
import CustomTable from "@/components/common/table";
import { formatDateTime, formatToMoney, showError } from "@/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const columns = [
  { header: "Mã giao dịch", field: "transactionId" },
  { header: "Mã khách hàng", field: "customerId" },
  { header: "Tên khách hàng", field: "customerId" },
  { header: "Ngày tạo", field: "createdAt" },
  { header: "Giá tiền", field: "amount" },
  {
    header: "Trạng thái",
    field: "paymentStatus",
    className: "status-box",
  },
];

export default function TransactionListPage() {
  const [dataList, setDataList] = useState([]);
  const yourToken = localStorage.getItem("bus-token");

  useEffect(() => {
    callApi();
  }, []);

  function callApi() {
    axios
      .get(`${baseURL}/api/Transaction`, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": 69420,
          Authorization: `Bearer ${yourToken}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          const result = res.data;
          setDataList(
            result.map((item) => ({
              ...item,
              createdAt: formatDateTime(item.createdAt),
              amount: formatToMoney(item.amount),
            }))
          );
        } else {
          showError();
        }
      })
      .catch(() => {
        showError();
      });
  }

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
