import SidebarAdmin from '@/components/common/sidebar-admin';
import TabsSelector from '@/components/common/tab';
import CustomTable from '@/components/common/table';
import { showError, showSuccess } from '@/utils';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { Link, useNavigate } from 'react-router-dom';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const columns = {
  user: [
    { header: 'Mã tài khoản', field: 'userId' },
    { header: 'Tên tài khoản', field: 'username' },
    { header: 'Tên', field: 'name' },
    { header: 'Số điện thoại', field: 'phoneNumber' },
    { header: 'Quyền', field: 'role' },
  ],
  customer: [
    { header: 'Mã khách hàng', field: 'customerId' },
    { header: 'Mã thành viên', field: 'membershipId' },
    { header: 'Số điện thoại', field: 'phoneNumber' },
    { header: 'Tên', field: 'name' },
    { header: 'Điểm tích luỹ', field: 'score' },
    { header: 'Mã khách hàng', field: 'customerId' },
  ],
}
export default function AccountListPage() {
  const [activeTab, setActiveTab] = useState('user');
  const [dataList, setDataList] = useState([]);
  const [dataCustomer, setDataCustomerList] = useState([]);
  const navigate = useNavigate();
  const yourToken = localStorage.getItem('bus-token');
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
    if (activeTab === 'user') {
      callApiUser({ keyword, sort, page });
    } else {
      callApiCustomer({ keyword, sort, page });
    }
  }, [activeTab, keyword, sort, page]);


  function callApiUser({ keyword = "", sort = "", page = 1, limit = 10 }) {
    axios.get(`${baseURL}/api/User`, {
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
            role: item.role === 1 ? "Admin" : item.role === 2 ? "Nhân viên" : "Tài xế",
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
          setDataCustomerList(res?.data?.data || []);
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

  const tabs = [
    { label: 'Người dùng', value: 'user' },
    { label: 'Khách hàng', value: 'customer' },
  ];

  function handleDeleteUser(name, id) {
    {
      if (confirm(`Vô hiệu hoá ${name}?`)) {
        axios.delete(`${baseURL}/api/User/${id}`, {
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
            callApiUser({ keyword, sort, page });
          })
          .catch((e) => {
            showError(e?.response?.data?.message);
            callApiUser({ keyword, sort, page });
          });
      }
    }
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
    <div className='flex flex-row w-full'>
      <SidebarAdmin />
      <div className='flex flex-col w-full'>

        <div className="flex justify-between items-center px-4 h-[64px]">
          <TabsSelector
            tabs={tabs}
            active={activeTab}
            onChange={(val) => setActiveTab(val)}
          />
          <Link to='/admin/account/add'>
            <button className="inline-flex items-center justify-center px-4 h-10 font-sans font-semibold tracking-wide text-white bg-success rounded-lg">
              Thêm tài khoản
            </button>
          </Link>
        </div>

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
          columns={columns[activeTab]}
          data={activeTab === 'user' ? dataList : dataCustomer}
          renderActions={(row) => (
            <div className="flex gap-2 justify-center">
              {activeTab === 'user' &&
                <button
                  onClick={() => navigate(`/admin/account/edit/${row.userId}`)}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Sửa
                </button>
              }
              <button
                disabled={row.isDelete}
                onClick={() => {
                  if (activeTab === 'user') {
                    handleDeleteUser(row.username, row.userId)
                  } else {
                    handleDeleteCustomer(row.name, row.customerId)
                  }
                }}
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
  )
}