import Loading from '@/components/common/loading';
import { showError, showSuccess } from '@/utils';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function EditProfilePage() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [profile, setProfile] = useState();
  const [customerId, setCustomerId] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const profile = localStorage.getItem("bus-profile");
    if (profile) {
      const parsedProfile = JSON.parse(profile);
      setCustomerId(parsedProfile.customerId);
    }
  }, []);

  useEffect(() => {
    if (!customerId) {
      return;
    }
    setLoading(true);
    axios.get(`${baseURL}/api/Customer/${customerId}`, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 69420,
      }
    })
      .then((res) => {
        const result = res.data;
        if (res.status === 200) {
          setProfile(result);
          setValue('name', result.name);
          setValue('phoneNumber', result.phoneNumber);
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        showError(e.response?.data?.message);
      });
  }, [customerId]);

  const onSubmit = (data) => {
    const payload = {
      phoneNumber: data.phoneNumber,
      name: data.name,
    };
    axios.put(`${baseURL}/api/Customer/${profile.customerId}`, payload, {
      headers: {
        'ngrok-skip-browser-warning': 69420,
        'Content-Type': 'application/json',
      }
    })
      .then((res) => {
        if (res?.status === 200) {
          showSuccess();
          navigate('/profile');
        }
      })
      .catch((e) => {
        showError(e.response?.data?.message);
      });
  };

  if (loading) return <Loading />;

  return (
    <div className="px-8 md:px-6 md:w-[600px] mx-auto py-6 my-20 bg-white rounded-xl border border-gray-300">
      <div className='flex flex-col w-full'>
        <div className="flex justify-between items-center h-[60px]">
          <h1 className='text-2xl font-bold text-center w-full'>Cập nhật thông tin</h1>
        </div>
        <form className="text-sm" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-10 w-full">
            <div className="flex flex-col gap-2 mb-4 w-full">
              <label className="text-sm">Họ và tên</label>
              <input
                type="text"
                defaultValue={profile?.name}
                placeholder="Nhập họ và tên..."
                className={`border px-5 py-2 rounded-lg ${errors.name ? "border-red-500" : "border-gray"
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
              <label className="text-sm">
                Số điện thoại
              </label>
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
  )
}