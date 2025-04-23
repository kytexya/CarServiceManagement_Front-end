import SidebarAdmin from '@/components/common/sidebar-admin';
import CustomTable from '@/components/common/table';
import { showError } from '@/utils';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const baseURL = import.meta.env.VITE_API_BASE_URL;
const columns = [
  {
    header: 'Biển số xe',
    field: 'busId',
  },
  {
    header: 'Loại xe',
    field: 'busType',
  },
  {
    header: 'Số ghế',
    field: 'seatCount'
  },
]

const dataTemp = [
  { Id: 1, BusType: 'Xe khách lớn', SeatCount: 22, IsDelete: true },
  { Id: 2, BusType: 'Xe trung chuyển', SeatCount: 32, IsDelete: false },
  { Id: 3, BusType: 'Xe giường nằm', SeatCount: 42, IsDelete: false },
  { Id: 4, BusType: 'Xe ghế ngồi', SeatCount: 32, IsDelete: false },
]
export default function BusListPage() {
  const [dataList, setDataList] = useState([]);
  const navigate = useNavigate();

  const yourToken = localStorage.getItem('bus-token');

  useEffect(() => {
    callApi();
  }, [])

  function callApi() {
    fetch(`${baseURL}/api/Buses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": 69420,
        "Authorization": `Bearer ${yourToken}`,
      },
    })
      .then(async (res) => {
        const result = await res.json();
        if (res.status === 200) {
          setDataList(result);
        } else {
          showError();
        }
      })
      .catch(() => {
        showError();
      });
  }


  return (
    <div className='flex flex-row w-full'>
      <SidebarAdmin />
      <div className='flex flex-col w-full'>

        <div className="flex justify-between items-center h-[60px] px-4 shadow-lg">
          <h1 className='text-2xl font-bold'>Danh sách xe</h1>
        </div>

        <div className="flex justify-between items-center px-4 h-[64px]">
          <input
            type="search"
            name="keyword"
            placeholder="Nhập từ khoá tìm kiếm..."
            className="w-[300px] border border-slate-600 rounded-lg py-2 px-4"
          />
          <Link to='/admin/bus/add'>
            <button className="inline-flex items-center justify-center px-4 h-10 font-sans font-semibold tracking-wide text-white bg-success rounded-lg">
              Thêm xe mới
            </button>
          </Link>
        </div>

        <CustomTable
          columns={columns}
          data={dataList}
          renderActions={(row) => (
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => navigate(`/admin/bus/edit/${row.busId}`)}
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Sửa
              </button>

    return (
        <div className='flex flex-row w-full'>
            <SidebarAdmin />
            <div className='flex flex-col w-full'>
                <div className="flex justify-between items-center h-[60px] px-4 shadow-lg">
                    <h1 className='text-2xl font-bold'>Danh sách xe</h1>
                </div>
                <div className="flex justify-between items-center px-4 h-[64px]">
                    <input
                        type="search"
                        name="keyword"
                        placeholder="Nhập từ khoá tìm kiếm..."
                        className="w-[300px] border border-slate-600 rounded-lg py-2 px-4"
                    />
                    <Link to='/admin/bus/add'>
                        <button className="inline-flex items-center justify-center px-4 h-10 font-sans font-semibold tracking-wide text-white bg-success rounded-lg">
                            Thêm xe mới
                        </button>
                    </Link>
                </div>
                <CustomTable
                    columns={columns}
                    data={dataList}
                    renderActions={(row) => (
                        <div className="flex gap-2 justify-center">
                            <button
                                onClick={() => navigate(`/admin/bus/edit/${row.busId}`)}
                                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Sửa
                            </button>
                        </div>
                    )}
                />

            </div>
          )}
        />
      </div>
    </div>
  )
}