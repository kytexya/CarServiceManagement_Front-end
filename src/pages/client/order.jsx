import { formatToMoney, showError } from '@/utils';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
const baseURL = import.meta.env.VITE_API_BASE_URL;

const dataTrip = {
  Id: 1,
  RouterName: "Hà Nội - Đà Nẵng",
  BusName: "Xe giường nằm 2 tầng",
  DriverName: "Tài xế Minh",
  Price: 300000,
  Status: 1,
  DepartureTime: "10:00",
  Date: "2024-01-01",
};

export default function OrderPage() {
  const location = useLocation();
  const seats = new URLSearchParams(location.search).get("seat");
  const seatsList = seats.split(",");
  const trip = new URLSearchParams(location.search).get("trip");
  const [profile, setProfile] = useState();


  const [tripDetail, setTripDetail] = useState(dataTrip)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();


  useEffect(() => {
    const profile = localStorage.getItem("bus-profile");
    if (profile) {
      const parsedProfile = JSON.parse(profile);
      setProfile(parsedProfile);
      setValue("name", profile.name);
      setValue("phoneNumber", profile.phoneNumber);
    }
  }, []);

  const onSubmit = (data) => {
    const payload = {
      phoneNumber: data.phone,
    };
    fetch(`${baseURL}/customers/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        const result = await res.json();
        if (res.status === 200) {
        } else {
          showError(result.message);
        }
      })
      .catch(() => {
        showError();
      });
  };

  return (
    <div className="px-8 md:px-10 w-full max-w-[1200px] mx-auto py-10 my-20">
      <form onSubmit={handleSubmit(onSubmit)} className="flex max-md:flex-col w-full gap-6">
        <div className="flex flex-col md:w-2/3 gap-2 border shadow-md rounded-md p-4">
          <p className='text-xl font-bold '>Thông tin liên hệ</p>
          <div className='flex flex-col gap-2'>
            <div className="flex flex-col gap-1">
              <label className="text-sm">Tên người đi</label>
              <input
                type="text"
                placeholder="Nhập họ và tên..."
                defaultValue={profile?.name}
                className={`border px-5 py-2 rounded-lg ${
                  errors.username ? "border-red-500" : "border-gray"
                }`}
                {...register("username", {
                  required: "Vui lòng nhập họ và tên người đi",
                  minLength: {
                    value: 6,
                    message: "Tên phải từ 6 ký tự trở lên",
                  },
                })}
              />
            </div>
            <div className="flex flex-col gap-2 mb-4 w-full">
              <label className="text-sm">Số điện thoại</label>
              <input
                inputMode="numeric"
                placeholder="Nhập số điện thoại..."
                defaultValue={profile?.phoneNumber}
                className={`border px-5 py-2 w-full rounded-lg ${
                  errors.phone ? "border-red-500" : "border-gray"
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
          </div>
          <hr />
          <p className="text-xl font-bold">Chi tiết chuyến đi</p>
          <div className="flex border shadow-sm p-4 rounded-md gap-2">
            <img
              src="https://placehold.co/120"
              className="w-32 h-32 object-cover"
            />
            <div className=" flex flex-col">
              <p className="text-lg font-bold">{tripDetail?.RouterName}</p>
              <p className="">{tripDetail?.BusType ?? "Xe giường nằm"}</p>
              <p className="">
                <span className="font-semibold">Ngày khởi hành: </span>
                {tripDetail?.Date}
              </p>
              <p className="">
                <span className="font-semibold">Giờ khởi hành: </span>
                {tripDetail?.DepartureTime}
              </p>
              <p className="">
                <span className="font-semibold">Ghế: </span>
                {seats}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:w-[400px] gap-2 border shadow-md rounded-md p-4 h-fit sticky top-22">
          <p className="text-xl font-bold">Thanh toán</p>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between">
              <p className="font-semibold text-lg">Giá vé:</p>
              <p className="text-lg">{formatToMoney(tripDetail?.Price ?? 0)}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className='font-semibold text-lg'>Số lượng ghế:</p>
              <p className='text-lg'>{seatsList?.length ?? 1}</p>
            </div>
            <hr />
            <div className="flex flex-row justify-between">
              <p className="font-semibold text-lg">Tổng tiền:</p>
              <p className="text-lg">
                {formatToMoney(tripDetail?.Price * seatsList?.length)}
              </p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="font-semibold text-lg">Mã khuyến mãi: </p>
              <input className="p-2 h-[32px] border border-primary rounded-md max-w-[130px]" />
            </div>
            <button
              type="submit"
              className="bg-primary text-white font-bold py-2 mt-2 px-4 rounded-md"
            >
              Thanh toán
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
