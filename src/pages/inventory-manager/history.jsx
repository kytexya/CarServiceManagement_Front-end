import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const mockHistoryData = [
  {
    id: 'H001',
    type: 'Nhập kho',
    partId: 'PT001',
    partName: 'Lọc dầu động cơ',
    quantity: 10,
    price: 350000,
    total: 3500000,
    supplier: 'Toyota Long Biên',
    staff: 'Nguyễn Văn A',
    date: '2024-01-15 09:30:00',
    note: 'Nhập hàng theo đơn hàng PO-2024-001',
    orderId: 'NK001',
  },
  {
    id: 'H002',
    type: 'Xuất kho',
    partId: 'PT001',
    partName: 'Lọc dầu động cơ',
    quantity: 1,
    price: 350000,
    total: 350000,
    supplier: null,
    staff: 'Nguyễn Văn D',
    date: '2024-01-15 10:30:00',
    note: 'Thay dầu động cơ cho xe Toyota Camry',
    orderId: 'XK001',
  },
  {
    id: 'H003',
    type: 'Nhập kho',
    partId: 'PT002',
    partName: 'Bugi đánh lửa',
    quantity: 20,
    price: 120000,
    total: 2400000,
    supplier: 'Honda Việt Nam',
    staff: 'Trần Thị B',
    date: '2024-01-20 14:15:00',
    note: 'Nhập hàng theo đơn hàng PO-2024-002',
    orderId: 'NK002',
  },
  {
    id: 'H004',
    type: 'Xuất kho',
    partId: 'PT002',
    partName: 'Bugi đánh lửa',
    quantity: 4,
    price: 120000,
    total: 480000,
    supplier: null,
    staff: 'Trần Thị E',
    date: '2024-01-20 15:30:00',
    note: 'Bảo dưỡng định kỳ cho xe Honda Civic',
    orderId: 'XK002',
  },
  {
    id: 'H005',
    type: 'Xuất kho',
    partId: 'PT004',
    partName: 'Bộ lọc gió động cơ',
    quantity: 1,
    price: 250000,
    total: 250000,
    supplier: null,
    staff: 'Lê Văn F',
    date: '2024-01-22 09:00:00',
    note: 'Kiểm tra chất lượng phụ tùng',
    orderId: 'XK003',
  },
  {
    id: 'H006',
    type: 'Nhập kho',
    partId: 'PT003',
    partName: 'Dây curoa tổng',
    quantity: 5,
    price: 800000,
    total: 4000000,
    supplier: 'Hyundai',
    staff: 'Lê Văn C',
    date: '2024-01-25 11:45:00',
    note: 'Nhập hàng theo đơn hàng PO-2024-003',
    orderId: 'NK003',
  },
];

const mockParts = [
  { id: 'PT001', name: 'Lọc dầu động cơ' },
  { id: 'PT002', name: 'Bugi đánh lửa' },
  { id: 'PT003', name: 'Dây curoa tổng' },
  { id: 'PT004', name: 'Bộ lọc gió động cơ' },
  { id: 'PT005', name: 'Bộ phanh trước' },
];

const mockStaff = [
  'Nguyễn Văn A',
  'Trần Thị B',
  'Lê Văn C',
  'Nguyễn Văn D',
  'Trần Thị E',
  'Lê Văn F',
];

