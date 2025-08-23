import IconPackage from "@/components/icons/IconPackage";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import { Link } from "react-router-dom";

const mockData = [
  {
    partId: "PT001",
    partName: "Lọc dầu động cơ",
    stockQuantity: 5,
    price: 350000,
    supplier: "Toyota Long Biên",
    status: "Sắp hết",
    warranty: "2025-06-30",
    minThreshold: 10,
    monthlyUsage: 45,
    lastImported: "2024-01-15",
  },
  {
    partId: "PT002",
    partName: "Bugi đánh lửa",
    stockQuantity: 50,
    price: 120000,
    supplier: "Honda Việt Nam",
    status: "Còn hàng",
    warranty: "2026-01-15",
    minThreshold: 20,
    monthlyUsage: 120,
    lastImported: "2024-01-20",
  },
  {
    partId: "PT003",
    partName: "Dây curoa tổng",
    stockQuantity: 0,
    price: 800000,
    supplier: "Hyundai",
    status: "Hết hàng",
    warranty: "2024-12-01",
    minThreshold: 5,
    monthlyUsage: 8,
    lastImported: "2023-12-10",
  },
  {
    partId: "PT004",
    partName: "Bộ lọc gió động cơ",
    stockQuantity: 3,
    price: 250000,
    supplier: "Ford Việt Nam",
    status: "Sắp hết",
    warranty: "2025-03-15",
    minThreshold: 8,
    monthlyUsage: 25,
    lastImported: "2024-01-18",
  },
  {
    partId: "PT005",
    partName: "Bộ phanh trước",
    stockQuantity: 15,
    price: 1200000,
    supplier: "BMW Việt Nam",
    status: "Còn hàng",
    warranty: "2025-08-20",
    minThreshold: 12,
    monthlyUsage: 35,
    lastImported: "2024-01-22",
  },
];

// Icon component for low stock warning
const WarningIcon = () => (
  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
      clipRule="evenodd"
    />
  </svg>
);

// Icon component for out of stock warning
const OutOfStockIcon = () => (
  <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
      clipRule="evenodd"
    />
  </svg>
);

// Icon component for low stock warning (yellow)
const LowStockIcon = () => (
  <svg
    className="w-5 h-5 text-amber-600"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
      clipRule="evenodd"
    />
  </svg>
);

// Icon component for warranty warning
const WarrantyIcon = () => (
  <svg
    className="w-5 h-5 text-orange-600"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
      clipRule="evenodd"
    />
  </svg>
);

