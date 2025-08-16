import React, { useState } from 'react';

const NotifyCustomer = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [message, setMessage] = useState('');
  const [notificationHistory, setNotificationHistory] = useState([
    {
      id: 1,
      customerName: 'Nguyễn Văn A',
      plateNumber: '30A-12345',
      type: 'received',
      message: 'Xe của bạn đã được nhận và đang kiểm tra.',
      sentAt: '2024-01-15 10:30',
      status: 'sent'
    },
    {
      id: 2,
      customerName: 'Trần Thị B',
      plateNumber: '51B-67890',
      type: 'in-progress',
      message: 'Xe của bạn đang được sửa chữa, dự kiến hoàn thành trong 2 giờ.',
      sentAt: '2024-01-15 11:15',
      status: 'sent'
    },
    {
      id: 3,
      customerName: 'Lê Văn C',
      plateNumber: '29C-11111',
      type: 'completed',
      message: 'Xe của bạn đã hoàn thành sửa chữa, vui lòng đến nhận xe.',
      sentAt: '2024-01-15 14:20',
      status: 'sent'
    }
  ]);

  const customers = [
    { id: 1, name: 'Nguyễn Văn A', phone: '0123456789', plateNumber: '30A-12345' },
    { id: 2, name: 'Trần Thị B', phone: '0987654321', plateNumber: '51B-67890' },
    { id: 3, name: 'Lê Văn C', phone: '0555666777', plateNumber: '29C-11111' }
  ];

  const templates = [
    {
      id: 'received',
      title: 'Đã nhận xe',
      message: 'Xe của bạn đã được nhận và đang kiểm tra. Chúng tôi sẽ thông báo kết quả sớm nhất.'
    },
    {
      id: 'in-progress',
      title: 'Đang sửa chữa',
      message: 'Xe của bạn đang được sửa chữa, dự kiến hoàn thành trong {time}. Chúng tôi sẽ thông báo khi xong.'
    },
    {
      id: 'completed',
      title: 'Đã hoàn tất',
      message: 'Xe của bạn đã hoàn thành sửa chữa, vui lòng đến nhận xe tại garage.'
    },
    {
      id: 'delay',
      title: 'Cần thêm thời gian',
      message: 'Do phát hiện thêm vấn đề, xe của bạn cần thêm thời gian để sửa chữa. Dự kiến hoàn thành lúc {time}.'
    }
  ];

  const getTypeBadge = (type) => {
    const typeConfig = {
      received: { color: 'bg-blue-100 text-blue-800', text: 'Đã nhận xe' },
      'in-progress': { color: 'bg-yellow-100 text-yellow-800', text: 'Đang sửa' },
      completed: { color: 'bg-green-100 text-green-800', text: 'Hoàn thành' },
      delay: { color: 'bg-orange-100 text-orange-800', text: 'Chậm trễ' }
    };
    
    const config = typeConfig[type] || typeConfig.received;
    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${config.color}`}>
        {config.text}
      </span>
    );
  };

  const handleTemplateChange = (templateId) => {
    setSelectedTemplate(templateId);
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setMessage(template.message);
    }
  };

  const handleSendNotification = () => {
    if (selectedCustomer && message) {
      const customer = customers.find(c => c.id == selectedCustomer);
      const template = templates.find(t => t.id === selectedTemplate);
      
      const newNotification = {
        id: notificationHistory.length + 1,
        customerName: customer.name,
        plateNumber: customer.plateNumber,
        type: selectedTemplate,
        message: message,
        sentAt: new Date().toLocaleString('vi-VN'),
        status: 'sent'
      };
      
      setNotificationHistory([newNotification, ...notificationHistory]);
      
      // Reset form
      setSelectedCustomer('');
      setSelectedTemplate('');
      setMessage('');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Thông báo dịch vụ</h1>

      {/* Form gửi thông báo */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Gửi thông báo nhanh</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Chọn khách hàng</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
            >
              <option value="">Chọn khách hàng</option>
              {customers.map(customer => (
                <option key={customer.id} value={customer.id}>
                  {customer.name} - {customer.plateNumber}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Loại thông báo</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedTemplate}
              onChange={(e) => handleTemplateChange(e.target.value)}
            >
              <option value="">Chọn loại thông báo</option>
              {templates.map(template => (
                <option key={template.id} value={template.id}>
                  {template.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung thông báo</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Nhập nội dung thông báo..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={handleSendNotification}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Gửi thông báo
          </button>
          <button
            onClick={() => {
              setSelectedCustomer('');
              setSelectedTemplate('');
              setMessage('');
            }}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Xóa form
          </button>
        </div>
      </div>

      {/* Template có sẵn */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Template thông báo có sẵn</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map(template => (
            <div key={template.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{template.title}</h4>
                <button
                  onClick={() => handleTemplateChange(template.id)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Sử dụng
                </button>
              </div>
              <p className="text-sm text-gray-600">{template.message}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Lịch sử thông báo */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Lịch sử thông báo đã gửi</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khách hàng</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Biển số xe</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loại thông báo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nội dung</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời gian gửi</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {notificationHistory.map((notification) => (
                <tr key={notification.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {notification.customerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {notification.plateNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getTypeBadge(notification.type)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {notification.message}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {notification.sentAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Đã gửi
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NotifyCustomer;