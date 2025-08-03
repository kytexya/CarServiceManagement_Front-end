import SidebarInventoryManager from '@/components/common/sidebar-inventory-manager';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const mockParts = [
  { id: 'PT001', name: 'Lọc dầu động cơ', stockQuantity: 15, price: 350000 },
  { id: 'PT002', name: 'Bugi đánh lửa', stockQuantity: 50, price: 120000 },
  { id: 'PT003', name: 'Dây curoa tổng', stockQuantity: 8, price: 800000 },
  { id: 'PT004', name: 'Bộ lọc gió động cơ', stockQuantity: 12, price: 250000 },
  { id: 'PT005', name: 'Bộ phanh trước', stockQuantity: 25, price: 1200000 },
];

const mockServices = [
  { id: 'SV001', name: 'Thay dầu động cơ', customer: 'Nguyễn Văn A' },
  { id: 'SV002', name: 'Bảo dưỡng định kỳ', customer: 'Trần Thị B' },
  { id: 'SV003', name: 'Sửa chữa phanh', customer: 'Lê Văn C' },
];

const mockStaff = [
  { id: 'NV001', name: 'Nguyễn Văn D', role: 'Kỹ thuật viên' },
  { id: 'NV002', name: 'Trần Thị E', role: 'Kỹ thuật viên' },
  { id: 'NV003', name: 'Lê Văn F', role: 'Thợ máy' },
];

const mockExportOrders = [
  {
    id: 'XK001',
    serviceId: 'SV001',
    serviceName: 'Thay dầu động cơ',
    customer: 'Nguyễn Văn A',
    staffId: 'NV001',
    staffName: 'Nguyễn Văn D',
    exportDate: '2024-01-15',
    purpose: 'Dịch vụ',
    totalAmount: 350000,
    status: 'Hoàn thành',
    items: [
      { partId: 'PT001', partName: 'Lọc dầu động cơ', quantity: 1, price: 350000, total: 350000 },
    ],
    note: 'Thay dầu động cơ cho xe Toyota Camry',
    createdBy: 'Nguyễn Văn D',
    createdAt: '2024-01-15 10:30:00',
  },
  {
    id: 'XK002',
    serviceId: 'SV002',
    serviceName: 'Bảo dưỡng định kỳ',
    customer: 'Trần Thị B',
    staffId: 'NV002',
    staffName: 'Trần Thị E',
    exportDate: '2024-01-20',
    purpose: 'Dịch vụ',
    totalAmount: 120000,
    status: 'Hoàn thành',
    items: [
      { partId: 'PT002', partName: 'Bugi đánh lửa', quantity: 4, price: 120000, total: 480000 },
    ],
    note: 'Bảo dưỡng định kỳ cho xe Honda Civic',
    createdBy: 'Trần Thị E',
    createdAt: '2024-01-20 14:15:00',
  },
  {
    id: 'XK003',
    serviceId: null,
    serviceName: null,
    customer: null,
    staffId: 'NV003',
    staffName: 'Lê Văn F',
    exportDate: '2024-01-22',
    purpose: 'Kiểm tra',
    totalAmount: 250000,
    status: 'Đang xử lý',
    items: [
      { partId: 'PT004', partName: 'Bộ lọc gió động cơ', quantity: 1, price: 250000, total: 250000 },
    ],
    note: 'Kiểm tra chất lượng phụ tùng',
    createdBy: 'Lê Văn F',
    createdAt: '2024-01-22 09:00:00',
  },
];

const exportPurposes = [
  'Dịch vụ',
  'Kiểm tra',
  'Bảo hành',
  'Đổi trả',
  'Khác'
];

