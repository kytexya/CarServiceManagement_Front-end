import Pagination from '@/components/common/pagination';
import IconEdit from '@/components/icons/IconEdit';
import IconEye from '@/components/icons/IconEye';
import { STATUS_CONFIG } from '@/utils/constant';
import React, { useState } from 'react';

const ServiceOrders = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const serviceOrders = [
    {
      id: 1,
      plateNumber: '30A-12345',
      customerName: 'Nguyễn Văn A',
      phone: '0123456789',
      service: 'Thay dầu nhớt',
      status: 'pending',
      assignedTo: 'Nhân viên 1',
      createdAt: '2024-01-15 09:30',
      estimatedTime: '2 giờ'
    },
    {
      id: 2,
      plateNumber: '51B-67890',
      customerName: 'Trần Thị B',
      phone: '0987654321',
      service: 'Bảo dưỡng định kỳ',
      status: 'in-progress',
      assignedTo: 'Nhân viên 2',
      createdAt: '2024-01-15 08:15',
      estimatedTime: '4 giờ'
    },
    {
      id: 3,
      plateNumber: '29C-11111',
      customerName: 'Lê Văn C',
      phone: '0555666777',
      service: 'Thay lốp xe',
      status: 'completed',
      assignedTo: 'Nhân viên 1',
      createdAt: '2024-01-15 07:00',
      estimatedTime: '1 giờ'
    }
  ];

  const getStatusBadge = (status) => {
    const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
    
    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${config.color}`}>
        {config.text}
      </span>
    );
  };

  const filteredOrders = serviceOrders.filter(order => {
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesSearch = order.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.service.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Danh sách phiếu dịch vụ</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 font-semibold shadow transition-colors duration-200 flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Tạo phiếu mới
        </button>
      </div>
      {/* Filters */}
      <div className="bg-white rounded-lg border p-6 shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tìm kiếm</label>
            <input
              type="text"
              placeholder="Tìm theo biển số, tên khách hàng..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">Tất cả</option>
              <option value="pending">Chờ xử lý</option>
              <option value="in-progress">Đang sửa</option>
              <option value="completed">Hoàn thành</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sắp xếp</label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Mới nhất</option>
              <option>Cũ nhất</option>
              <option>Theo tên khách hàng</option>
              <option>Theo biển số xe</option>
            </select>
          </div>
        </div>
      </div>
      {/* Service Orders Table */}
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thông tin xe
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nhân viên
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thời gian
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{order.plateNumber}</div>
                      <div className="text-sm text-gray-500">{order.customerName}</div>
                      <div className="text-sm text-gray-500">{order.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {order.assignedTo}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {order.createdAt}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="rounded-full p-2 hover:bg-blue-100 transition-colors text-blue-600">
                        <IconEye />
                      </button>
                      <a href={`/service-staff/notify-customer/${order.id}`} className="rounded-full p-2 hover:bg-green-100 transition-colors text-green-600">
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

export default ServiceOrders;