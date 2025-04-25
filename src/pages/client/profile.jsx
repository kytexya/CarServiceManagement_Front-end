import Loading from '@/components/common/loading';
import { showError } from '@/utils';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function ProfilePage() {
  const {
    setValue,
  } = useForm();
  const [profile, setProfile] = useState();
  const [customerId, setCustomerId] = useState();
  const [loading, setLoading] = useState(false);

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

  if (loading) return <Loading />;

  return (
    <div className="px-8 md:px-6 md:w-[560px] mx-auto py-6 my-20 bg-white rounded-xl border border-gray-300">
      <div className='flex flex-col w-full'>
        <div className="flex justify-between items-center h-[60px]">
          <h1 className='text-2xl font-bold text-center w-full'>Thông tin tài khoản</h1>
        </div>
        <form className="text-sm mt-2">
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
            {profile?.rankName &&
              <div className="flex flex-row justify-between items-center w-full">
                <label className="text-xl font-bold">Thành viên:</label>
                <div className='flex-center bg-warning rounded-md px-6 py-1 text-white'>{profile?.rankName}</div>
              </div>
            }
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
  )
}