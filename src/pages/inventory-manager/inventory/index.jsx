import SidebarInventoryManager from '@/components/common/sidebar-inventory-manager';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const mockData = [
  {
    partId: 'PT001',
    partName: 'Lọc dầu động cơ',
    stockQuantity: 5,
    price: 350000,
    supplier: 'Toyota Long Biên',
    status: 'Sắp hết',
    warranty: '2025-06-30',
  },
  {
    partId: 'PT002',
    partName: 'Bugi đánh lửa',
    stockQuantity: 50,
    price: 120000,
    supplier: 'Honda Việt Nam',
    status: 'Còn hàng',
    warranty: '2026-01-15',
  },
  {
    partId: 'PT003',
    partName: 'Dây curoa tổng',
    stockQuantity: 0,
    price: 800000,
    supplier: 'Hyundai',
    status: 'Hết hàng',
    warranty: '2024-12-01',
  },
];

const statusColor = {
  'Còn hàng': 'bg-green-100 text-green-700',
  'Sắp hết': 'bg-yellow-100 text-yellow-800',
  'Hết hàng': 'bg-red-100 text-red-700',
};

export default function InventoryListPage() {
  const [dataList, setDataList] = useState(mockData);
  const [keyword, setKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [supplierFilter, setSupplierFilter] = useState('all');
  const navigate = useNavigate();

  const suppliers = Array.from(new Set(mockData.map(item => item.supplier)));

  const filteredList = dataList.filter(item => {
    const matchKeyword =
      item.partName.toLowerCase().includes(keyword.toLowerCase()) ||
      item.partId.toLowerCase().includes(keyword.toLowerCase());
    const matchStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchSupplier = supplierFilter === 'all' || item.supplier === supplierFilter;
    return matchKeyword && matchStatus && matchSupplier;
  });

  return (
    <div className="flex flex-row w-full">
      <SidebarInventoryManager />
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center px-8 py-4 border-b">
          <h1 className="text-2xl font-bold">Quản Lý Kho Phụ Tùng</h1>
          <Link to="/inventory-manager/inventory/add" className="button primary">
            Thêm Phụ Tùng
          </Link>
        </div>
        <div className="p-8">
          <div className="flex gap-4 mb-6 flex-wrap">
            <input
              type="search"
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              placeholder="Tìm theo tên, mã phụ tùng..."
              className="flex-grow border border-gray-300 rounded-lg py-2 px-4 min-w-[220px]"
            />
            <select
              className="border border-gray-300 rounded-lg py-2 px-4"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="Còn hàng">Còn hàng</option>
              <option value="Sắp hết">Sắp hết</option>
              <option value="Hết hàng">Hết hàng</option>
            </select>
            <select
              className="border border-gray-300 rounded-lg py-2 px-4"
              value={supplierFilter}
              onChange={e => setSupplierFilter(e.target.value)}
            >
              <option value="all">Tất cả NCC</option>
              {suppliers.map(sup => (
                <option key={sup} value={sup}>{sup}</option>
              ))}
            </select>
          </div>
          <div className="overflow-x-auto rounded-xl shadow border bg-white">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left">Mã</th>
                  <th className="px-4 py-3 text-left">Tên phụ tùng</th>
                  <th className="px-4 py-3 text-right">Số lượng</th>
                  <th className="px-4 py-3 text-right">Giá (VND)</th>
                  <th className="px-4 py-3 text-left">Nhà cung cấp</th>
                  <th className="px-4 py-3 text-center">Trạng thái</th>
                  <th className="px-4 py-3 text-center">Hạn bảo hành</th>
                  <th className="px-4 py-3 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredList.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-8 text-gray-500">Không có dữ liệu để hiển thị.</td>
                  </tr>
                ) : (
                  filteredList.map(item => (
                    <tr key={item.partId} className="border-b last:border-0">
                      <td className="px-4 py-2 font-mono">{item.partId}</td>
                      <td className="px-4 py-2">{item.partName}</td>
                      <td className="px-4 py-2 text-right font-bold {item.stockQuantity <= 5 ? 'text-red-600' : ''}">{item.stockQuantity}</td>
                      <td className="px-4 py-2 text-right">{item.price.toLocaleString()}</td>
                      <td className="px-4 py-2">{item.supplier}</td>
                      <td className="px-4 py-2 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor[item.status] || 'bg-gray-200 text-gray-700'}`}>{item.status}</span>
                      </td>
                      <td className="px-4 py-2 text-center">{item.warranty}</td>
                      <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => navigate(`/inventory-manager/inventory/edit/${item.partId}`)}
                          className="button !bg-blue-500 !text-white !px-3 !py-1 mr-2"
                        >Sửa</button>
                        <button
                          onClick={() => alert('Chức năng xóa chưa kết nối API!')}
                          className="button !bg-red-500 !text-white !px-3 !py-1"
                        >Xóa</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 