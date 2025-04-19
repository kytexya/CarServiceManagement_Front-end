import SidebarAdmin from '@/components/common/sidebar-admin';
import CustomTable from '@/components/common/table';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const columns = [
  { header: 'Tên tuyến đường', field: 'RouterName' },
  { header: 'Khoảng cách', field: 'Distance' },
  { header: 'Thời gian ước tính', field: 'EstimatedDuration' },
]

const dataTemp = [
  { Id: 1, RouterName: 'Hà Nội - Đà Nẵng', Distance: 300, EstimatedDuration: 5 },
  { Id: 2, RouterName: 'Hà Nội - Sài Gòn', Distance: 1200, EstimatedDuration: 4 },
]

export default function RouterListPage() {
  const [dataList, setDataList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const convertedData = dataTemp.map((item) => ({
      ...item,
      Distance: `${item.Distance} km`,
      EstimatedDuration: `${item.EstimatedDuration} giờ`,
    }));
    setDataList(convertedData);
  }, [])

  return (
    <div className='flex flex-row w-full'>
      <SidebarAdmin />
      <div className='flex flex-col w-full'>

        <div className="flex justify-between items-center h-[60px] px-4 shadow-lg">
          <h1 className='text-2xl font-bold'>Danh sách tuyến đường</h1>
        </div>

        <div className="flex justify-between items-center px-4 h-[64px]">
          <input
            type="search"
            name="keyword"
            placeholder="Nhập từ khoá tìm kiếm..."
            className="w-[300px] border border-slate-600 rounded-lg py-2 px-4"
          />
          <Link to='/admin/router/add'>
            <button className="inline-flex items-center justify-center px-4 h-10 font-sans font-semibold tracking-wide text-white bg-success rounded-lg">
              Thêm tuyến đuòng
            </button>
          </Link>
        </div>

        <CustomTable
          columns={columns}
          data={dataList}
          renderActions={(row) => (
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => navigate(`/admin/router/edit/${row.Id}`)}
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Sửa
              </button>
              <button
                onClick={() => alert(`Xoá ${row.Name}`)}
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