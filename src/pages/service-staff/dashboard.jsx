import React, { useEffect, useState } from 'react';
import axios from "axios";
import moment from 'moment';

const ENV = import.meta.env.VITE_API_BASE_URL;
const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [statusStats, setStatusStats] = useState([]);
  const [topServices, setTopServices] = useState([]);
  const [recentServices, setRecentServices] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("carserv-token");

    const fetchData = async () => {
      try {
        const [summaryRes, statusRes, topRes, recentRes] = await Promise.all([
          axios.get(`/api/services/generate-services-revenue-report-sum`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'ngrok-skip-browser-warning': 'anyvalue',
            },
            withCredentials: true,
          }),
          axios.get(`/api/Vehicle`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'ngrok-skip-browser-warning': 'anyvalue',
            },
            withCredentials: true,
          }),
          axios.get(`/api/services/get-top-used-services`, {
            headers: { 
              Authorization: `Bearer ${token}`,
              'ngrok-skip-browser-warning': 'anyvalue',
            },
            withCredentials: true,
          }),
          axios.get(`/api/services/get-most-recent-services`, {
            headers: { 
              Authorization: `Bearer ${token}`,
              'ngrok-skip-browser-warning': 'anyvalue',
            },
            withCredentials: true,
          }),
        ]);

        setSummary(summaryRes.data);
        setStatusStats(statusRes.data);
        setTopServices(topRes.data);
        setRecentServices(recentRes.data);
      } catch (error) {
        console.error("Lỗi tải dashboard:", error);
      }
    };

    fetchData();
  }, []);

  function getTotalHours(timespan) {
    if (!timespan) return 0;
    const [dayPart, timePart] = timespan.split(".");
    const days = parseInt(dayPart, 10);
    const [hours] = timePart.split(":").map(Number);
    return days * 24 + hours;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      {/* Thống kê tổng quan */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg border p-6 shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Dịch vụ chờ xử lý</p>
              <p className="text-2xl font-bold text-gray-900">{statusStats.filter(i => i.status === "pending" || i.status === null).length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border p-6 shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Xe đã hoàn thành</p>
              <p className="text-2xl font-bold text-gray-900">{statusStats.filter(i => i.status === "Completed").length}</p>
            </div>
          </div>
        </div>
        {/* <div className="bg-white rounded-lg border p-6 shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-amber-100">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Hiệu suất làm việc</p>
              <p className="text-2xl font-bold text-gray-900">85%</p>
            </div>
          </div>
        </div> */}
        <div className="bg-white rounded-lg border p-6 shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Doanh thu hôm nay</p>
              <p className="text-2xl font-bold text-gray-900">{summary?.[0].totalRevenue}M</p>
            </div>
          </div>
        </div>
      </div>
      {/* Biểu đồ và thống kê chi tiết */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg border p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Dịch vụ theo trạng thái</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Đang chờ</span>
              <span className="text-sm font-medium">{statusStats.filter(i => i.status === "pending" || i.status === null).length} xe</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-amber-500 h-2 rounded-full" style={{
                width: `${(statusStats.filter(i => i.status === "Vehicle Received" || i.status === null).length / statusStats.length) * 100
                  }%`
              }}></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Đang sửa</span>
              <span className="text-sm font-medium">{statusStats.filter(i => i.status === "In Service").length} xe</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{
                width: `${(statusStats.filter(i => i.status === "process").length / statusStats.length) * 100
                  }%`
              }}></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Hoàn thành</span>
              <span className="text-sm font-medium">{statusStats.filter(i => i.status === "Completed").length} xe</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{
                width: `${(statusStats.filter(i => i.status === "complete").length / statusStats.length) * 100
                  }%`
              }}></div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Top dịch vụ phổ biến</h3>
          <div className="space-y-3">
            {topServices?.map(item => {
                return (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-sm text-gray-600">{item.useCount} lần</span>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
      {/* Dịch vụ gần đây */}
      <div className="bg-white rounded-lg border p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Dịch vụ gần đây</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Biển số xe</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dịch vụ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời gian</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentServices?.map(item => {
                return (
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.vehicleLicensePlate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full  
                        ${item.status === 'Completed' ? 'bg-green-100 text-green-800' : item.status === 'In Service' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getTotalHours(item.timeSinceServiced)} giờ trước</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;