import SidebarAdmin from "@/components/common/sidebar-admin";
import CustomTable from "@/components/common/table";
import { showError } from "@/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";
const baseURL = import.meta.env.VITE_API_BASE_URL;

const columns = [
  { header: "Mã chuyến đi", field: "tripId" },
  { header: "Tên tuyến đường", field: "routeName" },
  { header: "Biển số", field: "busId" },
  { header: "Tên loại xe", field: "busType" },
  { header: "Giờ khởi hành", field: "departureTime" },
  { header: "Ngày khởi hành", field: "date" },
  { header: "Giá vé", field: "price" },
  { header: "Trạng thái", field: "status" },
];

export default function TripListPage() {
  const [dataList, setDataList] = useState([]);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 10,
  });
  const navigate = useNavigate();
  const yourToken = localStorage.getItem("bus-token");
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("date_desc");
  const [page, setPage] = useState(1);

  useEffect(() => {
    callApi({ keyword, sort, page });
  }, [keyword, sort, page]);

  function callApi({ keyword = "", sort = "", page = 1, limit = 10 }) {
    axios
      .get(`${baseURL}/api/Trip`, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": 69420,
          Authorization: `Bearer ${yourToken}`,
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
          setDataList(res.data?.data || []);
          if (res.data?.pagination) {
            setPagination(res.data.pagination);
          }
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
          <h1 className="text-2xl font-bold">Danh sách chuyến đi</h1>
        </div>

        <div className="flex justify-between items-center px-4 h-[64px]">
          <div className="flex items-center gap-2">
            <input
              type="search"
              name="keyword"
              placeholder="Nhập từ khoá tìm kiếm..."
              className="w-[300px] border border-primary rounded-lg py-2 px-4"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <select
              className="border border-primary rounded-lg py-2 px-4"
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="date_asc">Theo ngày cũ nhất</option>
              <option value="date_desc">Theo ngày tạo giảm dần</option>
              <option value="price_desc">Theo giá giảm dần</option>
            </select>
          </div>
          <Link to="/admin/trip/add">
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
                onClick={() => navigate(`/admin/trip/edit/${row.tripId}`)}
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-primary"
              >
                Sửa
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
  );
}