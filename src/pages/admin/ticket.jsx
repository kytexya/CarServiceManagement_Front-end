import SidebarAdmin from '@/components/common/sidebar-admin';
import CustomTable from '@/components/common/table';
import { formatDateTime, formatToMoney, showError } from '@/utils';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const columns = [
  { header: 'Mã vé', field: 'tripId' },
  { header: 'Tên tuyến đường', field: 'routerName' },
  { header: 'Tên khách hàng', field: 'customerName' },
  { header: 'Mã Ghế', field: 'seatId' },
  { header: 'Giá vé', field: 'price' },
  { header: 'Khởi tạo', field: 'createdAt' },
  { header: 'Trạng thái', field: 'status', className: 'status-box' },
]

export default function TicketListPage() {
  const [dataList, setDataList] = useState([]);
  const yourToken = localStorage.getItem('bus-token');
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 10,
  });

  useEffect(() => {
    callApi({ keyword, sort, page });
  }, [keyword, sort, page]);

  function callApi({ keyword = "", sort = "", page = 1, limit = 10 }) {
    axios.get(`${baseURL}/api/Ticket`, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 69420,
        'Authorization': `Bearer ${yourToken}`
      },
      params: {
        Keyword: keyword,
        SortBy: sort,
        Page: page,
        PageSize: limit,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          const listData = res.data?.data || [];
          setDataList(listData.map((item) => ({
            ...item,
            createdAt: formatDateTime(item.createdAt),
            price: formatToMoney(item.price),
          })));
          if (res.data?.pagination) {
            setPagination(res.data.pagination);
          }
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
    <div className='flex flex-row w-full'>
      <SidebarAdmin />
      <div className='flex flex-col w-full'>

        <div className="flex justify-between items-center h-[60px] px-4 shadow-lg">
          <h1 className='text-2xl font-bold'>Danh sách vé</h1>
        </div>

        <div className="flex justify-between items-center px-4 h-[64px]">
          <div className="flex gap-4">
            <input
              type="search"
              name="keyword"
              placeholder="Nhập từ khoá tìm kiếm..."
              className="w-[300px] border border-primary rounded-lg py-2 px-4"
              onChange={(e) => setKeyword(e.target.value)}
            /> <select
              className="border border-primary rounded-lg py-2 px-4"
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Theo ngày tạo mới nhất</option>
              <option value="date_asc">Theo ngày cũ nhất</option>
              <option value="date_desc">Theo ngày tạo giảm dần</option>
              <option value="price_desc">Theo giá giảm dần</option>
            </select>
          </div>
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
        <div className="mt-4">
          <ReactPaginate
            pageCount={pagination.totalPages}
            pageRangeDisplayed={10}
            marginPagesDisplayed={2}
            onPageChange={(page) => {
              setPage(page.selected + 1);
            }}
            containerClassName="flex justify-center items-center gap-2"
            pageClassName="px-2 py-1 bg-transparent text-primary rounded hover:!text-white transition-all hover:bg-primary"
            previousClassName="px-2 py-1 bg-transparent text-primary rounded hover:!text-white transition-all hover:bg-primary"
            nextClassName="px-2 py-1 bg-transparent text-primary rounded hover:!text-white transition-all hover:bg-primary"
            activeClassName="bg-primary"
            pageLinkClassName="hover:!text-white"
            nextLabel="Trang sau"
            previousLabel="Trang trước"
          />
        </div>
      </div>
    </div >
  )
}