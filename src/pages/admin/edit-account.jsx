import SidebarAdmin from "@/components/common/sidebar-admin";
import { showError, showSuccess } from "@/utils";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function EditAccountList() {
  const { id } = useParams();
  const [data, setData] = useState();
  const navigate = useNavigate();
  const yourToken = localStorage.getItem("bus-token");

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetch(`${baseURL}/api/User/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": 69420,
        Authorization: `Bearer ${yourToken}`,
      },
    })
      .then(async (res) => {
        const result = await res.json();
        if (res.status === 200) {
          setData(result);
          setValue("name", result.name);
          setValue("phoneNumber", result.phoneNumber);
          setValue("userId", result.userId);
          setValue("username", result.username);
          setValue("role", result.role);
        } else {
          showError();
        }
      })
      .catch(() => {
        showError();
      });
  }, []);

  const onSubmit = (data) => {
    const payload = {
      ...data,
      role: parseInt(data.role),
    };
    fetch(`${baseURL}/api/User/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${yourToken}`,
        "ngrok-skip-browser-warning": 69420,
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        const result = await res.json();
        if (res.status === 200) {
          showSuccess("Lưu dữ liệu thành công");
          navigate("/admin/account");
        } else {
          showError(result.message);
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
                  defaultValue={data?.username}
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
                    errors.name ? "border-red-500" : "border-gray"
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
                  <p className="text-red-500 text-xs">{errors.name.message}</p>
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
                    errors.phoneNumber ? "border-red-500" : "border-gray"
                  }`}
                  {...register("phoneNumber", {
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
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs">
                    {errors.phoneNumber.message}
                  </p>
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
                  <option value="1">Admin</option>
                  <option value="2">Nhân viên</option>
                  <option value="3">Tài xế</option>
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
                  autoComplete="new-password"
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
