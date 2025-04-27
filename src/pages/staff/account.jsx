import DriveHeader from "@/components/common/drive-header";
import SidebarStaff from "@/components/common/sidebar-staff";
import CustomTable from "@/components/common/table";
import { showError, showSuccess } from "@/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const columns = [
  { header: "Mã khách hàng", field: "customerId" },
  { header: "Mã thành viên", field: "membershipId" },
  { header: "Số điện thoại", field: "phoneNumber" },
  { header: "Tên", field: "name" },
  { header: "Điểm tích luỹ", field: "score" },
  { header: "Mã khách hàng", field: "customerId" },
]

export default function StaffAccountListPage() {
  const yourToken = localStorage.getItem('bus-token');

  const [dataList, setDataList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("date_desc");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 10,
  });

  useEffect(() => {
    callApiCustomer({ keyword, sort, page });
  }, [keyword, sort, page]);

  function callApiCustomer({ keyword = "", sort = "", page = 1, limit = 10 }) {
    axios.get(`${baseURL}/api/Customer`, {
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
          setDataList(res?.data?.data || []);
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

  function handleDeleteCustomer(name, id) {
    {
      if (confirm(`Vô hiệu hoá ${name}?`)) {
        axios.delete(`${baseURL}/api/Customer/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 69420,
            'Authorization': `Bearer ${yourToken}`,
          }
        })
          .then((res) => {
            if (res.status === 200) {
              showSuccess();
            }
            callApiCustomer({ keyword, sort, page });
          })
          .catch((e) => {
            showError(e?.response?.data?.message);
            callApiCustomer({ keyword, sort, page });
          });
      }
    }
  }

  return (
    <div className="flex flex-col h-full w-full">
      <DriveHeader />
      <div className="flex flex-row w-full">
        <SidebarStaff />
        <div className="flex flex-col w-full">
          <div className="flex justify-between flex-wrap items-center px-4 gap-4 min-h-[64px]">
            <div className="flex gap-4">
              <input
                type="search"
                name="keyword"
                value={keyword}
                onChange={(e) => {
                  setPage(1);
                  setKeyword(e.target.value);
                }}
                placeholder="Nhập từ khoá tìm kiếm..."
                className="w-[300px] border border-slate-600 rounded-lg py-2 px-4"
              />
              <select
                className="border border-primary rounded-lg py-2 px-4"
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="date_desc">Theo ngày tạo mới nhất</option>
                <option value="date_asc">Theo ngày cũ nhất</option>
              </select>
            </div>
          </div>

          <CustomTable
            columns={columns}
            data={dataList}
            renderActions={(row) => (
              <div className="flex gap-2 justify-center">
                <button
                  disabled={row.isDelete}
                  onClick={() => handleDeleteCustomer(row.name, row.customerId)}
                  className="button !bg-red-500 !text-white"
                >
                  Vô hiệu hoá
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
      </div>
    </div >
  );
}