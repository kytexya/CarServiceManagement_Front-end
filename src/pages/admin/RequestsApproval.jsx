import Pagination from '@/components/common/pagination';
import IconEye from '@/components/icons/IconEye';
import { showError } from '@/utils';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const RequestsApproval = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    pageSize: 10,
  });
  const token = localStorage.getItem('carserv-token');
  const headers = { Authorization: `Bearer ${token}`, 'ngrok-skip-browser-warning': 'anyvalue' };

  // modal state
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    const fetchRequests = async (page = 1) => {
      try {
        const res = await axios.get(`/api/Schedule/dayoff/view-requests?currentPage=${page}&pageSize=${pagination.pageSize}`, {
          headers
        });

        const mapped = res.data?.map((r) => ({
          id: r.requestId,
          employeeName: r.staffName,
          date: r.requestedDate,
          reason: r.reason,
          status: r.status?.toLowerCase(),
          type: 'leave',
          createdAt: new Date(r.requestedAt).toLocaleString("vi-VN", { hour12: false }),
        })) || [];
        setRequests(mapped);
        setPagination((prev) => ({
          ...prev,
          totalItems: res.data.totalItems,
          totalPages: res.data.totalPages,
          currentPage: res.data.currentPage,
          pageSize: res.data.pageSize,
        }));
      } catch (err) {
        showError("Không tải được danh sách yêu cầu");
      }
    };

    fetchRequests(pagination.currentPage);
  }, [pagination.currentPage]);

  const openModal = (req) => {
    setSelectedRequest(req);
    setShowRequestModal(true);
  };

  const handleApprove = async (id) => {
    try {
      const payload = {
        status: 'Approved',
        adminNotes: '',
      };
      await axios.put(`/api/Schedule/dayoff/${id}/status`, payload , {
        headers
      });

      setShowRequestModal(false);
      window.location.reload();
    } catch (err) {
      showError("Duyệt thất bại");
    }
  };

  const handleReject = async (id) => {
    try {
      const payload = {
        status: 'Rejected',
        adminNotes: '',
      };
      await axios.put(`/api/Schedule/dayoff/${id}/status`, payload , {
        headers
      });

      setShowRequestModal(false);
      window.location.reload();
    } catch (err) {
      showError("Duyệt thất bại");
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      approved: { color: 'bg-green-100 text-green-800', text: 'Đã xác nhận' },
      pending: { color: 'bg-yellow-100 text-yellow-800', text: 'Chờ xác nhận' },
      rejected: { color: 'bg-red-100 text-red-800', text: 'Từ chối' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${config.color}`}>
        {config.text}
      </span>
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Danh sách yêu cầu nghỉ/đổi lịch</h1>

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nhân viên</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loại yêu cầu</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map(req => (
                <tr key={req.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm">{req.employeeName}</td>
                  <td className="px-6 py-4 text-sm">
                    {req.type === "leave" ? "Nghỉ phép" :
                     req.type === "shift_change" ? "Đổi ca" : "Đổi lịch"}
                  </td>
                  <td className="px-6 py-4 text-sm">{req.date}</td>
                  <td className="px-6 py-4 text-sm">{getStatusBadge(req.status)}</td>
                  <td className="px-6 py-4 text-sm">
                    <button 
                      onClick={() => openModal(req)}
                      className="rounded-full p-2 hover:bg-blue-100 text-blue-600 transition-colors"
                    >
                      <IconEye />
                    </button>
                  </td>
                </tr>
              ))}
              {requests.length === 0 && !loading && (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">Không có yêu cầu nào</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pagination.totalItems > 0 && (
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

      {/* Request Modal */}
      {showRequestModal && selectedRequest && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md shadow-lg p-6 w-96">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Chi tiết yêu cầu</h3>
            <div className="space-y-3">
              <div><strong>Nhân viên:</strong> {selectedRequest.employeeName}</div>
              <div><strong>Loại yêu cầu:</strong> 
                {selectedRequest.type === "leave" ? "Nghỉ phép" :
                 selectedRequest.type === "shift_change" ? "Đổi ca" : "Đổi lịch"}
              </div>
              <div><strong>Ngày:</strong> {selectedRequest.date}</div>
              <div><strong>Lý do:</strong> {selectedRequest.reason}</div>
              <div><strong>Trạng thái:</strong> {selectedRequest.status}</div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowRequestModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Đóng
              </button>
              <button 
                onClick={() => handleReject(selectedRequest.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Từ chối
              </button>
              <button 
                onClick={() => handleApprove(selectedRequest.id)}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Duyệt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestsApproval;
