import { showError } from '@/utils';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const mockData = [
  {
    partId: 'PT001',
    partName: 'Lọc dầu động cơ',
    quantity: 5,
    unitPrice: 350000,
    sellingPrice: 450000,
    supplier: 'Toyota Long Biên',
    status: 'Sắp hết',
    expiryDate: '2025-06-30',
    minThreshold: 10,
    monthlyUsage: 45,
    lastImported: '2024-01-15',
  },
  {
    partId: 'PT002',
    partName: 'Bugi đánh lửa',
    quantity: 50,
    unitPrice: 120000,
    sellingPrice: 180000,
    supplier: 'Honda Việt Nam',
    status: 'Còn hàng',
    expiryDate: '2026-01-15',
    minThreshold: 20,
    monthlyUsage: 120,
    lastImported: '2024-01-20',
  },
  {
    partId: 'PT003',
    partName: 'Dây curoa tổng',
    quantity: 0,
    unitPrice: 800000,
    sellingPrice: 1200000,
    supplier: 'Hyundai',
    status: 'Hết hàng',
    expiryDate: '2024-12-01',
    minThreshold: 5,
    monthlyUsage: 8,
    lastImported: '2023-12-10',
  },
  {
    partId: 'PT004',
    partName: 'Bộ lọc gió động cơ',
    quantity: 3,
    unitPrice: 250000,
    sellingPrice: 350000,
    supplier: 'Ford Việt Nam',
    status: 'Sắp hết',
    expiryDate: '2025-03-15',
    minThreshold: 8,
    monthlyUsage: 25,
    lastImported: '2024-01-18',
  },
  {
    partId: 'PT005',
    partName: 'Bộ phanh trước',
    quantity: 15,
    unitPrice: 1200000,
    sellingPrice: 1800000,
    supplier: 'BMW Việt Nam',
    status: 'Còn hàng',
    expiryDate: '2025-08-20',
    minThreshold: 12,
    monthlyUsage: 35,
    lastImported: '2024-01-22',
  },
];

const statusColor = {
  'Còn hàng': 'bg-green-100 text-green-700',
  'Sắp hết': 'bg-yellow-100 text-yellow-800',
  'Hết hàng': 'bg-red-100 text-red-700',
};

// Icon component for out of stock warning
const OutOfStockIcon = () => (
  <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
  </svg>
);

// Icon component for low stock warning (yellow)
const LowStockIcon = () => (
  <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
  </svg>
);

