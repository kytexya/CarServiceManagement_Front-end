import Pagination from '@/components/common/pagination';
import IconEdit from '@/components/icons/IconEdit';
import IconEye from '@/components/icons/IconEye';
import { showError, showSuccess } from '@/utils';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ServiceOrders = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [serviceOrders, setServiceOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('carserv-token');
  const [sortOption, setSortOption] = useState("Mới nhất");
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    pageSize: 10,
  });

  useEffect(() => {
    const fetchServiceOrders = async (page = 1) => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/Appointment?currentPage=${page}&pageSize=${pagination.pageSize}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'anyvalue',
          },
          withCredentials: true
        });
        const mapped = res.data.items?.map(order => ({
          id: order.orderId,
          appointmentId: order.appointmentId,
          plateNumber: order.vehicleLicensePlate || 'N/A',
          customerName: order.customerName || 'N/A',
          phone: order.customerPhone || 'N/A',
          service: order.services.join(", ") || 'N/A',
          status: order.status || 'pending',
          assignedTo: order.assignedTo || 'Chưa phân công',
          createdAt: formatDate(order.appointmentDate),
        })) || [];
        setServiceOrders(mapped);
        setPagination((prev) => ({
          ...prev,
          totalItems: res.data.totalItems,
          totalPages: res.data.totalPages,
          currentPage: res.data.currentPage,
          pageSize: res.data.pageSize,
        }));
      } catch (err) {
        showError("Không tải được danh sách dịch vụ");
      } finally {
        setLoading(false);
      }
    };

    fetchServiceOrders(pagination.currentPage);
  }, [pagination.currentPage]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleString("vi-VN", {
      hour12: false
    });
  };

  const STATUS = {
    Booked: { color: "bg-yellow-100 text-yellow-800", text: "Đã đặt" },
    "Vehicle Received": { color: "bg-amber-100 text-amber-800", text: "Đã nhận xe" },
    "In Service": { color: "bg-blue-100 text-blue-800", text: "Đang thực hiện" },
    Completed: { color: "bg-green-100 text-green-800", text: "Hoàn thành" },
    Canceled: { color: "bg-red-100 text-red-800", text: "Đã hủy" },
  }

  const getStatusBadge = (status) => {
    const config = STATUS[status] || STATUS.pending;
    
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

  const sortOrders = (orders) => {
    switch (sortOption) {
      case "Mới nhất":
        return [...orders].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "Cũ nhất":
        return [...orders].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      case "Theo tên khách hàng":
        return [...orders].sort((a, b) =>
          a.customerName.localeCompare(b.customerName, "vi", { sensitivity: "base" })
        );
      case "Theo biển số xe":
        return [...orders].sort((a, b) =>
          a.plateNumber.localeCompare(b.plateNumber, "vi", { sensitivity: "base" })
        );
      default:
        return orders;
    }
  };

  const sortedOrders = sortOrders(filteredOrders);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [appStatus, setAppStatus] = useState("");

  const handleOpenPopup = (order) => {
    setSelectedOrder(order);
    setAppStatus(order.status);
    setShowPopup(true);
  };

  const handleConfirmStatus = async () => {
    try {
      await axios.put(
        "/api/Part/updateServiceProgress",
        {
          appointmentId: selectedOrder.appointmentId,
          status: appStatus,
          note: "",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "anyvalue",
          },
          withCredentials: true,
        }
      );
      setShowPopup(false);

      setServiceOrders((prev) =>
        prev.map((order) =>
          order.appointmentId === selectedOrder.appointmentId ? { ...order, status: appStatus } : order
        )
      );
      showSuccess("cập nhật trạng thái thành công");
    } catch (err) {
      showError("Không thể cập nhật trạng thái");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Danh sách lịch hẹn</h1>
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
            <select 
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}>
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
              {sortedOrders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50">
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
                      <button
                        onClick={() => handleOpenPopup(order)}
                        className="rounded-full p-2 hover:bg-green-100 transition-colors text-green-600"
                      >
                        <IconEdit />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination */}
      {pagination.totalItems > 0 && sortedOrders.length > 0 && (
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
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Cập nhật trạng thái</h2>
            <div className="space-y-2">
              {Object.entries(STATUS).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => setAppStatus(key)}
                  className={`w-full flex justify-between items-center px-4 py-2 border rounded-lg text-left ${
                    appStatus === key
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {/* <span>{config.text}</span> */}
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full ${config.color}`}
                  >
                    {config.text}
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmStatus}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceOrders;