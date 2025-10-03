import { showError, showSuccess } from "@/utils";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";import axios from "axios";
import IconNotFound from "@/components/icons/IconNotFound";
import Pagination from "@/components/common/pagination";
const ENV = import.meta.env.VITE_API_BASE_URL;

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    pageSize: 10,
  });

  // Mock data
  const usersMock = [
    {
      id: 1,
      username: "admin001",
      fullName: "Nguyễn Văn Admin",
      email: "admin@carservice.com",
      phone: "0123456789",
      role: "admin",
      status: "active",
      lastLogin: "2024-01-15 09:30",
      createdAt: "2024-01-01",
      department: "Quản lý",
    },
  ];

  const fetchUsers = async (page = 1) => {
    try {
      const res = await axios.get(`/api/Account?currentPage=${page}&pageSize=${pagination.pageSize}`, {
        params: {
          currentPage: 1,
          pageSize: 10
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("carserv-token")}`,
          'ngrok-skip-browser-warning': 'anyvalue',
        },
        // withCredentials: true,
      });
      setUsers(res?.data?.items);
      setPagination((prev) => ({
        ...prev,
        totalItems: res.data.totalItems,
        totalPages: res.data.totalPages,
        currentPage: res.data.currentPage,
        pageSize: res.data.pageSize,
      }));
    } catch (err) {
      console.error(err);
      showError("Lấy danh sách người dùng thất bại");
    } finally {
    }
  };

  useEffect(() => {
    fetchUsers(pagination.currentPage);
  }, [pagination.currentPage]);

  const getRoleColor = (role) => {
    switch (role) {
      case "Admin":
        return "bg-red-100 text-red-800";
      case "ServiceStaff":
        return "bg-blue-100 text-blue-800";
      case "InventoryManager":
        return "bg-green-100 text-green-800";
      case "Customer":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleText = (role) => {
    switch (role) {
      case "Admin":
        return "Admin";
      case "ServiceStaff":
        return "Nhân viên";
      case "InventoryManager":
        return "Quản lý kho";
      case "Customer":
        return "Khách hàng";
      default:
        return role;
    }
  };

  const getStatusColor = (status) => {
    return status === "active"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  const getStatusText = (status) => {
    return status === "active" ? "Hoạt động" : "Không hoạt động";
  };

  const filteredUsers = users?.filter((user) => {
    const matchesFilter = activeFilter === "all" || user.roleName === activeFilter;
    const matchesSearch =
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleToggleStatus = async (userId, currentStatus) => {
    try {
      const newStatus = currentStatus === true ? false : true;
      await axios.put(`/api/Account/account-status/${userId}`, newStatus, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("carserv-token")}`,
          'ngrok-skip-browser-warning': 'anyvalue',
          "Content-Type": "application/json",
        },
      });
      showSuccess("Cập nhật trạng thái thành công");
      fetchUsers();
    } catch (err) {
      console.error(err);
      showError("Cập nhật trạng thái thất bại");
    }
  };

  const handleSendActivation = async (userId) => {
    try {
      await axios.post(`${ENV}/api/users/${userId}/send-activation`);
      showSuccess("Đã gửi email kích hoạt");
    } catch (err) {
      console.error(err);
      showError("Gửi email thất bại");
    }
  };

  return (
    <div className="flex flex-row w-full h-screen bg-gray-50">
      <div className="flex flex-col w-full">
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b bg-white shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Quản Lý Người Dùng
              </h1>
              <p className="text-sm text-gray-600">
                Quản lý tài khoản và phân quyền người dùng
              </p>
            </div>
          </div>
          <Link to="/admin/user-management/add" className="button primary">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Thêm Người Dùng
          </Link>
        </div>

        {/* Main Content */}
        <div className="p-8">
          {/* Filters and Search */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên, username hoặc email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Role Filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                Tất cả ({users.length})
              </button>
              <button
                onClick={() => setActiveFilter("Admin")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === "Admin"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                Admin ({users.filter((u) => u.roleName === "Admin").length})
              </button>
              <button
                onClick={() => setActiveFilter("ServiceStaff")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === "ServiceStaff"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                Nhân viên ({users.filter((u) => u.roleName === "ServiceStaff").length})
              </button>
              <button
                onClick={() => setActiveFilter("InventoryManager")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === "InventoryManager"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                Quản lý kho (
                {users.filter((u) => u.roleName === "InventoryManager").length})
              </button>
              <button
                onClick={() => setActiveFilter("Customer")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === "Customer"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                Khách hàng ({users.filter((u) => u.roleName === "Customer").length})
              </button>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-8 py-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">
                Danh Sách Người Dùng
              </h2>
              <p className="text-sm text-gray-600">
                Quản lý tài khoản và phân quyền hệ thống
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thông Tin
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phân Quyền
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.userID} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {user.fullName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                          <div className="text-xs text-gray-400">
                            {user.phoneNumber}
                          </div>
                          <div className="text-xs text-gray-500">
                            {user.address}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-right">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(
                              user.roleName
                            )}`}
                          >
                            {getRoleText(user.roleName)}
                          </span>
                          <div className="text-xs text-gray-500 mt-1">
                            {user.department}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <IconNotFound className="text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Không tìm thấy người dùng nào</p>
              </div>
            )}
          </div>
          {pagination.totalItems > 0 && filteredUsers.length > 0 && (
            <Pagination
              totalPage={pagination.totalPages}
              currentPage={pagination.currentPage}
              totalItems={pagination.totalItems}
              pageSize={pagination.pageSize}
              onPageChange={(page) =>
                setPagination((prev) => ({ ...prev, currentPage: page }))
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
