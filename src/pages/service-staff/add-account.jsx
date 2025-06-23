import SidebarStaff from "@/components/common/sidebar-staff";
import { showError } from "@/utils";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function StaffAddCustomerPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    showError("Chức năng thêm khách hàng mới chưa được kết nối API.");
  };

  return (
    <div className="flex h-full w-full">
      <SidebarStaff />
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center px-8 py-4 border-b">
          <h1 className="text-2xl font-bold">Thêm Khách Hàng Mới</h1>
          <Link
            to="/service-staff/account"
            className="button"
          >
            Quay Lại Danh Sách
          </Link>
        </div>
        <div className="p-8">
          <form className="bg-white rounded-lg border p-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Họ và Tên</label>
                <input
                  type="text"
                  placeholder="Nhập họ và tên..."
                  className={`input-field ${errors.name ? "border-red-500" : "border-gray-300"}`}
                  {...register("name", {
                    required: "Vui lòng nhập họ tên",
                  })}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name.message}</p>
                )}
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Số Điện Thoại</label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Nhập số điện thoại..."
                  className={`input-field ${errors.phoneNumber ? "border-red-500" : "border-gray-300"}`}
                  {...register("phoneNumber", {
                    required: "Vui lòng nhập số điện thoại",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Số điện thoại phải có 10 chữ số",
                    },
                  })}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs">{errors.phoneNumber.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Email</label>
                <input
                  type="email"
                  placeholder="Nhập địa chỉ email..."
                  className={`input-field ${errors.email ? "border-red-500" : "border-gray-300"}`}
                  {...register("email", {
                    required: "Vui lòng nhập email",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Địa chỉ email không hợp lệ",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>

              {/* Address */}
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Địa chỉ</label>
                <input
                  type="text"
                  placeholder="Nhập địa chỉ..."
                  className={`input-field ${errors.address ? "border-red-500" : "border-gray-300"}`}
                  {...register("address")}
                />
              </div>

              {/* Vehicle Info */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="font-semibold">Thông Tin Xe</label>
                <textarea
                  rows="3"
                  placeholder="Nhập thông tin xe, ví dụ: Toyota Vios 2022, Biển số 51G-123.45"
                  className={`input-field ${errors.vehicleInfo ? "border-red-500" : "border-gray-300"}`}
                  {...register("vehicleInfo")}
                ></textarea>
              </div>
            </div>

            <div className="flex gap-4 justify-end mt-6">
              <Link
                to="/service-staff/account"
                className="button"
              >
                Huỷ
              </Link>
              <button
                type="submit"
                className="button primary"
              >
                Lưu Thông Tin
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 