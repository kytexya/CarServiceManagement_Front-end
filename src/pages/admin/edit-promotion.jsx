import SidebarAdmin from "@/components/common/sidebar-admin";
import { showError } from "@/utils";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";

// Mock data for demonstration
const mockPromotion = {
    id: "PROMO123",
    name: "Giảm giá mừng khai trương",
    code: "CHAOMUNG",
    discountType: "percentage",
    discountValue: 15,
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    conditions: "Áp dụng cho hóa đơn từ 500.000đ cho dịch vụ bảo dưỡng.",
    status: "active",
};

export default function AdminEditPromotionPage() {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Populate form with mock data
    setValue("name", mockPromotion.name);
    setValue("code", mockPromotion.code);
    setValue("discountType", mockPromotion.discountType);
    setValue("discountValue", mockPromotion.discountValue);
    setValue("startDate", mockPromotion.startDate);
    setValue("endDate", mockPromotion.endDate);
    setValue("conditions", mockPromotion.conditions);
    setValue("status", mockPromotion.status);
  }, [setValue]);

  const onSubmit = (data) => {
    console.log("Updated Form Data:", data);
    showError(`Chức năng chỉnh sửa khuyến mãi ${id} chưa được kết nối API.`);
  };

  return (
    <div className="flex flex-row w-full h-screen bg-gray-50">
      <SidebarAdmin />
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center px-8 py-4 border-b bg-white">
          <h1 className="text-2xl font-bold">Chỉnh Sửa Khuyến Mãi / Voucher</h1>
          <Link to="/admin/promotion" className="button">
            Quay Lại
          </Link>
        </div>
        <div className="p-8">
          <form className="bg-white rounded-lg border p-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Promotion Name */}
              <div className="md:col-span-2">
                <label className="font-semibold">Tên Chương Trình</label>
                <input
                  type="text"
                  className={`input-field mt-1 ${errors.name ? "border-red-500" : "border-gray-300"}`}
                  {...register("name", { required: "Vui lòng nhập tên chương trình" })}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              {/* Voucher Code */}
              <div>
                <label className="font-semibold">Mã Voucher</label>
                <input
                  type="text"
                  className={`input-field mt-1 ${errors.code ? "border-red-500" : "border-gray-300"}`}
                  {...register("code", { required: "Vui lòng nhập mã voucher" })}
                />
                {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code.message}</p>}
              </div>

              {/* Discount Type */}
              <div>
                <label className="font-semibold">Loại Giảm Giá</label>
                <select className={`input-field mt-1 ${errors.discountType ? "border-red-500" : "border-gray-300"}`}
                  {...register("discountType", { required: "Vui lòng chọn loại giảm giá" })}
                >
                  <option value="percentage">Phần trăm (%)</option>
                  <option value="fixed">Số tiền cố định (VND)</option>
                </select>
                {errors.discountType && <p className="text-red-500 text-xs mt-1">{errors.discountType.message}</p>}
              </div>

              {/* Discount Value */}
              <div>
                <label className="font-semibold">Giá Trị Giảm</label>
                <input
                  type="number"
                  className={`input-field mt-1 ${errors.discountValue ? "border-red-500" : "border-gray-300"}`}
                  {...register("discountValue", { required: "Vui lòng nhập giá trị giảm" })}
                />
                {errors.discountValue && <p className="text-red-500 text-xs mt-1">{errors.discountValue.message}</p>}
              </div>

              {/* Status */}
              <div>
                  <label className="font-semibold">Trạng thái</label>
                  <select className={`input-field mt-1 ${errors.status ? "border-red-500" : "border-gray-300"}`}
                    {...register("status", { required: "Vui lòng chọn trạng thái" })}
                  >
                      <option value="active">Đang hoạt động</option>
                      <option value="inactive">Không hoạt động</option>
                  </select>
              </div>

              {/* Start Date */}
              <div>
                <label className="font-semibold">Ngày Bắt Đầu</label>
                <input
                  type="date"
                  className={`input-field mt-1 ${errors.startDate ? "border-red-500" : "border-gray-300"}`}
                  {...register("startDate", { required: "Vui lòng chọn ngày bắt đầu" })}
                />
                {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate.message}</p>}
              </div>

              {/* End Date */}
              <div>
                <label className="font-semibold">Ngày Kết Thúc</label>
                <input
                  type="date"
                  className={`input-field mt-1 ${errors.endDate ? "border-red-500" : "border-gray-300"}`}
                  {...register("endDate", { required: "Vui lòng chọn ngày kết thúc" })}
                />
                {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate.message}</p>}
              </div>

              {/* Conditions */}
              <div className="md:col-span-2">
                <label className="font-semibold">Điều kiện áp dụng</label>
                <textarea
                  rows="3"
                  className={`input-field mt-1 ${errors.conditions ? "border-red-500" : "border-gray-300"}`}
                  {...register("conditions")}
                ></textarea>
              </div>
            </div>

            <div className="flex gap-4 justify-end mt-6">
              <Link to="/admin/promotion" className="button">
                Huỷ
              </Link>
              <button type="submit" className="button primary">
                Lưu Thay Đổi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
