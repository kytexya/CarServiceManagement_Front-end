import SidebarAdmin from '@/components/common/sidebar-admin';
import CustomTable from '@/components/common/table';
import { showError, showSuccess } from '@/utils';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
const baseURL = import.meta.env.VITE_API_BASE_URL;

const columns = [
  {
    header: 'Mã địa điểm',
    field: 'locationId'
  },
  {
    header: 'Tên địa điểm',
    field: 'locationName',
  },
  {
    header: 'Trạng thái',
    field: 'isDelete',
    className: 'status-box'
  },
]

export default function LocationListPage() {
  const [dataList, setDataList] = useState([]);
  const navigate = useNavigate();
  const yourToken = localStorage.getItem('bus-token');

  useEffect(() => {
    callApi();
  }, [])

  function callApi() {
    axios.get(`${baseURL}/api/Location`, {
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
            isDelete: item.isDelete ? 'Không hoạt động' : 'Đang hoạt động',
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

  function handleDisable(locationName, locationId) {
    if (confirm(`Vô hiệu hoá ${locationName}?`)) {
      axios.delete(`${baseURL}/api/Location/${locationId}`, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 69420,
          'Authorization': `Bearer ${yourToken}`,
        }
      })
        .then((res) => {
          if (res.status === 200) {
            showSuccess();
          } else {
            showError();
          }
          callApi();
        })
        .catch(() => {
          showError();
          callApi();
        });
    }
  }

  return (
    <div className='flex flex-row w-full'>
      <SidebarAdmin />
      <div className='flex flex-col w-full'>

        <div className="flex justify-between items-center h-[60px] px-4 shadow-lg">
          <h1 className='text-2xl font-bold'>Danh sách địa điểm</h1>
        </div>

        <div className="flex justify-between items-center px-4 h-[64px]">
          <input
            type="search"
            name="keyword"
            placeholder="Nhập từ khoá tìm kiếm..."
            className="w-[300px] border border-slate-600 rounded-lg py-2 px-4"
          />
          <Link to='/admin/location/add'>
            <button className="inline-flex items-center justify-center px-4 h-10 font-sans font-semibold tracking-wide text-white bg-success rounded-lg">
              Thêm địa điểm
            </button>
          </Link>
        </div>

        <CustomTable
          columns={columns}
          data={dataList}
          renderActions={(row) => (
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => navigate(`/admin/location/edit/${row.locationId}`)}
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Sửa
              </button>
              <button
                onClick={() => handleDisable(row.locationName, row.locationId)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Vô hiệu hoá
              </button>
            </div>
          )}
        />
      </div>
    </div>
  )
}