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
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
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

export const formatDateTime = (timeString) => {
  const date = new Date(timeString);
  if (isNaN(date.getTime())) {
    console.log("❌ Ngày không hợp lệ");
  } else {
    const formatter = new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    return formatter.format(date);
  }
}
export function convertDateFormat(dateString) {
  const date = new Date(dateString);
  if (isNaN(date.getTime()) || date.getFullYear() < 1000) {
    return 'Invalid date';
  }

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}