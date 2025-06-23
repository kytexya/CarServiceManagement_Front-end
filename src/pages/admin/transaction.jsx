import SidebarAdmin from '@/components/common/sidebar-admin';
import CustomTable from '@/components/common/table';
import { showError } from '@/utils';
import React, { useState } from 'react';

const columns = [
  { header: 'Mã Giao Dịch', field: 'transactionId' },
  { header: 'Tên Khách Hàng', field: 'customerName' },
  { header: 'Ngày Tạo', field: 'createdAt' },
  { header: 'Dịch Vụ', field: 'serviceName' },
  { header: 'Tổng Tiền', field: 'amount' },
  { header: 'Nhân Viên', field: 'staffName' },
  {
    header: 'Trạng Thái', field: 'paymentStatus',
    className: 'status-box'
  },
];

export default function AdminTransactionListPage() {
  const [dataList, setDataList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("date_desc"); 

  const handleSearch = () => {
    showError("Chức năng tìm kiếm chưa được kết nối API.");
  };

  const handleViewDetails = (id) => {
    showError(`Xem chi tiết cho giao dịch ${id} chưa được cài đặt.`);
  };


  return (
    <div className='flex flex-row w-full h-screen'>
      <SidebarAdmin />
      <div className='flex flex-col w-full'>
        <div className="flex justify-between items-center px-8 py-4 border-b">
          <h1 className='text-2xl font-bold'>Quản Lý Giao Dịch</h1>
        </div>

        <div className="p-8">
          <div className="flex gap-4 mb-6">
            <input
              type="search"
              name="keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Tìm kiếm theo mã GD, tên khách hàng..."
              className="flex-grow border border-gray-300 rounded-lg py-2 px-4"
            />
            <select
              className="border border-gray-300 rounded-lg py-2 px-4"
              value={sort}
              onChange={(e) => {
                setSort(e.target.value)
                showError("Chức năng sắp xếp chưa được kết nối API.");
              }}
            >
              <option value="date_desc">Mới nhất trước</option>
              <option value="date_asc">Cũ nhất trước</option>
              <option value="price_desc">Tổng tiền cao nhất</option>
              <option value="price_asc">Tổng tiền thấp nhất</option>
            </select>
            <button onClick={handleSearch} className="button primary">Tìm Kiếm</button>
          </div>

          <CustomTable
            columns={columns}
            data={dataList}
            renderAction={(row) => (
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
  )
}