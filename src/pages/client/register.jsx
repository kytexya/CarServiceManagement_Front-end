import { showError } from "@/utils";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import React from "react";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    // Password confirmation is handled by react-hook-form validation
    console.log("Registration Data:", data);
    showError("Chức năng đăng ký chưa được kết nối API.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8"
         style={{ backgroundImage: "url('https://images.unsplash.com/photo-1487754180451-c456fccbd3d4?q=80&w=2070&auto=format&fit=crop')" }}>
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Tạo tài khoản mới
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Hoặc{" "}
            <Link to="/login" className="font-medium text-primary hover:text-primary-dark">
              đăng nhập vào tài khoản của bạn
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-4">
            <div>
              <label className="font-semibold text-sm">Họ và tên</label>
              <input
                type="text"
                placeholder="Nhập họ và tên"
                className={`input-field mt-1 ${errors.name ? "border-red-500" : "border-gray-300"}`}
                {...register("name", { required: "Vui lòng nhập họ tên" })}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="font-semibold text-sm">Email</label>
              <input
                type="email"
                placeholder="Nhập địa chỉ email"
                className={`input-field mt-1 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                {...register("email", { 
                  required: "Vui lòng nhập email",
                  pattern: { value: /^\S+@\S+$/i, message: "Địa chỉ email không hợp lệ" } 
                })}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="font-semibold text-sm">Số điện thoại</label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="Nhập số điện thoại"
                className={`input-field mt-1 ${errors.phoneNumber ? "border-red-500" : "border-gray-300"}`}
                {...register("phoneNumber", {
                  required: "Vui lòng nhập số điện thoại",
                  pattern: { value: /^[0-9]{10}$/, message: "Số điện thoại phải có 10 chữ số" },
                })}
              />
              {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>}
            </div>
            <div>
              <label className="font-semibold text-sm">Mật khẩu</label>
              <input
                type="password"
                placeholder="Nhập mật khẩu"
                className={`input-field mt-1 ${errors.password ? "border-red-500" : "border-gray-300"}`}
                {...register("password", {
                  required: "Vui lòng nhập mật khẩu",
                  minLength: { value: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
                })}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
            <div>
              <label className="font-semibold text-sm">Xác nhận mật khẩu</label>
              <input
                type="password"
                placeholder="Nhập lại mật khẩu"
                className={`input-field mt-1 ${errors.passwordConfirm ? "border-red-500" : "border-gray-300"}`}
                {...register("passwordConfirm", {
                  required: "Vui lòng xác nhận mật khẩu",
                  validate: (value) => value === watch('password') || "Mật khẩu xác nhận không khớp",
                })}
              />
              {errors.passwordConfirm && <p className="text-red-500 text-xs mt-1">{errors.passwordConfirm.message}</p>}
            </div>
          </div>

          <div>
            <button type="submit" className="button primary w-full">
              Đăng ký
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}