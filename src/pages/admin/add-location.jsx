import SidebarAdmin from "@/components/common/sidebar-admin";
import { showError, showSuccess } from "@/utils";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function AddLocationPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Dữ liệu:", data);
    const payload = {
      phoneNumber: data.phone,
    };
    fetch(`${baseURL}/location`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        // const result = await res.json();
        if (res.status === 200) {
          showSuccess();
        } else {
          showError();
        }
      })
      .catch(() => {
        showError();
      });
  };

  return (
    <div className="flex flex-row w-full">
      <SidebarAdmin />
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center h-[60px] px-4 shadow-lg">
          <h1 className="text-2xl font-bold">Tạo địa điểm</h1>
        </div>
        <div className="bg-white rounded-xl border border-gray-300 p-4 mt-10 mx-10">
          <form className="text-sm" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-10 w-full">
              <div className="flex flex-col gap-2 mb-4 w-full">
                <label className="text-sm">Tên địa điểm</label>
                <input
                  type="text"
                  className={`border px-5 py-2 rounded-lg ${
                    errors.LocationName ? "border-red-500" : "border-gray"
                  }`}
                  {...register("LocationName", {
                    required: "Vui lòng nhập dữ liệu",
                    minLength: {
                      value: 6,
                      message: "Cần nhập từ 6 ký tự trở lên",
                    },
                  })}
                />
                {errors.LocationName && (
                  <p className="text-red-500 text-xs">
                    {errors.LocationName.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 mb-4 w-full">
                <label className="text-sm">Tuyến đường</label>
                <select
                  className={`border px-5 py-2 rounded-lg ${
                    errors.RouteId ? "border-red-500" : "border-gray"
                  }`}
                  {...register("RouteId", {
                    required: "Vui lòng chọn dữ liệu",
                  })}
                >
                  <option value="1">Hà Nội - Sài Gòn</option>
                  <option value="2">Sài Gòn - Đà Lạt</option>
                </select>
                {errors.RouteId && (
                  <p className="text-red-500 text-xs">
                    {errors.RouteId.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-4 justify-end">
              <Link
                to="/admin/location"
                className="button float-right !w-[145px]"
              >
                Quay lại
              </Link>
              <button
                type="submit"
                className="button primary float-right !w-[145px]"
              >
                Lưu thông tin
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