export default function ExportPage() {
  const [showForm, setShowForm] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [selectedStaff, setSelectedStaff] = useState('');
  const [exportDate, setExportDate] = useState('');
  const [purpose, setPurpose] = useState('Dịch vụ');
  const [note, setNote] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [purposeFilter, setPurposeFilter] = useState('all');

  const addItem = () => {
    setSelectedItems([...selectedItems, {
      partId: '',
      quantity: 1,
      price: 0,
      total: 0
    }]);
  };

  const removeItem = (index) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };

  const updateItem = (index, field, value) => {
    const newItems = [...selectedItems];
    newItems[index] = { ...newItems[index], [field]: value };
    
    // Tính lại tổng tiền
    if (field === 'quantity' || field === 'price') {
      const quantity = field === 'quantity' ? value : newItems[index].quantity;
      const price = field === 'price' ? value : newItems[index].price;
      newItems[index].total = quantity * price;
    }
    
    setSelectedItems(newItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement save logic
    alert('Phiếu xuất đã được tạo thành công!');
    setShowForm(false);
    setSelectedItems([]);
    setSelectedService('');
    setSelectedStaff('');
    setExportDate('');
    setPurpose('Dịch vụ');
    setNote('');
  };

  const filteredOrders = mockExportOrders.filter(order => {
    const matchKeyword = order.id.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                        (order.serviceName && order.serviceName.toLowerCase().includes(searchKeyword.toLowerCase())) ||
                        (order.customer && order.customer.toLowerCase().includes(searchKeyword.toLowerCase()));
    const matchStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchPurpose = purposeFilter === 'all' || order.purpose === purposeFilter;
    return matchKeyword && matchStatus && matchPurpose;
  });

  return (
    <div className="flex flex-row w-full">
      <SidebarInventoryManager />
      <div className="flex flex-col w-full">
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b bg-white shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Xuất Kho Phụ Tùng</h1>
              <p className="text-sm text-gray-600">Quản lý phiếu xuất kho và tra cứu lịch sử</p>
            </div>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="button primary"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Tạo Phiếu Xuất
          </button>
        </div>

        {/* Main Content */}
        <div className="p-8">
          {/* Search and Filter */}
          <div className="bg-white rounded-lg border p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tìm kiếm</label>
                <input
                  type="text"
                  placeholder="Tìm theo mã phiếu, dịch vụ, khách hàng..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
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
                  <option value="Hoàn thành">Hoàn thành</option>
                  <option value="Đang xử lý">Đang xử lý</option>
                  <option value="Đã hủy">Đã hủy</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mục đích</label>
                <select
                  value={purposeFilter}
                  onChange={(e) => setPurposeFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">Tất cả mục đích</option>
                  {exportPurposes.map(purpose => (
                    <option key={purpose} value={purpose}>{purpose}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchKeyword('');
                    setStatusFilter('all');
                    setPurposeFilter('all');
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

          {/* Export Orders List */}
          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mã phiếu
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dịch vụ/Khách hàng
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nhân viên
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ngày xuất
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mục đích
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tổng tiền
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
                  {filteredOrders.map(order => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {order.id}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {order.serviceName ? (
                          <div>
                            <div className="font-medium">{order.serviceName}</div>
                            <div className="text-xs text-gray-500">{order.customer}</div>
                          </div>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {order.staffName}
                      </td>
                      <td className="px-4 py-3 text-sm text-center text-gray-900">
                        {order.exportDate}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          order.purpose === 'Dịch vụ' ? 'bg-blue-100 text-blue-700' :
                          order.purpose === 'Kiểm tra' ? 'bg-yellow-100 text-yellow-700' :
                          order.purpose === 'Bảo hành' ? 'bg-green-100 text-green-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {order.purpose}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">
                        {order.totalAmount.toLocaleString('vi-VN')} ₫
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          order.status === 'Hoàn thành' ? 'bg-green-100 text-green-700' :
                          order.status === 'Đang xử lý' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button className="button button-info button-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Xem
                          </button>
                          <button className="button button-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            In
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Export Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Tạo Phiếu Xuất Mới</h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Dịch vụ</label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Chọn dịch vụ (tùy chọn)</option>
                      {mockServices.map(service => (
                        <option key={service.id} value={service.id}>
                          {service.name} - {service.customer}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nhân viên *</label>
                    <select
                      value={selectedStaff}
                      onChange={(e) => setSelectedStaff(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Chọn nhân viên</option>
                      {mockStaff.map(staff => (
                        <option key={staff.id} value={staff.id}>
                          {staff.name} - {staff.role}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ngày xuất *</label>
                    <input
                      type="date"
                      value={exportDate}
                      onChange={(e) => setExportDate(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mục đích *</label>
                    <select
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {exportPurposes.map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ghi chú</label>
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Ghi chú về phiếu xuất..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Items */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Danh sách phụ tùng</h3>
                    <button
                      type="button"
                      onClick={addItem}
                      className="button button-success button-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Thêm phụ tùng
                    </button>
                  </div>

                  <div className="space-y-4">
                    {selectedItems.map((item, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phụ tùng *</label>
                          <select
                            value={item.partId}
                            onChange={(e) => {
                              const part = mockParts.find(p => p.id === e.target.value);
                              updateItem(index, 'partId', e.target.value);
                              if (part) {
                                updateItem(index, 'price', part.price);
                              }
                            }}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Chọn phụ tùng</option>
                            {mockParts.map(part => (
                              <option key={part.id} value={part.id}>
                                {part.name} ({part.id}) - Còn: {part.stockQuantity}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Số lượng *</label>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
                            min="1"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Đơn giá</label>
                          <input
                            type="number"
                            value={item.price}
                            onChange={(e) => updateItem(index, 'price', parseInt(e.target.value) || 0)}
                            min="0"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Thành tiền</label>
                          <input
                            type="text"
                            value={item.total.toLocaleString('vi-VN')}
                            readOnly
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                          />
                        </div>
                        <div className="flex items-end">
                          <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="button button-danger button-sm"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Xóa
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total */}
                {selectedItems.length > 0 && (
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      Tổng tiền: {selectedItems.reduce((sum, item) => sum + item.total, 0).toLocaleString('vi-VN')} ₫
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="button"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="button primary"
                    disabled={selectedItems.length === 0}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Tạo phiếu xuất
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 