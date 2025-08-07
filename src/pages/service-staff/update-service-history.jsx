import React, { useState } from 'react';

const UpdateServiceHistory = () => {
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [serviceItems, setServiceItems] = useState([
    { id: 1, name: 'Thay dầu nhớt', status: 'completed', time: '30 phút', parts: ['Dầu nhớt 5W-30', 'Lọc dầu'], notes: 'Đã thay dầu và lọc dầu theo định kỳ' },
    { id: 2, name: 'Kiểm tra phanh', status: 'completed', time: '45 phút', parts: ['Má phanh'], notes: 'Phanh hoạt động tốt, đã thay má phanh mới' },
    { id: 3, name: 'Thay lốp xe', status: 'in-progress', time: '60 phút', parts: ['Lốp xe 205/55R16'], notes: 'Đang thay lốp xe trước bên phải' }
  ]);

  const [newItem, setNewItem] = useState({
    name: '',
    status: 'pending',
    time: '',
    parts: '',
    notes: ''
  });

  const vehicles = [
    { id: 1, plateNumber: '30A-12345', customerName: 'Nguyễn Văn A', model: 'Toyota Vios 2020' },
    { id: 2, plateNumber: '51B-67890', customerName: 'Trần Thị B', model: 'Honda City 2021' },
    { id: 3, plateNumber: '29C-11111', customerName: 'Lê Văn C', model: 'Ford Ranger 2019' }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', text: 'Chờ thực hiện' },
      'in-progress': { color: 'bg-blue-100 text-blue-800', text: 'Đang thực hiện' },
      completed: { color: 'bg-green-100 text-green-800', text: 'Hoàn thành' },
      cancelled: { color: 'bg-red-100 text-red-800', text: 'Đã hủy' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${config.color}`}>
        {config.text}
      </span>
    );
  };

  const addServiceItem = () => {
    if (newItem.name && newItem.time) {
      const item = {
        id: Date.now(),
        ...newItem,
        parts: newItem.parts.split(',').map(part => part.trim()).filter(part => part)
      };
      setServiceItems([...serviceItems, item]);
      setNewItem({ name: '', status: 'pending', time: '', parts: '', notes: '' });
    }
  };

  const updateItemStatus = (id, status) => {
    setServiceItems(serviceItems.map(item => 
      item.id === id ? { ...item, status } : item
    ));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Cập nhật lịch sử sửa chữa</h1>

      {/* Chọn xe */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Chọn xe cần cập nhật</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Biển số xe</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedVehicle}
              onChange={(e) => setSelectedVehicle(e.target.value)}
            >
              <option value="">Chọn biển số xe</option>
              {vehicles.map(vehicle => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.plateNumber} - {vehicle.customerName}
                </option>
              ))}
            </select>
          </div>
          
          {selectedVehicle && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Khách hàng</label>
                <input
                  type="text"
                  value={vehicles.find(v => v.id == selectedVehicle)?.customerName || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Model xe</label>
                <input
                  type="text"
                  value={vehicles.find(v => v.id == selectedVehicle)?.model || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  readOnly
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Thêm hạng mục mới */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Thêm hạng mục sửa chữa</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tên hạng mục</label>
            <input
              type="text"
              placeholder="VD: Thay dầu nhớt"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newItem.name}
              onChange={(e) => setNewItem({...newItem, name: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Thời gian thực hiện</label>
            <input
              type="text"
              placeholder="VD: 30 phút"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newItem.time}
              onChange={(e) => setNewItem({...newItem, time: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phụ tùng sử dụng</label>
            <input
              type="text"
              placeholder="VD: Dầu nhớt, Lọc dầu"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newItem.parts}
              onChange={(e) => setNewItem({...newItem, parts: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ghi chú</label>
            <input
              type="text"
              placeholder="Ghi chú kỹ thuật"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newItem.notes}
              onChange={(e) => setNewItem({...newItem, notes: e.target.value})}
            />
          </div>
        </div>
        
        <div className="mt-4">
          <button
            onClick={addServiceItem}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Thêm hạng mục
          </button>
        </div>
      </div>

      {/* Danh sách hạng mục đã thực hiện */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Danh sách hạng mục đã thực hiện</h3>
        
        <div className="space-y-4">
          {serviceItems.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <h4 className="text-lg font-medium text-gray-900">{item.name}</h4>
                  {getStatusBadge(item.status)}
                </div>
                <div className="flex space-x-2">
                  <select
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                    value={item.status}
                    onChange={(e) => updateItemStatus(item.id, e.target.value)}
                  >
                    <option value="pending">Chờ thực hiện</option>
                    <option value="in-progress">Đang thực hiện</option>
                    <option value="completed">Hoàn thành</option>
                    <option value="cancelled">Đã hủy</option>
                  </select>
                  <button className="text-red-600 hover:text-red-900">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Thời gian:</span>
                  <span className="ml-2 text-gray-600">{item.time}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Phụ tùng:</span>
                  <div className="mt-1">
                    {item.parts.map((part, index) => (
                      <span key={index} className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs mr-1 mb-1">
                        {part}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Ghi chú:</span>
                  <p className="mt-1 text-gray-600">{item.notes}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nút lưu */}
      <div className="mt-6 flex justify-end space-x-4">
        <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
          Hủy
        </button>
        <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">
          Lưu vào hồ sơ xe
        </button>
      </div>
    </div>
  );
};

export default UpdateServiceHistory;