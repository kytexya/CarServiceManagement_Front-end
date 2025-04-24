import SidebarAdmin from "@/components/common/sidebar-admin";
import { showError, showSuccess } from "@/utils";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function AddPromotionPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const yourToken = localStorage.getItem("bus-token");

  const onSubmit = (data) => {
    console.log("Dữ liệu:", data);
    const payload = {
      ...data,
      minTicketsRequired: parseInt(data.minTicketsRequired),
    };
    axios
      .post(`${baseURL}/api/Membership`, payload, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": 69420,
          Authorization: `Bearer ${yourToken}`,
        },
      })
      .then((res) => {
        if (res.status === 201) {
          showSuccess();
          navigate("/admin/promotion");
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
          <h1 className="text-2xl font-bold">Tạo khuyến mãi</h1>
        </div>
        <div className="bg-white rounded-xl border border-gray-300 p-4 mt-10 mx-10">
          <form className="text-sm" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-10 w-full">
              <div className="flex flex-col gap-2 mb-4 w-full">
                <label className="text-sm">Tên mức khuyến mãi</label>
                <input
                  type="text"
                  className={`border px-5 py-2 rounded-lg ${
                    errors.rankName ? "border-red-500" : "border-gray"
                  }`}
                  {...register("rankName", {
                    required: "Vui lòng nhập dữ liệu",
                    minLength: {
                      value: 3,
                      message: "Cần nhập từ 3 ký tự trở lên",
                    },
                  })}
                />
                {errors.rankName && (
                  <p className="text-red-500 text-xs">
                    {errors.rankName.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 mb-4 w-full">
                <label className="text-sm">Mức giảm giá (%)</label>
                <input
                  type="number"
                  inputMode="decimal"
                  min={0.0}
                  max={100.0}
                  step="0.01"
                  className={`border px-5 py-2 rounded-lg ${
                    errors.discountRate ? "border-red-500" : "border-gray"
                  }`}
                  {...register("discountRate", {
                    required: "Vui lòng nhập dữ liệu",
                    pattern: {
                      value: /^\d+(\.\d{1,2})?$/,
                      message: "Chỉ được nhập chữ số và thập phân",
                    },
                  })}
                />
                {errors.discountRate && (
                  <p className="text-red-500 text-xs">
                    {errors.discountRate.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-10 w-full">
              <div className="flex flex-col gap-2 mb-4 w-full">
                <label className="text-sm">
                  Số lần đặt vé tối thiểu để áp dụng (lượt)
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  className={`border px-5 py-2 rounded-lg ${
                    errors.minTicketsRequired ? "border-red-500" : "border-gray"
                  }`}
                  {...register("minTicketsRequired", {
                    required: "Vui lòng nhập dữ liệu",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Chỉ được nhập chữ số",
                    },
                  })}
                />
                {errors.minTicketsRequired && (
                  <p className="text-red-500 text-xs">
                    {errors.minTicketsRequired.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 mb-4 w-full">
                <label className="text-sm">Mô tả</label>
                <textarea
                  className={`border px-5 py-2 rounded-lg ${
                    errors.description ? "border-red-500" : "border-gray"
                  }`}
                  {...register("description", {
                    required: "Vui lòng nhập dữ liệu",
                  })}
                />
                {errors.description && (
                  <p className="text-red-500 text-xs">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-4 justify-end">
              <Link
                to="/admin/promotion"
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
