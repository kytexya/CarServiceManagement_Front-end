export const STATUSES = [
  { value: "all", label: "Tất cả" },
  { value: "pending", label: "Chờ xử lý" },
  { value: "in-progress", label: "Đang sửa" },
  { value: "completed", label: "Hoàn thành" },
  { value: "cancelled", label: "Đã hủy" },
];

export const CUSTOMERS = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    phone: "0123456789",
    plateNumber: "30A-12345",
  },
  { id: 2, name: "Trần Thị B", phone: "0987654321", plateNumber: "51B-67890" },
  { id: 3, name: "Lê Văn C", phone: "0555666777", plateNumber: "29C-11111" },
];

export const STATUS_CONFIG = {
  pending: { color: "bg-yellow-100 text-yellow-800", text: "Chờ thực hiện" },
  "in-progress": { color: "bg-blue-100 text-blue-800", text: "Đang thực hiện" },
  completed: { color: "bg-green-100 text-green-800", text: "Hoàn thành" },
  cancelled: { color: "bg-red-100 text-red-800", text: "Đã hủy" },
};

export const UNITS = [
  {value: 1, label: "cái"},
  {value: 2, label: "bộ"},
  {value: 3, label: "chai "},
]

export const SERVICES = [
  {id: 1, title: "Oil Change"},
  {id: 2, title: "Brake Inspection"},
  {id: 3, title: "Air filter change"},
  {id: 4, title: "Fuel filter (diesel)"},
]

export const CATEGORIES = [
  {value: 1, label: "Bảo trì"},
  {value: 2, label: "Thay nhớt"},
  {value: 3, label: "Kiểm tra"},
  {value: 4, label: "Thay lốp"}
]