export default function InventoryListPage() {
  const [dataList, setDataList] = useState(mockData);
  const [keyword, setKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [supplierFilter, setSupplierFilter] = useState('all');
  const [parts, setParts] = useState([]);
  const [lowParts, setLowParts] = useState([]);
  const [outOfStockParts, setOutOfStockParts] = useState([]);
  const token = localStorage.getItem("carserv-token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchParts()
    fetchLowParts()
    fetchOutOfStockParts()
  }, []);


  const fetchParts = async () => {
    try {
      const res = await axios.get("/api/Parts", {
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'anyvalue',
        },
        withCredentials: true
      });
      setParts(res.data || []);
    } catch (err) {
      showError("Không tải được danh sách phụ tùng");
    }
  }
  const fetchLowParts = async () => {
    try {
      const res = await axios.get("/api/Parts/get-low-parts", {
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'anyvalue',
        },
        withCredentials: true
      });
      setLowParts(res.data || []);
    } catch (err) {
      showError("Không tải được danh sách phụ tùng");
    }
  }
  const fetchOutOfStockParts = async () => {
    try {
      const res = await axios.get("/api/Parts/get-out-of-stock-parts", {
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'anyvalue',
        },
        withCredentials: true
      });
      setOutOfStockParts(res.data || []);
    } catch (err) {
      showError("Không tải được danh sách phụ tùng");
    }
  }

  const suppliers = Array.from(new Set(mockData.map(item => item.supplier)));

  const filteredList = parts.filter(item => {
    const matchKeyword =
      item.partName.toLowerCase().includes(keyword.toLowerCase()) ||
      item.partId.toString().toLowerCase().includes(keyword.toLowerCase());
    const matchStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchSupplier = supplierFilter === 'all' || item.supplier === supplierFilter;
    return matchKeyword && matchStatus && matchSupplier;
  });

  // Count low stock items
  const lowStockCount = dataList.filter(item => item.quantity <= item.minThreshold && item.quantity > 0).length;
  const outOfStockCount = dataList.filter(item => item.quantity === 0).length;

  return (
    <div className="flex flex-col w-full">
        <div className="flex justify-between items-center px-8 py-4 border-b">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Danh Sách Phụ Tùng</h1>
            {(lowParts.length > 0 || outOfStockParts.length > 0) && (
              <div className="flex items-center gap-3">
                {lowParts.length > 0 && (
                  <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                    <LowStockIcon />
                    <span className="text-amber-700 font-semibold text-sm">
                      {lowParts.length} phụ tùng sắp hết hàng
                    </span>
                  </div>
                )}
                {outOfStockParts.length > 0 && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                    <OutOfStockIcon />
                    <span className="text-red-700 font-semibold text-sm">
                      {outOfStockParts.length} phụ tùng hết hàng
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
          <Link to="/inventory-manager/inventory/add" className="button primary">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Thêm Phụ Tùng
          </Link>
        </div>
        <div className="p-8">
          {/* Search and Filter */}
          <div className="bg-white rounded-lg border p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tìm kiếm</label>
                <input
                  type="text"
                  placeholder="Tìm theo tên hoặc mã phụ tùng..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="Còn hàng">Còn hàng</option>
                  <option value="Sắp hết">Sắp hết</option>
                  <option value="Hết hàng">Hết hàng</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nhà cung cấp</label>
                <select
                  value={supplierFilter}
                  onChange={(e) => setSupplierFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">Tất cả NCC</option>
                  {suppliers.map(supplier => (
                    <option key={supplier} value={supplier}>{supplier}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setKeyword('');
                    setStatusFilter('all');
                    setSupplierFilter('all');
                  }}
                  className="w-full button"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Làm mới
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mã phụ tùng
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tên phụ tùng
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Số lượng
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Giá nhập
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Giá bán
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nhà cung cấp
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hạn bảo hành
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trạng thái
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredList.map(item => {
                    const isLowStock = item.quantity <= item.minThreshold && item.quantity > 0;
                    const isOutOfStock = item.quantity === 0;
                    return (
                      <tr key={item.partId} className={`border-b last:border-0 ${
                        isOutOfStock ? 'bg-red-50' : isLowStock ? 'bg-amber-50' : ''
                      }`}>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          {item.partId}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {item.partName}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <span className={`font-bold ${
                              isOutOfStock ? 'text-red-600' : 
                              isLowStock ? 'text-amber-600' : 
                              'text-gray-900'
                            }`}>
                              {item.quantity}
                            </span>
                            {isOutOfStock && <OutOfStockIcon />}
                            {isLowStock && <LowStockIcon />}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-right text-gray-900">
                          {item.unitPrice.toLocaleString('vi-VN')} ₫
                        </td>
                        <td className="px-4 py-3 text-sm text-right text-gray-900">
                          {item.unitPrice.toLocaleString('vi-VN')} ₫
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {item.supplier}
                        </td>
                        <td className="px-4 py-3 text-sm text-center text-gray-900">
                          {item.expiryDate}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColor[item.status]}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => navigate(`/inventory-manager/inventory/edit/${item.partId}`)}
                              className="button button-info button-sm"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              Sửa
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm('Bạn có chắc muốn xóa phụ tùng này?')) {
                                  setDataList(dataList.filter(part => part.partId !== item.partId));
                                }
                              }}
                              className="button button-danger button-sm"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Xóa
                            </button>
                            <button
                              onClick={() => {
                                // TODO: Implement update stock functionality
                                alert('Chức năng cập nhật tồn kho sẽ được thêm sau');
                              }}
                              className="button button-warning button-sm"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                              </svg>
                              Cập nhật
                            </button>
                            <button
                              onClick={() => {
                                // TODO: Implement view usage history functionality
                                alert(`Lịch sử sử dụng: ${item.monthlyUsage} lượt/tháng`);
                              }}
                              className="button button-sm"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                              </svg>
                              Lịch sử
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Hiển thị <span className="font-medium">{filteredList.length}</span> trong tổng số <span className="font-medium">{filteredList.length}</span> phụ tùng
            </div>
            <div className="flex items-center gap-2">
              <button className="button button-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Trước
              </button>
              <span className="px-3 py-2 text-sm text-gray-700">1</span>
              <button className="button button-sm">
                Sau
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
  );
} 