import { showError } from "@/utils";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function EditProfilePage() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [profile, setProfile] = useState(false);

  useEffect(() => {
    const profile = localStorage.getItem("bus-profile");
    if (profile) {
      const parsedProfile = JSON.parse(profile);
      setValue("name", parsedProfile.name);
      setValue("phoneNumber", parsedProfile.phoneNumber);
      setProfile(parsedProfile);
    }
  }, []);

  const onSubmit = (data) => {
    fetch(`${baseURL}/customers/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        const result = await res.json();
        if (res.status === 200) {
        } else {
          showError();
        }
      })
      .catch(() => {
        showError();
      });
  };

  return (
    <div className="px-8 md:px-6 md:w-[600px] mx-auto py-6 my-20 bg-white rounded-xl border border-gray-300">
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center h-[60px]">
          <h1 className="text-2xl font-bold text-center w-full">
            Cập nhật thông tin
          </h1>
        </div>
        <form className="text-sm" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-10 w-full">
            <div className="flex flex-col gap-2 mb-4 w-full">
              <label className="text-sm">Họ và tên</label>
              <input
                type="text"
                defaultValue={profile?.name}
                placeholder="Nhập họ và tên..."
                className={`border px-5 py-2 rounded-lg ${
                  errors.name ? "border-red-500" : "border-gray"
                }`}
                {...register("name", {
                  required: "Vui lòng nhập họ tên",
                  minLength: {
                    value: 6,
                    message: "Tên phải từ 6 ký tự trở lên",
                  },
                })}
              />
              {errors.name && (
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
                defaultValue={profile?.phoneNumber}
                placeholder="Nhập số điện thoại..."
                disabled
                className={`border px-5 py-2 w-full rounded-lg`}
              />
            </div>
          </div>
          <div className="flex gap-4 justify-end">
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
  );
}