// Simple Bar Chart Component
const BarChart = ({ data, maxValue }) => {
  return (
    <div className="space-y-2">
      {data.map((item, index) => (
        <div key={item.partId} className="flex items-center gap-3">
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-gray-700">{item.partName}</span>
              <span className="text-gray-600">{item.monthlyUsage}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${index === 0
                  ? "bg-yellow-500"
                  : index === 1
                    ? "bg-gray-400"
                    : index === 2
                      ? "bg-orange-500"
                      : "bg-blue-500"
                  }`}
                style={{ width: `${(item.monthlyUsage / maxValue) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const RevenueLineChart = () => {
  // giả sử có doanh thu 30 ngày trong 1 tháng
  const labels = Array.from({ length: 30 }, (_, i) => `${i + 1}`);
  const revenueData = [
    120, 150, 200, 180, 250, 300, 280, 400, 350, 500, 450, 470, 490, 520, 600,
    580, 610, 630, 700, 750, 720, 680, 660, 690, 710, 750, 770, 800, 820, 850,
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Doanh thu (VNĐ x 1000)",
        data: revenueData,
        fill: false,
        borderColor: "rgb(37, 99, 235)", // màu xanh dương
        backgroundColor: "rgba(37, 99, 235, 0.5)",
        tension: 0.3, // độ cong của line
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Biểu đồ Doanh thu theo ngày trong tháng",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => value + "k",
        },
      },
    },
  };

  return <Line height={100} data={data} options={options} />;
};

export default function DashboardPage() {
  const [dataList] = useState(mockData);
  const [parts, setParts] = useState([]);
  const [lowParts, setLowParts] = useState([]);
  const [outOfStockParts, setOutOfStockParts] = useState([]);
  const token = localStorage.getItem("carserv-token");

  useEffect(() => {
    fetchParts()
    fetchLowParts()
    fetchOutOfStockParts()
  }, []);


  const fetchParts = async () => {
    try {
      const res = await axios.get("/api/Parts", {
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'anyvalue',
        },
        withCredentials: true
      });
      setParts(res.data || []);
    } catch (err) {
      showError("Không tải được danh sách phụ tùng");
    }
  }
  const fetchLowParts = async () => {
    try {
      const res = await axios.get("/api/Parts/get-low-parts", {
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'anyvalue',
        },
        withCredentials: true
      });
      setLowParts(res.data || []);
    } catch (err) {
      showError("Không tải được danh sách phụ tùng");
    }
  }
  const fetchOutOfStockParts = async () => {
    try {
      const res = await axios.get("/api/Parts/get-out-of-stock-parts", {
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'anyvalue',
        },
        withCredentials: true
      });
      setOutOfStockParts(res.data || []);
    } catch (err) {
      showError("Không tải được danh sách phụ tùng");
    }
  }

  const inventoryStats = useMemo(() => {
    if (!parts || parts.length === 0) {
      return {
        totalItems: 0,
        lowStock: 0,
        outOfStock: 0,
        expiringSoon: 0,
        totalValue: "0 VND"
      };
    }

    const soonThreshold = new Date();
    soonThreshold.setMonth(soonThreshold.getMonth() + 1);

    let expiringSoon = 0;
    let totalValue = 0;

    parts.forEach(part => {
      totalValue += (part.unitPrice || 0) * (part.quantity || 0);

      if (part.expiryDate && new Date(part.expiryDate) <= soonThreshold) {
        expiringSoon++;
      }
    });

    return {
      totalItems: parts.length,
      lowStock: lowParts.length,
      outOfStock: outOfStockParts.length,
      expiringSoon,
      totalValue: totalValue.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
    };
  }, [parts, lowParts, outOfStockParts]);

  // Count different stock statuses
  const lowStockCount = dataList.filter(
    (item) => item.stockQuantity <= item.minThreshold && item.stockQuantity > 0
  ).length;
  const outOfStockCount = dataList.filter(
    (item) => item.stockQuantity === 0
  ).length;

  // Calculate total inventory value
  const totalInventoryValue = dataList.reduce(
    (sum, item) => sum + item.stockQuantity * item.price,
    0
  );

  // Get recently imported parts (last 7 days)
  const recentlyImported = dataList.filter((item) => {
    const importDate = new Date(item.lastImported);
    const currentDate = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(currentDate.getDate() - 7);
    return importDate >= sevenDaysAgo;
  });

  // Get top used parts (sorted by monthly usage)
  const topUsedParts = [...dataList]
    .sort((a, b) => b.monthlyUsage - a.monthlyUsage)
    .slice(0, 5);

  // Get max usage for chart scaling
  const maxUsage = Math.max(...topUsedParts.map((part) => part.monthlyUsage));

  // Check warranty expiration (within 3 months)
  const warrantyWarnings = dataList.filter((item) => {
    const warrantyDate = new Date(item.warranty);
    const currentDate = new Date();
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(currentDate.getMonth() + 3);
    return warrantyDate <= threeMonthsFromNow && warrantyDate > currentDate;
  });

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <div className="flex justify-between items-center px-8 py-6 border-b bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Dashboard Tồn Kho
            </h1>
            <p className="text-sm text-gray-600">
              Tổng quan nhanh về tình trạng kho phụ tùng
            </p>
          </div>
        </div>
        <Link to="/inventory-manager/inventory" className="button">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          Xem Danh Sách
        </Link>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Alerts */}
        {(inventoryStats.lowStock > 0 ||
          inventoryStats.outOfStock > 0 ||
          inventoryStats.expiringSoon > 0) && (
            <div className="mb-6">
              <div className="flex items-center gap-3 flex-wrap">
                {inventoryStats.lowStock > 0 && (
                  <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                    <LowStockIcon />
                    <span className="text-amber-700 font-semibold text-sm">
                      {inventoryStats.lowStock} phụ tùng sắp hết hàng
                    </span>
                  </div>
                )}
                {inventoryStats.outOfStock > 0 && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                    <OutOfStockIcon />
                    <span className="text-red-700 font-semibold text-sm">
                      {inventoryStats.outOfStock} phụ tùng hết hàng
                    </span>
                  </div>
                )}
                {inventoryStats.expiringSoon > 0 && (
                  <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-lg px-3 py-2">
                    <WarrantyIcon />
                    <span className="text-orange-700 font-semibold text-sm">
                      {inventoryStats.expiringSoon} phụ tùng sắp hết hạn bảo hành
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-lg border p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng phụ tùng</p>
                <p className="text-2xl font-bold text-gray-900">
                  {parts.length}
                </p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <IconPackage />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Còn hàng</p>
                <p className="text-2xl font-bold text-green-600">
                  {parts.filter((item) => item.quantity > 0).length}
                </p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Sắp hết</p>
                <p className="text-2xl font-bold text-amber-600">
                  {lowParts.length}
                </p>
              </div>
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Hết hàng</p>
                <p className="text-2xl font-bold text-red-600">
                  {outOfStockParts.length}
                </p>
              </div>
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Phụ tùng mới thêm</p>
                <p className="text-2xl font-bold text-purple-600">30</p>
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <IconPackage className={"text-purple-400"} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng giá trị</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {inventoryStats.totalValue}
                </p>
              </div>
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="bg-white rounded-lg border p-6 shadow-sm mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Doanh thu tháng trước
          </h3>
          <RevenueLineChart />
        </div>

        <div className="bg-white rounded-lg border p-6 shadow-sm mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Phụ tùng sử dụng nhiều nhất
          </h3>
          <BarChart data={topUsedParts} maxValue={maxUsage} />
        </div>


        {/* Quick Actions */}
        <div className="bg-white rounded-lg border p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Hành động nhanh
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link
              to="/inventory-manager/inventory/add"
              className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">Thêm phụ tùng</p>
                <p className="text-sm text-gray-600">
                  Thêm phụ tùng mới vào kho
                </p>
              </div>
            </Link>
            <Link
              to="/inventory-manager/import"
              className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
            >
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">Nhập kho</p>
                <p className="text-sm text-gray-600">Tạo phiếu nhập kho</p>
              </div>
            </Link>
            <Link
              to="/inventory-manager/inventory"
              className="flex items-center gap-3 p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">Xem danh sách</p>
                <p className="text-sm text-gray-600">Quản lý tất cả phụ tùng</p>
              </div>
            </Link>
            <Link
              to="/inventory-manager/history"
              className="flex items-center gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors"
            >
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">Lịch sử</p>
                <p className="text-sm text-gray-600">Xem lịch sử nhập xuất</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
