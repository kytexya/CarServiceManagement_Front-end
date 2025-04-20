import SidebarAdmin from '@/components/common/sidebar-admin';
import CustomTable from '@/components/common/table';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const columns = [
  { header: 'Tên tuyến đường', field: 'RouterName' },
  { header: 'Tên loại xe', field: 'BusName' },
  { header: 'Tên tài xế', field: 'DriverName' },
  { header: 'Giờ khởi hành', field: 'DepartureTime' },
  { header: 'Ngày khởi hành', field: 'Date' },
  { header: 'Giá vé', field: 'Price' },
  { header: 'Trạng thái', field: 'Status' },
]

const dataTemp = [
  {
    Id: 1,
    RouterName: 'Hà Nội - Đà Nẵng',
    BusName: 'Xe giường nằm 2 tầng',
    DriverName: 'Tài xế Minh',
    Price: '300,000',
    Status: 1,
    DepartureTime: '10:00',
    Date: '2024-01-01'
  },
  {
    Id: 2,
    RouterName: 'Đà Nẵng - Hà Nội',
    BusName: 'Xe trung chuyển',
    DriverName: 'Tài xế Hoà',
    Price: '120,000',
    Status: 2,
    DepartureTime: '12:00',
    Date: '2024-01-01'
  },
]

export default function TripListPage() {
  const [dataList, setDataList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const convertedData = dataTemp.map((item) => ({
      ...item,
      Status: item.Status === 1 ? 'Đã khởi hành' : 'Chưa khởi hành',
    }));
    setDataList(convertedData);
  }, [])

  return (
    <div className='flex flex-row w-full'>
      <SidebarAdmin />
      <div className='flex flex-col w-full'>

        <div className="flex justify-between items-center h-[60px] px-4 shadow-lg">
          <h1 className='text-2xl font-bold'>Danh sách chuyến đi</h1>
        </div>

        <div className="flex justify-between items-center px-4 h-[64px]">
          <input
            type="search"
            name="keyword"
            placeholder="Nhập từ khoá tìm kiếm..."
            className="w-[300px] border border-slate-600 rounded-lg py-2 px-4"
          />
          <Link to='/admin/trip/add'>
            <button className="inline-flex items-center justify-center px-4 h-10 font-sans font-semibold tracking-wide text-white bg-success rounded-lg">
              Thêm chuyến đi
            </button>
          </Link>
        </div>

        <CustomTable
          columns={columns}
          data={dataList}
          renderActions={(row) => (
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => navigate(`/admin/trip/edit/${row.Id}`)}
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Sửa
              </button>
              <button
                onClick={() => alert(`Xoá ${row.Id}`)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Xoá
              </button>
            </div>
          )}
        />
      </div>
    </div>
  )
}