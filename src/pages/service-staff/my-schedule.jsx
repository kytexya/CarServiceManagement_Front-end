import { showError, showSuccess } from '@/utils';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const MySchedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestType, setRequestType] = useState('leave');
  const [scheduleData, setScheduleData] = useState([]);
  const [requestDate, setRequestDate] = useState('');
  const [reason, setReason] = useState('');

  const token = localStorage.getItem("carserv-token");
  const headers = { Authorization: `Bearer ${token}`, 'ngrok-skip-browser-warning': 'anyvalue' };

  const fetchSchedule = async () => {
    try {
      const storedProfile = localStorage.getItem("carserv-profile");
      const parsedProfile = JSON.parse(storedProfile);
      const staffId = parsedProfile.userID ?? 0
      const res = await axios.get(`/api/Schedule/working-schedule/${staffId}`, {
        headers
      });
      setScheduleData(res.data || []);
    } catch (err) {
      showError("Không tải được lịch làm việc");
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

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

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days = [];
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 
                     'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];


  const getScheduleForDate = (date) => {
    if (!date || scheduleData.length === 0) return null;
    
    const jsDay = date.getDay();
    const apiDayOfWeek = jsDay === 0 ? 7 : jsDay;
    
    const schedule = scheduleData.find(s => s.dayOfWeek === apiDayOfWeek);
    if (!schedule || !schedule.isActive) return null;
    
    return {
      shift: `Ca làm việc (${schedule.startTime.slice(0, 5)} - ${schedule.endTime.slice(0, 5)})`,
      status: "confirmed",
      tasks: []
    };
  };

  const handleSendRequest = async () => {
    try {
      const storedProfile = localStorage.getItem("carserv-profile");
      const parsedProfile = JSON.parse(storedProfile);
      const staffId = parsedProfile.userID ?? 0;

      await axios.post(`/api/Schedule/dayoff/make-request/${staffId}`, {
        type: requestType,
        requestedDate: requestDate,
        reason: reason
      }, {
        headers
      });

      showSuccess("Gửi yêu cầu thành công!");
      setShowRequestModal(false);
      setRequestDate('');
      setReason('');
      fetchRequests(pagination.currentPage);
    } catch (err) {
      showError(err.response?.data?.message || "Không thể gửi yêu cầu");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Lịch làm việc cá nhân</h1>
        <div className="flex space-x-2">
          <button 
            onClick={() => setShowRequestModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Yêu cầu nghỉ phép
          </button>
          {/* <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
            Đổi lịch
          </button> */}
        </div>
      </div>

      {/* Calendar View */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Lịch làm việc tháng {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
          <div className="flex space-x-2">
            <button 
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
              className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
            >
              ←
            </button>
            <button 
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
              className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
            >
              →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
          
          {days.map((day, index) => {
            const schedule = day ? getScheduleForDate(day) : null;
            const isToday = day && day.toDateString() === new Date().toDateString();
            const isSelected = selectedDate && day && day.toDateString() === selectedDate.toDateString();
            
            return (
              <div
                key={index}
                className={`p-2 min-h-[80px] border border-gray-200 ${
                  isToday ? 'bg-blue-50 border-blue-300' : ''
                } ${isSelected ? 'bg-yellow-50 border-yellow-300' : ''} ${
                  day ? 'cursor-pointer hover:bg-gray-50' : ''
                }`}
                onClick={() => day && setSelectedDate(day)}
              >
                {day && (
                  <>
                    <div className="text-sm font-medium text-gray-900">{day.getDate()}</div>
                    {schedule && (
                      <div className="mt-1">
                        <div className="text-xs text-blue-600 font-medium">{schedule.shift}</div>
                        {/* {getStatusBadge(schedule.status)} */}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Chi tiết ngày được chọn */}
      {selectedDate && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">
            Chi tiết ngày {selectedDate.toLocaleDateString('vi-VN')}
          </h3>
          {getScheduleForDate(selectedDate) ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Ca làm việc:</span>
                <span>{getScheduleForDate(selectedDate).shift}</span>
              </div>
              <div>
                <span className="font-medium">Công việc:</span>
                <ul className="mt-2 space-y-1">
                  {getScheduleForDate(selectedDate).tasks.map((task, index) => (
                    <li key={index} className="text-sm text-gray-600">• {task}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Không có lịch làm việc cho ngày này.</p>
          )}
        </div>
      )}

      {/* Modal yêu cầu nghỉ phép */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Yêu cầu nghỉ phép/đổi lịch</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Loại yêu cầu</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={requestType}
                    onChange={(e) => setRequestType(e.target.value)}
                  >
                    <option value="leave">Nghỉ phép</option>
                    <option value="shift_change">Đổi ca</option>
                    <option value="schedule_change">Đổi lịch</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ngày</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={requestDate}
                    onChange={(e) => setRequestDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lý do</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows="3"
                    placeholder="Nhập lý do..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowRequestModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" onClick={handleSendRequest}>
                  Gửi yêu cầu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MySchedule;