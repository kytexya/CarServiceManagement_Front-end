import SidebarAdmin from "@/components/common/sidebar-admin";
import TabsSelector from "@/components/common/tab";
import CustomTable from "@/components/common/table";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const columns = {
  user: [
    { header: "Mã tài khoản", field: "userId" },
    { header: "Tên tài khoản", field: "username" },
    { header: "Tên", field: "Name" },
    { header: "Số điện thoại", field: "phoneNumber" },
    { header: "Quyền", field: "role" },
  ],
  customer: [
    { header: "Mã khách hàng", field: "customerId" },
    { header: "Mã thành viên", field: "membershipId" },
    { header: "Số điện thoại", field: "phoneNumber" },
    { header: "Tên", field: "Name" },
    { header: "Điểm tích luỹ", field: "Score" },
    { header: "Mã khách hàng", field: "customerId" },
  ],
};
export default function AccountListPage() {
  const [activeTab, setActiveTab] = useState("user");
  const [dataList, setDataList] = useState([]);
  const [dataCustomer, setDataCustomerList] = useState([]);
  const navigate = useNavigate();
  const yourToken = localStorage.getItem("bus-token");

  useEffect(() => {
    callApi();
  }, []);

  function callApi() {
    fetch(`${baseURL}/api/User`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": 69420,
      },
    })
      .then(async (res) => {
        const result = await res.json();
        if (res.status === 200) {
          setDataList(
            result.map((item) => ({
              ...item,
              role:
                item.role === 1
                  ? "Admin"
                  : item.role === 2
                  ? "Nhân viên"
                  : "Tài xế",
            }))
          );
        } else {
          showError();
        }
      })
      .catch(() => {
        showError();
      });
    fetch(`${baseURL}/customers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": 69420,
        Authorization: `Bearer ${yourToken}`,
      },
    })
      .then(async (res) => {
        const result = await res.json();
        if (res.status === 200) {
          setDataCustomerList(result);
        } else {
          showError();
        }
      })
      .catch(() => {
        showError();
      });
  }

  useEffect(() => {
    callApi();
  }, []);

  function callApi() {
    fetch(`${baseURL}/api/User`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": 69420,
      },
    })
      .then(async (res) => {
        const result = await res.json();
        if (res.status === 200) {
          setDataList(
            result.map((item) => ({
              ...item,
              role:
                item.role === 1
                  ? "Admin"
                  : item.role === 2
                  ? "Nhân viên"
                  : "Tài xế",
            }))
          );
        } else {
          showError();
        }
      })
      .catch(() => {
        showError();
      });
    fetch(`${baseURL}/customers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": 69420,
        Authorization: `Bearer ${yourToken}`,
      },
    })
      .then(async (res) => {
        const result = await res.json();
        if (res.status === 200) {
          setDataCustomerList(result);
        } else {
          showError();
        }
      })
      .catch(() => {
        showError();
      });
  }

  const tabs = [
    { label: "Người dùng", value: "user" },
    { label: "Khách hàng", value: "customer" },
  ];

  return (
    <div className="flex flex-row w-full">
      <SidebarAdmin />
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center px-4 h-[64px]">
          <TabsSelector
            tabs={tabs}
            active={activeTab}
            onChange={(val) => setActiveTab(val)}
          />
          <Link to="/admin/account/add">
            <button className="inline-flex items-center justify-center px-4 h-10 font-sans font-semibold tracking-wide text-white bg-success rounded-lg">
              Thêm tài khoản
            </button>
          </Link>
        </div>

        <div className="flex border py-3 px-4 justify-end">
          <input
            type="search"
            name="keyword"
            placeholder="Nhập từ khoá tìm kiếm..."
            className="w-[300px] border border-slate-600 rounded-lg py-2 px-4"
          />
        </div>

        <CustomTable
          columns={columns[activeTab]}
          data={activeTab === "user" ? dataList : dataCustomer}
          renderActions={
            activeTab === "user"
              ? (row) => (
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() =>
                        navigate(`/admin/account/edit/${row.userId}`)
                      }
                      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Xoá ${row.username}?`)) {
                          fetch(`${baseURL}/api/User/${row.userId}`, {
                            method: "DELETE",
                            headers: {
                              "Content-Type": "application/json",
                              "ngrok-skip-browser-warning": 69420,
                              Authorization: `Bearer ${yourToken}`,
                            },
                          })
                            .then(async (res) => {
                              const result = await res.json();
                              if (res.status === 200) {
                                callApi();
                              } else {
                                showError();
                              }
                            })
                            .catch(() => {
                              showError();
                            });
                        }
                      }}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Xoá
                    </button>
                  </div>
                )
              : null
          }
        />
      </div>
    </div>
  );
}
