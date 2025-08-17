import Pagination from "@/components/common/pagination";
import IconEdit from "@/components/icons/IconEdit";
import IconEye from "@/components/icons/IconEye";
import React, { useState } from "react";
const Parts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const data = [
    { id: 1, name: "Má phanh", unit: "bộ", quantity: 20 },
    { id: 2, name: "Lọc dầu", unit: "cái", quantity: 50 },
    { id: 3, name: "Bugi", unit: "cái", quantity: 100 },
    { id: 4, name: "Lọc gió", unit: "cái", quantity: 40 },
    { id: 5, name: "Bóng đèn pha", unit: "cái", quantity: 60 },
    { id: 6, name: "Ắc quy", unit: "cái", quantity: 15 },
    { id: 7, name: "Ống nước làm mát", unit: "cái", quantity: 30 },
    { id: 8, name: "Bàn ép ly hợp", unit: "bộ", quantity: 10 },
    { id: 9, name: "Dây curoa cam", unit: "cái", quantity: 25 },
    { id: 10, name: "Máy phát điện", unit: "cái", quantity: 8 },
  ];
  const filteredData = data.filter((order) => {
    const matchKeyword =
      order.name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchKeyword;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Danh sách phiếu dịch vụ</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 font-semibold shadow transition-colors duration-200 flex items-center">
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
        </button>
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
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Mới nhất</option>
              <option>Cũ nhất</option>
              <option>Nhiều nhất</option>
              <option>Ít nhất</option>
            </select>
          </div>
        </div>
      </div>
      {/* Service Orders Table */}
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên phụ tùng
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số lượng
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Đơn vị
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {order.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-center text-gray-900">
                    {order.quantity}
                  </td>
                  <td className="px-4 py-3 text-sm text-center text-gray-900">
                    {order.unit}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex justify-center space-x-2">
                      <button className="rounded-full p-2 hover:bg-blue-100 transition-colors text-blue-600">
                        <IconEye />
                      </button>
                      <a
                        href={`/inventory-manager/parts/${order.id}`}
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
      <Pagination totalPage={3} />
    </div>
  );
};

export default Parts;
