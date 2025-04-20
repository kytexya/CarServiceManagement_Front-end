import SidebarAdmin from '@/components/common/sidebar-admin';
import CustomTable from '@/components/common/table';
import { formatToMoney } from '@/utils';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const columns = [
  { header: 'Mã khuyến mãi', field: 'PromotionCode' },
  { header: 'Giảm giá', field: 'DiscountRate' },
  { header: 'Mức giá', field: 'MinTicketsRequired' },
  { header: 'Trạng thái', field: 'Status', className: "status-box" },
]

const dataTemp = [
  {
    Id: 1,
    PromotionCode: 'KM221212',
    DiscountRate: 20,
    MinTicketsRequired: 200000,
    Status: true,
  },
  {
    Id: 2,
    PromotionCode: "KM111222",
    DiscountRate: 15,
    MinTicketsRequired: 400000,
    Status: false,
  },
]

export default function PromotionListPage() {
  const [dataList, setDataList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const convertedData = dataTemp.map((item) => ({
      ...item,
      Status: item.Status ? 'Áp dụng' : 'Không áp dụng',
      DiscountRate: `${item.DiscountRate}%`,
      MinTicketsRequired: formatToMoney(item.MinTicketsRequired),
    }));
    setDataList(convertedData);
  }, [])

  return (
    <div className='flex flex-row w-full'>
      <SidebarAdmin />
      <div className='flex flex-col w-full'>

        <div className="flex justify-between items-center h-[60px] px-4 shadow-lg">
          <h1 className='text-2xl font-bold'>Danh sách khuyễn mãi</h1>
        </div>

        <div className="flex justify-between items-center px-4 h-[64px]">
          <input
            type="search"
            name="keyword"
            placeholder="Nhập từ khoá tìm kiếm..."
            className="w-[300px] border border-slate-600 rounded-lg py-2 px-4"
          />
          <Link to='/admin/promotion/add'>
            <button className="inline-flex items-center justify-center px-4 h-10 font-sans font-semibold tracking-wide text-white bg-success rounded-lg">
              Thêm khuyến mãi
            </button>
          </Link>
        </div>

        <CustomTable
          columns={columns}
          data={dataList}
          renderActions={(row) => (
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => navigate(`/admin/promotion/edit/${row.Id}`)}
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