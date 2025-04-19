import SidebarAdmin from "@/components/common/sidebar-admin";
import { showError, showSuccess } from "@/utils";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function EditAccountList() {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const payload = {
      phoneNumber: data.phone,
    };
    fetch(`${baseURL}/customers/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        const result = await res.json();
        if (res.status === 200) {
          showSuccess("Đăng ký thành công");
        } else {
          showError(result.message || "Đăng nhập thất bại");
        }
      })
      .catch(() => {
        showError();
      });
  };

  return (
    <div className="flex flex-row w-full">
      <SidebarAdmin />
      <div className="flex flex-col w-full border-2">
        <div className="flex justify-between items-center h-[60px] px-4 shadow-lg">
          <h1 className="text-2xl font-bold">Sửa tài khoản</h1>
        </div>
        <div className="bg-white rounded-xl border border-gray-300 p-4 mt-10 mx-10">
          <form className="text-sm" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-10 w-full">
              <div className="flex flex-col gap-2 mb-4 w-full">
                <label className="text-sm">Tên tài khoản</label>
                <input
                  type="text"
                  placeholder="Nhập tài khoản..."
                  className={`border px-5 py-2 rounded-lg ${
                    errors.username ? "border-red-500" : "border-gray"
                  }`}
                  {...register("username", {
                    required: "Vui lòng nhập tên tài khoản",
                    minLength: {
                      value: 6,
                      message: "Tên tài khoản phải từ 6 ký tự trở lên",
                    },
                  })}
                />
                {errors.username && (
                  <p className="text-red-500 text-xs">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 mb-4 w-full">
                <label className="text-sm">Họ và tên</label>
                <input
                  type="text"
                  placeholder="Nhập họ và tên..."
                  className={`border px-5 py-2 rounded-lg ${
                    errors.fullname ? "border-red-500" : "border-gray"
                  }`}
                  {...register("fullname", {
                    required: "Vui lòng nhập họ tên",
                    minLength: {
                      value: 6,
                      message: "Tên phải từ 6 ký tự trở lên",
                    },
                  })}
                />
                {errors.fullname && (
                  <p className="text-red-500 text-xs">
                    {errors.fullname.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-10 w-full">
              <div className="flex flex-col gap-2 mb-4 w-full">
                <label className="text-sm">Số điện thoại</label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Nhập số điện thoại..."
                  className={`border px-5 py-2 w-full rounded-lg ${
                    errors.phone ? "border-red-500" : "border-gray"
                  }`}
                  {...register("phone", {
                    required: "Vui lòng nhập số điện thoại",
                    minLength: {
                      value: 10,
                      message: "Số điện thoại cần ít nhất 10 số",
                    },
                    maxLength: {
                      value: 10,
                      message: "Vui lòng nhập đúng định dạng số điện thoại",
                    },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Chỉ được nhập chữ số",
                    },
                  })}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs">{errors.phone.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-2 mb-4 w-full">
                <label className="text-sm">Phân quyền</label>
                <select
                  className={`border px-5 py-2 rounded-lg ${
                    errors.role ? "border-red-500" : "border-gray"
                  }`}
                  {...register("role", {
                    required: "Vui'hui chọn phân quyền",
                  })}
                >
                  <option value="admin">Nhân viên</option>
                  <option value="customer">Khách hàng</option>
                </select>
                {errors.role && (
                  <p className="text-red-500 text-xs">{errors.role.message}</p>
                )}
              </div>
            </div>
            <div className="flex gap-10 w-full">
              <div className="flex flex-col gap-2 mb-4 w-full">
                <label className="text-sm">Mật khẩu</label>
                <input
                  type="password"
                  placeholder="Nhập mật khẩu..."
                  className={`border px-5 py-2 rounded-lg ${
                    errors.password ? "border-red-500" : "border-gray"
                  }`}
                  {...register("password", {
                    required: "Vui lòng nhập mật khẩu",
                    minLength: {
                      value: 6,
                      message: "Mật khẩu ít nhất 6 ký tự",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-4 justify-end">
              <Link
                to="/admin/account"
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
