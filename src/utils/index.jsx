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
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};
