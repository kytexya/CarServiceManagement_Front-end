import SidebarStaff from "@/components/common/sidebar-staff";
import { showError } from "@/utils";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";

// Mock data for demonstration purposes. In a real app, you'd fetch this.
const mockCustomer = {
  id: 'KH001',
  name: "Nguyễn Văn A",
  phoneNumber: "0987654321",
  email: "nguyenvana@example.com",
  address: "123 Đường ABC, Quận 1, TP. HCM",
  vehicleInfo: "Toyota Vios 2022, Biển số 51G-123.45",
};

export default function StaffEditCustomerPage() {
  const { id } = useParams(); // Keep id to show we're on a specific customer's page
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Populate form with mock data when the component loads
    setValue("name", mockCustomer.name);
    setValue("phoneNumber", mockCustomer.phoneNumber);
    setValue("email", mockCustomer.email);
    setValue("address", mockCustomer.address);
    setValue("vehicleInfo", mockCustomer.vehicleInfo);
  }, [setValue]);


  const onSubmit = (data) => {
    console.log("Updated data:", data);
    showError(`Chức năng chỉnh sửa cho khách hàng ${id} chưa được kết nối API.`);
  };

  return (
    <div className="flex h-full w-full">
      <SidebarStaff />
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center px-8 py-4 border-b">
          <h1 className="text-2xl font-bold">Chỉnh Sửa Thông Tin Khách Hàng</h1>
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
                  className={`input-field ${errors.address ? "border-red-500" : "border-gray-300"}`}
                  {...register("address")}
                />
              </div>

              {/* Vehicle Info */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="font-semibold">Thông Tin Xe</label>
                <textarea
                  rows="3"
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
                Lưu Thay Đổi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 