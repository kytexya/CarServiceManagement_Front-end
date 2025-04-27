import { showError, showSuccess } from "@/utils";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const payload = {
      phoneNumber: data.phone,
      password: data.password,
    };
    fetch(`${baseURL}/api/Customer/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        const result = await res.json();
        if (res.status === 200) {
          localStorage.setItem("bus-profile", JSON.stringify(result));
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
    <div className="flex items-center">
      <div className="px-8 md:px-10 md:w-1/2 max-w-[680px] w-full mx-auto py-10">
        <div className="flex justify-between w-full">
          <p className="font-bold text-2xl mb-4">Đăng nhập tài khoản</p>
          <Link to="/login-manager" className="button mb-4 !bg-warning !border-none !text-white">
            Đăng nhập quản lý
          </Link>
        </div>
        <form className="text-sm" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2 mb-6">
            <label className="text-sm">Số điện thoại</label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="Nhập số điện thoại"
              className={`border px-5 py-2 rounded-lg ${errors.phone ? "border-red-500" : "border-gray"
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
          <div className="flex flex-col gap-2 mb-4">
            <label className="text-sm">Mật khẩu</label>
            <input
              type='password'
              placeholder="Nhập mật khẩu"
              className={`border px-5 py-2 rounded-lg ${errors.password ? "border-red-500" : "border-gray"
                }`}
              {...register("password", {
                required: "Vui lòng nhập mật khẩu",
                minLength: {
                  value: 6,
                  message: "Mật khẩu cần ít nhất 6 số",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="button !w-full primary rounded-lg mb-3"
          >
            Đăng nhập
          </button>
          <Link to="/register" className="button">
            Đăng ký
          </Link>
        </form>
      </div>
    </div>
  );
}