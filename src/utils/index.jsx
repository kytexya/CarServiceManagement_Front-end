import { toast } from "react-toastify";

export const showSuccess = (msg) => {
  toast.success(msg || "Thành công!");
};

export const showError = (msg) => {
  toast.error(msg || "Đã xảy ra lỗi!");
};

export const showInfo = (msg) => {
  toast.info(msg || "Thông tin");
};

export const formatToMoney = (amount) => {
  const price = amount * 1000;
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

export const formatTime = (timeString) => {
  const timeOnly = new Intl.DateTimeFormat('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Ho_Chi_Minh',
  }).format(new Date(timeString));
  return timeOnly
};
