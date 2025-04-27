import { showError, showSuccess } from "@/utils";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = (data) => {
    if (data.password !== data.passwordConfirm) {
      showError("Mật khẩu xác nhận không khớp.");
      return;
    }
    const payload = {
      phoneNumber: data.phone,
      name: data.fullname,
      password: data.password,
    };
    axios.post(`${baseURL}/api/Customer/register`, payload, {
      headers: {
        'ngrok-skip-browser-warning': 69420,
        'Content-Type': 'application/json',
      }
    })
      .then((res) => {
        if (res?.status === 200) {
          showSuccess();
          navigate('/login');
        }
      })
      .catch((e) => {
        showError(e?.response?.data?.message);
      });
  };

  return (
    <div className="flex items-center">
      <div className="px-8 md:px-10 md:w-1/2 max-w-[680px] w-full mx-auto py-10">
        <p className="font-bold text-2xl mb-4">Đăng ký tài khoản của bạn</p>

        <form className="text-sm" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2 mb-4">
            <label className="text-sm">Họ và tên</label>
            <input
              type="text"
              placeholder="Nhập họ và tên..."
              className={`border px-5 py-2 rounded-lg ${errors.fullname ? "border-red-500" : "border-gray"
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
              <p className="text-red-500 text-xs">{errors.fullname.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2 mb-4">
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
              placeholder="Nhập Mật khẩu"
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
          <div className="flex flex-col gap-2 mb-4">
            <label className="text-sm">Mật khẩu xác nhận</label>
            <input
              type='password'
              placeholder="Nhập mật khẩu xác nhận"
              className={`border px-5 py-2 rounded-lg ${errors.passwordConfirm ? "border-red-500" : "border-gray"
                }`}
              {...register("passwordConfirm", {
                required: "Vui lòng nhập mật khẩu xác nhận",
                minLength: {
                  value: 6,
                  message: "Mật khẩu cần ít nhất 6 số",
                },
              })}
            />
            {errors.passwordConfirm && (
              <p className="text-red-500 text-xs">{errors.passwordConfirm.message}</p>
            )}
          </div>
          <button type="submit" className="button primary w-full mb-3">
            Đăng ký tài khoản
          </button>
          <p className="text-center">
            Bạn đã có tài khoản?
            <Link to="/login" className="ml-1 text-primary font-bold">
              Đăng nhập
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}