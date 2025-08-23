import { showError, showSuccess } from "@/utils";
import { useForm } from "react-hook-form";
import LogoCar from '@/assets/images/logo-car.png';
import TextInput from "@/components/form/input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const schema = yup.object().shape({
  username: yup
    .string()
    .required("Vui lòng nhập tên tài khoản")
    .min(6, "Tên tài khoản phải từ 6 ký tự trở lên"),

  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .min(6, "Mật khẩu cần ít nhất 6 ký tự"),
});

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const token = localStorage.getItem("carserv-token");
    const profile = localStorage.getItem("carserv-profile");
    if (token && profile) {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp < now) {
        localStorage.removeItem("carserv-token");
        localStorage.removeItem("carserv-profile");
        window.location.href = "/login";
        return;
      }
      if (profile?.roleName === 'admin') {
        window.location.href = "/admin";
      } else if (profile?.roleName === 'staff') {
        window.location.href = "/service-staff";
      } else if (profile?.roleName === 'inventory_manager') {
        window.location.href = "/inventory-manager";
      } else {
        window.location.href = "/service-staff";
      }
    };

  }, [])

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `/api/Home/login`,
        {
          username: data.username,
          password: data.password,
        },
        {
          headers: { "Content-Type": "application/json" },
          'ngrok-skip-browser-warning': 'anyvalue',
        }
      );

      const result = res.data;

      if (res.status === 200 && result) {
        localStorage.setItem("carserv-token", result);
        const profileRes = await axios.get(`/api/Account/by-mail/${encodeURIComponent(data.username)}`, {
          headers: {
            Authorization: `Bearer ${result}`,
            'ngrok-skip-browser-warning': 'anyvalue',
          },
          withCredentials: true,
        });
        localStorage.setItem("carserv-profile", JSON.stringify(profileRes.data));

        const role = profileRes.data.roleName;
        if (role === 'Admin') {
          window.location.href = "/admin";
        } else if (role === 'Staff') {
          window.location.href = "/service-staff";
        } else if (role === 'Inventory manager') {
          window.location.href = "/inventory-manager";
        } else {
          window.location.href = "/service-staff";
        }
      } else {
        showError(result.message || "Đăng nhập thất bại");
      }
    } catch (err) {
      console.error(err);
      showError(err?.response?.data?.message || "Đăng nhập thất bại");
    }
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
            <TextInput
              label={"Tên tài khoản"}
              placeholder={"Nhập tên tài khoản"}
              register={register}
              name={"username"}
              error={errors?.username}
            />
          </div>
          <div className="flex flex-col gap-2 mb-6">
            <TextInput
              type={"password"}
              label={"Mật khẩu"}
              placeholder={"Nhập mật khẩu..."}
              register={register}
              name={"password"}
              error={errors?.password}
            />
            <label className="text-sm font-medium">Mật khẩu</label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 mb-2 text-base font-semibold shadow transition-colors duration-200"
          >
            Đăng nhập
          </button>
          <a href="/signup" className="w-full block mt-2 text-center text-blue-600 hover:underline text-sm">
            Đăng ký tài khoản mới
          </a>
        </form>
      </div>
    </div>
  );
}