import Pagination from "@/components/common/pagination";
import SidebarAdmin from "@/components/common/sidebar-admin";
import Toggle from "@/components/form/toggle";
import IconBin from "@/components/icons/IconBin";
import IconEdit from "@/components/icons/IconEdit";
import IconEmail from "@/components/icons/IconEmail";
import IconLock from "@/components/icons/IconLock";
import IconPlus from "@/components/icons/IconPlus";
import IconUnlock from "@/components/icons/IconUnlock";
import { showError } from "@/utils";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function PromotionPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const data = [
    {
      id: 1,
      name: "Giảm giá mùa hè",
      percent: 10,
      services: ["Rửa xe", "Thay nhớt"],
      status: "active",
    },
    {
      id: 2,
      name: "Khuyến mãi cuối tuần",
      percent: 15,
      services: ["Bảo dưỡng", "Rửa xe"],
      status: "inactive",
    },
    {
      id: 3,
      name: "Giảm giá ngày lễ",
      percent: 20,
      services: ["Sửa chữa", "Thay nhớt"],
      status: "active",
    },
    {
      id: 4,
      name: "Tri ân khách hàng",
      percent: 25,
      services: ["Rửa xe", "Bảo dưỡng", "Sửa chữa"],
      status: "inactive",
    },
    {
      id: 5,
      name: "Khuyến mãi khai trương",
      percent: 30,
      services: ["Thay nhớt", "Sửa chữa"],
      status: "active",
    },
    {
      id: 6,
      name: "Giảm giá buổi tối",
      percent: 12,
      services: ["Rửa xe"],
      status: "active",
    },
    {
      id: 7,
      name: "Giảm giá ngày chủ nhật",
      percent: 18,
      services: ["Bảo dưỡng"],
      status: "inactive",
    },
    {
      id: 8,
      name: "Ưu đãi thành viên mới",
      percent: 22,
      services: ["Rửa xe", "Bảo dưỡng"],
      status: "active",
    },
    {
      id: 9,
      name: "Combo tiết kiệm",
      percent: 35,
      services: ["Thay nhớt", "Rửa xe", "Sửa chữa"],
      status: "inactive",
    },
    {
      id: 10,
      name: "Khuyến mãi đặc biệt",
      percent: 40,
      services: ["Bảo dưỡng", "Sửa chữa"],
      status: "active",
    },
  ];

  const filteredData = data.filter((user) => {
    const matchesFilter = activeFilter === "all" || user.role === activeFilter;
    const matchesSearch = user.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const handleToggleStatus = (userId) => {
    showError("Chức năng khoá/mở khoá tài khoản chưa được kết nối API.");
  };

  const handleSendActivation = (userId) => {
    showError("Chức năng gửi email kích hoạt chưa được kết nối API.");
  };

  const handleDelete = (id) => {
    const res = confirm(`Bạn có chắc chắn muốn xoá khuyến mãi ${id} ?`);
    if (res) {
        showError("Chức năng xoá chưa được kết nối API.");
    }    
  }

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
                Quản Lý Khuyến Mãi
              </h1>
              <p className="text-sm text-gray-600">
                Cấu hình các chương trình khuyến mãi
              </p>
            </div>
          </div>
          <Link to="/admin/promotion/new" className="button primary">
            <IconPlus />
            Tạo khuyến mãi
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
                  placeholder="Tìm kiếm theo tên khuyến mãi"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-8 py-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">
                Danh Sách Khuyến Mãi
              </h2>
              <p className="text-sm text-gray-600">
                Quản lý các chương trình khuyến mãi
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tên khuyến mãi
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phần trăm
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dịch vụ áp dụng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trạng thái
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thao Tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {item.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.percent}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center flex-wrap gap-1">
                          {item.services.map(item => <div className="bg-gray-100 text-xs px-2 rounded-full w-fit">{item}</div>)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Toggle isActive={item.status === "active"} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex flex-wrap gap-2">
                          <a
                            href={`/admin/promotion/${item.id}`}
                            className="rounded-full p-2 hover:bg-green-100 transition-colors text-green-600"
                          >
                            <IconEdit />
                          </a>
                          <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">
                            <IconBin />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredData.length > 0 && <Pagination totalPage={3} />}

            {filteredData.length === 0 && (
              <div className="text-center py-12">
                <IconNotFound className="text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Không tìm thấy người dùng nào</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
