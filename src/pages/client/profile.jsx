import { showError } from "@/utils";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function ProfilePage() {
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
    <div className="px-8 md:px-6 md:w-[560px] mx-auto py-6 my-20 bg-white rounded-xl border border-gray-300">
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center h-[60px]">
          <h1 className="text-2xl font-bold text-center w-full">
            Thông tin tài khoản
          </h1>
        </div>
        <form className="text-sm mt-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-row justify-between w-full">
              <label className="text-xl font-bold">Họ và tên:</label>
              <p>{profile?.name}</p>
            </div>
            <div className="flex flex-row justify-between w-full">
              <label className="text-xl font-bold">Số điện thoại:</label>
              <p>{profile?.phoneNumber}</p>
            </div>
            <div className="flex flex-row justify-between w-full">
              <label className="text-xl font-bold">Điểm thưởng:</label>
              <p>{profile?.score ?? 0} (điểm)</p>
            </div>
            <div className="flex flex-row justify-between items-center w-full">
              <label className="text-xl font-bold">Thành viên:</label>
              <div className="flex-center bg-warning rounded-md px-6 py-1 text-white">
                {"Vàng"}
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-end mt-8">
            <Link
              to="/edit-profile"
              className="button primary float-right !w-[145px]"
            >
              Sửa thông tin
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
