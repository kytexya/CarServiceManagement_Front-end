import { showError } from '@/utils';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

const UsedPartsManagement = () => {
  const [parts, setParts] = useState([
    { id: 1, name: 'Lọc dầu', code: 'LD001', quantityUsed: 2, unit: 'cái', serviceOrder: 'SO001', date: '2024-01-15' },
    { id: 2, name: 'Dầu nhớt 5W-30', code: 'DN002', quantityUsed: 10, unit: 'lít', serviceOrder: 'SO002', date: '2024-01-15' },
    { id: 3, name: 'Má phanh trước', code: 'MP003', quantityUsed: 1, unit: 'bộ', serviceOrder: 'SO003', date: '2024-01-16' },
    { id: 4, name: 'Lốp xe 205/55R16', code: 'LX004', quantityUsed: 2, unit: 'cái', serviceOrder: 'SO004', date: '2024-01-16' },
  ]);

  const [newPart, setNewPart] = useState({
    name: '',
    code: '',
    quantityUsed: '',
    unit: '',
    serviceOrder: '',
    date: new Date().toISOString().slice(0, 10),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPart({ ...newPart, [name]: value });
  };

  const handleAddPart = () => {
    if (newPart.name && newPart.code && newPart.quantityUsed && newPart.unit && newPart.serviceOrder) {
      setParts([...parts, { ...newPart, id: parts.length + 1 }]);
      setNewPart({
        name: '',
        code: '',
        quantityUsed: '',
        unit: '',
        serviceOrder: '',
        date: new Date().toISOString().slice(0, 10),
      });
    }
  };

  const token = localStorage.getItem("carserv-token");
  const headers = { Authorization: `Bearer ${token}`, 'ngrok-skip-browser-warning': 'anyvalue' };

  const onAddPart = async () => {
    if (newPart.name && newPart.code && newPart.quantityUsed && newPart.unit && newPart.serviceOrder) {
      try {
        const res = await axios.post("/api/used-parts", newPart, { headers });
        setParts([...parts, res.data]); // res.data là object phụ tùng vừa thêm
        showSuccess("Thêm phụ tùng thành công");
        setNewPart({
          name: '',
          code: '',
          quantityUsed: '',
          unit: '',
          serviceOrder: '',
          date: new Date().toISOString().slice(0, 10),
        });
      } catch (err) {
        showError("Không thể thêm phụ tùng");
      }
    }
  };

  useEffect(() => {
    const fetchParts = async () => {
      try {
        const res = await axios.get(`/api/Parts/used-parts`, { headers });
        setParts(res.data || []);
      } catch (err) {
        showError("Không tải được danh sách phụ tùng đã sử dụng");
      }
    };
    fetchParts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Quản lý phụ tùng đã sử dụng</h1>

      {/* Form thêm phụ tùng đã sử dụng */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Thêm phụ tùng đã sử dụng</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="partName" className="block text-sm font-medium text-gray-700">Tên phụ tùng</label>
            <input
              type="text"
              id="partName"
              name="name"
              value={newPart.name}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Ví dụ: Lọc dầu"
            />
          </div>
          <div>
            <label htmlFor="partCode" className="block text-sm font-medium text-gray-700">Mã phụ tùng</label>
            <input
              type="text"
              id="partCode"
              name="code"
              value={newPart.code}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Ví dụ: LD001"
            />
          </div>
          <div>
            <label htmlFor="quantityUsed" className="block text-sm font-medium text-gray-700">Số lượng sử dụng</label>
            <input
              type="number"
              id="quantityUsed"
              name="quantityUsed"
              value={newPart.quantityUsed}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Ví dụ: 2"
            />
          </div>
          <div>
            <label htmlFor="unit" className="block text-sm font-medium text-gray-700">Đơn vị</label>
            <input
              type="text"
              id="unit"
              name="unit"
              value={newPart.unit}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Ví dụ: cái, lít"
            />
          </div>
          <div>
            <label htmlFor="serviceOrder" className="block text-sm font-medium text-gray-700">Mã phiếu dịch vụ</label>
            <input
              type="text"
              id="serviceOrder"
              name="serviceOrder"
              value={newPart.serviceOrder}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Ví dụ: SO001"
            />
          </div>
        </div>
        <button
          onClick={handleAddPart}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Thêm phụ tùng
        </button>
      </div>

      {/* Bảng danh sách phụ tùng đã sử dụng */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Danh sách phụ tùng đã sử dụng</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên phụ tùng</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã phụ tùng</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượng sử dụng</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Đơn vị</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã phiếu dịch vụ</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày sử dụng</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {parts.map((part) => (
                <tr key={part.partId}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{part.partName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{part.partID}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{part.quantityUsed}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{part.unit}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{part.serviceID}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{moment(part.lastUsed).format('YYYY-MM-DD')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Chức năng cảnh báo tồn kho sẽ được tích hợp với API backend */}
        <p className="mt-4 text-sm text-gray-600">* Chức năng tự động trừ tồn kho và cảnh báo nếu thiếu sẽ được tích hợp khi có API backend.</p>
      </div>
    </div>
  );
};

export default UsedPartsManagement;