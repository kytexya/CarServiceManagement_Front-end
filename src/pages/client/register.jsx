import { showError } from "@/utils";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "@/components/form/input";
import axios from "axios";

const ENV = import.meta.env.VITE_API_BASE_URL;

const schema = yup.object({
  FullName: yup.string().required("Vui lòng nhập họ tên"),
  email: yup
    .string()
    .required("Vui lòng nhập email")
    .email("Địa chỉ email không hợp lệ"),
  phoneNumber: yup
    .string()
    .required("Vui lòng nhập số điện thoại")
    .matches(/^[0-9]{10}$/, "Số điện thoại phải có 10 chữ số"),
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  passwordConfirm: yup
    .string()
    .required("Vui lòng xác nhận mật khẩu")
    .oneOf([yup.ref("password")], "Mật khẩu xác nhận không khớp"),
  address: yup.string().required("Vui lòng nhập địa chỉ"),
});

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // bỏ field passwordConfirm khi gửi API
      const { passwordConfirm, ...payload } = data;

      const res = await axios.post(`/api/Home/signup`, payload, {
        headers: { 
          "Content-Type": "application/json",
          'ngrok-skip-browser-warning': 'anyvalue',
        },
        withCredentials: true,
      });

      // const { token, user } = res.data;

      // // Lưu token + profile
      // localStorage.setItem("carserv-token", token);
      // localStorage.setItem("carserv-profile", JSON.stringify(user));

      alert("Đăng ký thành công!");
      navigate("/login");
    } catch (error) {
      console.error("Đăng ký thất bại:", error);
      showError(error.response?.data?.message || "Đăng ký thất bại!");
    }
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
            <Link to="/" className="font-medium text-primary hover:text-primary-dark">
              đăng nhập vào tài khoản của bạn
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-4">
            <TextInput
              label={"Họ và tên"}
              register={register}
              name={"FullName"}
              error={errors?.name}
              placeholder={"Nhập họ và tên"}
            />
            <TextInput
              type={'email'}
              label={"Email"}
              register={register}
              name={"email"}
              error={errors?.email}
              placeholder={"Nhập địa chỉ email"}
            />
            <TextInput
              label={"Số điện thoại"}
              register={register}
              name={"phoneNumber"}
              placeholder={"Nhập số điện thoại"}
              error={errors?.phoneNumber}
            />
            <TextInput
              type={"password"}
              label={"Mật khẩu"}
              register={register}
              name={"password"}
              placeholder={"Nhập mật khẩu"}
              error={errors?.password}
            />
            <TextInput
              type={"password"}
              label={"Xác nhận mật khẩu"}
              register={register}
              name={"passwordConfirm"}
              placeholder={"Nhập lại mật khẩu"}
              error={errors?.passwordConfirm}
            />
            <TextInput
              label={"Địa chỉ"}
              register={register}
              name={"address"}
              placeholder={"Nhập địa chỉ"}
              error={errors?.address}
            />
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