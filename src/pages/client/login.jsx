import { showError, showSuccess } from "@/utils";
import { useForm } from "react-hook-form";
import LogoCar from '@/assets/images/logo-car.png';

const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const payload = {
      username: data.username,
      password: data.password,
    };
    fetch(`${baseURL}/api/Staff/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        const result = await res.json();
        if (res.status === 200) {
          localStorage.setItem("carserv-profile", JSON.stringify(result));
          // Redirect based on role
          const role = result.role;
          if (role === 1) {
            window.location.href = "/admin";
          } else if (role === 2) {
            window.location.href = "/service-staff";
          } else if (role === 3) {
            window.location.href = "/inventory-manager";
          } else {
            window.location.href = "/";
          }
        } else {
          showError(result.message || "Đăng nhập thất bại");
        }
      })
      .catch(() => {
        showError();
      });
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 py-16 md:py-24">
      <div className="bg-white rounded-2xl shadow-2xl p-10 flex flex-col items-center w-full max-w-sm border border-blue-100">
        {/* Logo or icon */}
        <div className="mb-6 flex flex-col items-center">
          <img src={LogoCar} alt="Logo" className="w-16 h-16 mb-2 rounded-full shadow" />
          <p className="font-bold text-2xl text-blue-700">Đăng nhập</p>
        </div>
        <form className="w-full text-base" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2 mb-5">
            <label className="text-sm font-medium">Tên tài khoản</label>
            <input
              type="text"
              placeholder="Nhập tên tài khoản"
              className={`border px-5 py-2 rounded-lg ${errors.username ? "border-red-500" : "border-gray-300"}`}
              {...register("username", {
                required: "Vui lòng nhập tên tài khoản",
                minLength: {
                  value: 6,
                  message: "Tên tài khoản phải từ 6 ký tự trở lên",
                },
              })}
            />
            {errors.username && (
              <p className="text-red-500 text-xs">{errors.username.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2 mb-6">
            <label className="text-sm font-medium">Mật khẩu</label>
            <input
              type='password'
              placeholder="Nhập mật khẩu..."
              className={`border px-5 py-2 rounded-lg ${errors.password ? "border-red-500" : "border-gray-300"}`}
              {...register("password", {
                required: "Vui lòng nhập mật khẩu",
                minLength: {
                  value: 6,
                  message: "Mật khẩu cần ít nhất 6 ký tự",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 mb-2 text-base font-semibold shadow transition-colors duration-200"
          >
            Đăng nhập
          </button>
          <a href="/register" className="w-full block mt-2 text-center text-blue-600 hover:underline text-sm">
            Đăng ký tài khoản mới
          </a>
        </form>
      </div>
    </div>
  );
}