import SidebarAdmin from "@/components/common/sidebar-admin";
import CustomTable from "@/components/common/table";
import { formatDateTime, formatToMoney, showError } from '@/utils';
import axios from 'axios';
import React, { useEffect, useState } from "react";




const baseURL = import.meta.env.VITE_API_BASE_URL;

const columns = [
  { header: 'Tên tuyến đường', field: 'routerName' },
  { header: 'Tên khách hàng', field: 'customerName' },
  { header: 'Mã Ghế', field: 'seatId' },
  { header: 'Giá vé', field: 'price' },
  { header: 'Khởi tạo', field: 'createdAt' },
  { header: 'Trạng thái', field: 'status', className: 'status-box' },
];

export default function TicketListPage() {
  const [dataList, setDataList] = useState([]);
  const yourToken = localStorage.getItem('bus-token');

  useEffect(() => {
    callApi();
  }, []);
  function callApi() {
    axios.get(`${baseURL}/api/Ticket`, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 69420,
        'Authorization': `Bearer ${yourToken}`
      }
    })
      .then((res) => {
        if (res.status === 200) {
          const result = res.data;
          setDataList(result.map((item) => ({
            ...item,
            createdAt: formatDateTime(item.createdAt),
            price: formatToMoney(item.price),
          })));
        } else {
          showError();
        }
      })
      .catch((error) => {
        console.error('Axios error:', error);
        showError();
      });
  }

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
                onClick={() => alert(row.ticketId)}
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
