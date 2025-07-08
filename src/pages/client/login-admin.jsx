import { showError } from "@/utils";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function LoginAdminPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    fetch(`${baseURL}/api/User/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        const result = await res.json();
        if (res.status === 200) {
          localStorage.setItem("bus-token", result.token);
          localStorage.setItem("bus-profile", JSON.stringify(result.user));
          if (result.user.role === 1) {
            window.location.href = "/admin/account";
            return;
          } if (result.user.role === 2) {
            window.location.href = "/staff/trip";
            return;
          } if (result.user.role === 3) {
            window.location.href = "/drive/trip";
            return;
          }
          window.location.href = "/";
        } else {
          showError(result.message || "Đăng nhập thất bại");
        }
      })
      .catch(() => {
        showError();
      });
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-xl shadow-lg p-10 flex flex-col items-center w-full max-w-sm">
        <p className="font-bold text-2xl mb-6">Đăng nhập tài khoản admin</p>
        <form className="w-full text-base" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2 mb-5">
            <label className="text-sm font-medium">Tên tài khoản</label>
            <input
              type="text"
              placeholder="Nhập tài khoản..."
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
              type="password"
              placeholder="Nhập mật khẩu..."
              className={`border px-5 py-2 rounded-lg ${errors.password ? "border-red-500" : "border-gray-300"}`}
              {...register("password", {
                required: "Vui lòng nhập mật khẩu",
                minLength: {
                  value: 6,
                  message: "Mật khẩu ít nhất 6 ký tự",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          <button type="submit" className="button !w-full primary rounded-lg mb-2 text-base font-semibold">
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}