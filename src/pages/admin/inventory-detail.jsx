import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "@/components/common/pagination";
import { showError } from "@/utils";
import IconEye from "@/components/icons/IconEye";
import IconEdit from "@/components/icons/IconEdit";

export default function InventoryDetailsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [parts, setParts] = useState([]);
  const [sortOption, setSortOption] = useState("Mới nhất");
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    pageSize: 10,
  });

  const token = localStorage.getItem("carserv-token");

  useEffect(() => {
    fetchParts(pagination.currentPage);
  }, [pagination.currentPage]);

  const fetchParts = async (page = 1) => {
    try {
        setParts([]);
        setPagination((prev) => ({
            ...prev,
            totalItems: 5,
            totalPages: 1,
            currentPage: 1,
            pageSize: 10,
        }));
    //   const res = await axios.get(
    //     `/api/Parts?currentPage=${page}&pageSize=${pagination.pageSize}`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //         "ngrok-skip-browser-warning": "anyvalue",
    //       },
    //       withCredentials: true,
    //     }
    //   );

    //   setParts(res.data.items || []);
    //   setPagination((prev) => ({
    //     ...prev,
    //     totalItems: res.data.totalItems,
    //     totalPages: res.data.totalPages,
    //     currentPage: res.data.currentPage,
    //     pageSize: res.data.pageSize,
    //   }));
    } catch (err) {
      showError("Không tải được danh sách phụ tùng");
    }
  };

  const filteredData = parts.filter((item) =>
    item.partName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    switch (sortOption) {
      case "Mới nhất":
        return b.partId - a.partId;
      case "Cũ nhất":
        return a.partId - b.partId;
      case "Nhiều nhất":
        return b.quantity - a.quantity;
      case "Ít nhất":
        return a.quantity - b.quantity;
      default:
        return 0;
    }
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Chi tiết kho phụ tùng</h1>
        <Link
          to="/admin/parts/new"
          className="button primary flex items-center"
        >
          <svg
            className="w-4 h-4 mr-2"
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
          Thêm phụ tùng
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border p-6 shadow-sm mb-6">
        <div className="flex justify-between items-center">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tìm kiếm
            </label>
            <input
              type="text"
              placeholder="Tìm theo tên phụ tùng"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-1/4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sắp xếp
            </label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option>Mới nhất</option>
              <option>Cũ nhất</option>
              <option>Nhiều nhất</option>
              <option>Ít nhất</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Tên phụ tùng
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  Số lượng
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  Đơn vị
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedData.map((item) => (
                <tr key={item.partId} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {item.partName}
                  </td>
                  <td className="px-4 py-3 text-sm text-center text-gray-900">
                    {item.quantity}
                  </td>
                  <td className="px-4 py-3 text-sm text-center text-gray-900">
                    {item.unit}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex justify-center space-x-2">
                      <button className="rounded-full p-2 hover:bg-blue-100 transition-colors text-blue-600">
                        <IconEye />
                      </button>
                      <a
                        href={`/admin/parts/${item.partId}`}
                        className="rounded-full p-2 hover:bg-green-100 transition-colors text-green-600"
                      >
                        <IconEdit />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {sortedData.length > 0 && (
        <Pagination
          totalPage={pagination.totalPages}
          className="mt-4"
        />
      )}
    </div>
  );
}