export default function HistoryPage() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [partFilter, setPartFilter] = useState('all');
  const [staffFilter, setStaffFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const [historyData, setHistoryData] = useState([]);
  const token = localStorage.getItem("carserv-token");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/api/History", {
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'anyvalue',
          },
          withCredentials: true
        });
        setHistoryData(res.data || []);
      } catch (error) {
        console.error('Lỗi khi fetch dữ liệu:', error);
      }
    }

    fetchData();
  }, []);

  const filteredHistory = mockHistoryData.filter(item => {
    const matchKeyword = item.partName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                        item.partId.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                        item.note.toLowerCase().includes(searchKeyword.toLowerCase());
    const matchType = typeFilter === 'all' || item.type === typeFilter;
    const matchPart = partFilter === 'all' || item.partId === partFilter;
    const matchStaff = staffFilter === 'all' || item.staff === staffFilter;
    
    let matchDate = true;
    if (dateFrom || dateTo) {
      const itemDate = new Date(item.date);
      if (dateFrom) {
        const fromDate = new Date(dateFrom);
        matchDate = matchDate && itemDate >= fromDate;
      }
      if (dateTo) {
        const toDate = new Date(dateTo);
        toDate.setHours(23, 59, 59, 999);
        matchDate = matchDate && itemDate <= toDate;
      }
    }
    
    return matchKeyword && matchType && matchPart && matchStaff && matchDate;
  });

  const getTypeColor = (type) => {
    return type === 'Nhập kho' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';
  };

  const getTypeIcon = (type) => {
    return type === 'Nhập kho' ? (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
      </svg>
    ) : (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
      </svg>
    );
  };

  const exportToExcel = async () => {
    try {
      const res = await axios.get('/api/history/export/excel', {
        params: {
          search: searchKeyword,
          type: typeFilter,
          part: partFilter,
          staff: staffFilter,
          dateFrom,
          dateTo
        },
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'anyvalue',
        },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'history.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Lỗi khi xuất Excel:', error);
    }
  };

  const exportToPDF = async () => {
  try {
    const res = await axios.get('/api/history/export/pdf', {
      params: {
        search: searchKeyword,
        type: typeFilter,
        part: partFilter,
        staff: staffFilter,
        dateFrom,
        dateTo
      },
      headers: {
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': 'anyvalue',
      },
      responseType: 'blob',
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'history.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error('Lỗi khi xuất PDF:', error);
  }
};

  return (
    <div className="flex flex-col w-full">
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b bg-white shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Lịch Sử Nhập - Xuất Kho</h1>
              <p className="text-sm text-gray-600">Log chi tiết các hành động nhập xuất kho</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="button" onClick={exportToExcel}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Xuất Excel
            </button>
            <button className="button" onClick={exportToPDF}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Tải PDF
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8">
          {/* Search and Filter */}
          <div className="bg-white rounded-lg border p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tìm kiếm</label>
                <input
                  type="text"
                  placeholder="Tìm theo tên phụ tùng, mã, ghi chú..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Loại</label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">Tất cả</option>
                  <option value="Nhập kho">Nhập kho</option>
                  <option value="Xuất kho">Xuất kho</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phụ tùng</label>
                <select
                  value={partFilter}
                  onChange={(e) => setPartFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">Tất cả phụ tùng</option>
                  {mockParts.map(part => (
                    <option key={part.id} value={part.id}>{part.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nhân viên</label>
                <select
                  value={staffFilter}
                  onChange={(e) => setStaffFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">Tất cả nhân viên</option>
                  {mockStaff.map(staff => (
                    <option key={staff} value={staff}>{staff}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Từ ngày</label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Đến ngày</label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  setSearchKeyword('');
                  setTypeFilter('all');
                  setPartFilter('all');
                  setStaffFilter('all');
                  setDateFrom('');
                  setDateTo('');
                }}
                className="button"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Làm mới
              </button>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg border p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tổng giao dịch</p>
                  <p className="text-2xl font-bold text-gray-900">{filteredHistory.length}</p>
                </div>
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg border p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Nhập kho</p>
                  <p className="text-2xl font-bold text-green-600">
                    {filteredHistory.filter(item => item.type === 'Nhập kho').length}
                  </p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg border p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Xuất kho</p>
                  <p className="text-2xl font-bold text-red-600">
                    {filteredHistory.filter(item => item.type === 'Xuất kho').length}
                  </p>
                </div>
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg border p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tổng giá trị</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {filteredHistory.reduce((sum, item) => sum + item.total, 0).toLocaleString('vi-VN')} ₫
                  </p>
                </div>
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* History List */}
          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thời gian
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Loại
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phụ tùng
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Số lượng
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Đơn giá
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thành tiền
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nhân viên
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ghi chú
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mã phiếu
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredHistory.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {new Date(item.date).toLocaleString('vi-VN')}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(item.type)}
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(item.type)}`}>
                            {item.type}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        <div>
                          <div className="font-medium">{item.partName}</div>
                          <div className="text-xs text-gray-500">{item.partId}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-center text-gray-900">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">
                        {item.price.toLocaleString('vi-VN')} ₫
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">
                        {item.total.toLocaleString('vi-VN')} ₫
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {item.staff}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        <div className="max-w-xs truncate" title={item.note}>
                          {item.note}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-center text-gray-900">
                        <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                          {item.orderId}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Hiển thị <span className="font-medium">{filteredHistory.length}</span> trong tổng số <span className="font-medium">{mockHistoryData.length}</span> giao dịch
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