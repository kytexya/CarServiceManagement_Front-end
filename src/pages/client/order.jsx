import ImgBusDefault from '@/assets/images/bus-default.jpeg'
import Loading from '@/components/common/loading';

import { formatDateTime, formatToMoney, showError, showSuccess } from '@/utils';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function OrderPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const seats = new URLSearchParams(location.search).get('seat');
  const seatsList = seats.split(',');
  const trip = new URLSearchParams(location.search).get('trip');
  const [profile, setProfile] = useState();
  const [tripDetail, setTripDetail] = useState()
  const [transaction, setTransaction] = useState()
  const [loading, setLoading] = useState(false)
  const [booked, setBooked] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setLoading(true);
    axios.get(`${baseURL}/api/Trip/${trip}`, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 69420,
      }
    })
      .then((res) => {
        const result = res.data;
        if (res.status === 200) {
          setTripDetail(result);
        } else {
          showError(result?.message);
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        showError(e.response?.data?.message);
      });
  }, [trip]);

  useEffect(() => {
    const profile = localStorage.getItem("bus-profile");
    if (profile) {
      const parsedProfile = JSON.parse(profile);
      setProfile(parsedProfile);
      setValue('name', profile.name)
      setValue('phoneNumber', profile.phoneNumber)
    } else {
      navigate('/login')
    }
  }, []);

  const onSubmit = () => {
    if (profile?.customerId === undefined) {
      showError('Vui lòng sử dụng tài khoản người dùng.');
      return;
    }
    setLoading(true);
    const payload = {
      customerId: profile.customerId,
      tripId: tripDetail.tripId,
      seats: seatsList,
    }
    axios.post(`${baseURL}/api/Book`, payload, {
      headers: {
        'ngrok-skip-browser-warning': 69420,
        'Content-Type': 'application/json',
      }
    })
      .then((res) => {
        if (res.status === 200) {
          setTransaction(res?.data?.data)
          setBooked(true);
        }
        setLoading(false);
      })
      .catch((e) => {
        showError(e.response?.data?.message);
        setLoading(false);
      });
  };

  const handleCreatePayment = () => {
    const payload = {
      orderType: "Thanh Toán Vé",
      amount: transaction?.totalPrice,
      orderDescription: "Thanh Toán Vé",
      name: profile?.name,
      bookId: transaction.bookId,
    }
    axios.post(`${baseURL}/api/Payment/create-vnpay`, payload, {
      headers: {
        'ngrok-skip-browser-warning': 69420,
        'Content-Type': 'application/json',
      }
    })
      .then((res) => {
        if (res.status === 200) {
          window.location.href = res?.data?.paymentUrl;
          setLoading(false);
        }
      })
      .catch((e) => {
        setLoading(false);
        showError(e.response?.data?.message);
      });
  };

  if (loading) {
    return <Loading />
  }

  return (
    <div className="px-8 md:px-10 w-full max-w-[1200px] mx-auto py-10 my-20">
      <form onSubmit={handleSubmit(onSubmit)} className="flex max-md:flex-col w-full justify-center gap-6">
        {booked === false ?
          <>
            <div className="flex flex-col md:w-2/3 gap-2 border shadow-md rounded-md p-4">
              <p className='text-xl font-bold '>Thông tin liên hệ</p>
              <div className='flex flex-col gap-2'>
                <div className="flex flex-col gap-1">
                  <label className="text-sm">Tên người đi</label>
                  <input
                    type="text"
                    placeholder="Nhập họ và tên..."
                    defaultValue={profile?.name}
                    disabled
                    className={`border px-5 py-2 rounded-lg ${errors.name ? "border-red-500" : "border-gray"
                      }`}
                    {...register("name", {
                      required: "Vui lòng nhập họ và tên người đi",
                      minLength: {
                        value: 6,
                        message: "Tên phải từ 6 ký tự trở lên",
                      },
                    })}
                  />
                </div>
                <div className="flex flex-col gap-2 mb-4 w-full">
                  <label className="text-sm">
                    Số điện thoại
                  </label>
                  <input
                    inputMode="numeric"
                    disabled
                    placeholder="Nhập số điện thoại..."
                    defaultValue={profile?.phoneNumber}
                    className={`border px-5 py-2 w-full rounded-lg ${errors.phoneNumber ? "border-red-500" : "border-gray"
                      }`}
                    {...register("phoneNumber", {
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
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-xs">{errors.phoneNumber.message}</p>
                  )}
                </div>
              </div>
              <hr />
              <p className='text-xl font-bold'>Thông tin chuyến đi: {tripDetail?.routeName}</p>
              <div className="border shadow-sm p-4 rounded-md">
                <p className="text-dark font-semibold text-xl mb-2">Thông tin xe</p>
                <div className="flex justify-between gap-2">
                  <div className=" flex flex-col">
                    <p className=''>
                      <span className="text-gray-500 text-sm">• </span>
                      <span className="font-semibold">Loại xe: </span>
                      {tripDetail?.busType}</p>
                    <p className=''>
                      <span className="text-gray-500 text-sm">• </span>
                      <span className="font-semibold">Biển số xe: </span>
                      {tripDetail?.busId}</p>
                    <p className=''>
                      <span className="text-gray-500 text-sm">• </span>
                      <span className="font-semibold">Ngày khởi hành: </span>
                      {tripDetail?.date}</p>
                    <p className=''>
                      <span className="text-gray-500 text-sm">• </span>
                      <span className="font-semibold">Giờ khởi hành: </span>
                      {tripDetail?.departureTime}</p>
                    <p className=''>
                      <span className="text-gray-500 text-sm">• </span>
                      <span className="font-semibold">Ghế: </span>
                      {seats}</p>
                  </div>
                  <div className='rounded-md shadow-lg  h-fit'>
                    <img
                      src={ImgBusDefault}
                      className='w-[120px] aspect-square rounded-md'
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 mt-4">
                  <p className="text-dark font-semibold text-xl">Điểm dừng - Thời gian nghỉ</p>
                  {tripDetail?.locationRoutes?.length > 0 && tripDetail?.locationRoutes.map((item, index) => (
                    <div key={index} className="flex flex-row gap-1 items-center">
                      <span className="text-gray-500 text-sm">•</span>
                      <p className="text-xs text-gray-600 font-semibold">{item?.locationName}:</p>
                      <p className="text-xs text-gray-600 font-semibold">{item?.stopDuration && item?.stopDuration.slice(-5) || '0 phút'}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col md:w-[400px] gap-2 border shadow-md rounded-md p-4 h-fit sticky top-22">
              <p className='text-xl font-bold'>Thanh toán</p>
              <div className="flex flex-col gap-2">
                <div className="flex flex-row justify-between">
                  <p className='font-semibold text-lg'>Giá vé:</p>
                  <p className='text-lg'>{formatToMoney(tripDetail?.price ?? 0)}</p>
                </div>
                <div className="flex flex-row justify-between">
                  <p className='font-semibold text-lg'>Số lượng ghế:</p>
                  <p className='text-lg'>{seatsList?.length ?? 1}</p>
                </div>
                <hr />
                <div className="flex flex-row justify-between">
                  <p className='font-semibold text-lg'>Tổng tiền:</p>
                  <p className='text-lg'>{formatToMoney(tripDetail?.price * seatsList?.length)}</p>
                </div>
                <button type="submit" className="bg-primary text-white font-bold py-2 mt-2 px-4 rounded-md">Xác nhận đặt vé</button>
              </div>
            </div>
          </>
          :
          <div className="flex flex-col md:max-w-fit min-w-[600px] gap-2 border shadow-md rounded-md p-4 h-fit sticky top-22">
            <p className='text-xl font-bold'>Thanh toán</p>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-6 justify-between">
                <p className='font-semibold text-lg'>Mã thanh toán:</p>
                <p className='text-lg'>{transaction?.bookId}</p>
              </div>
              <div className="flex flex-row gap-6 justify-between">
                <p className='font-semibold text-lg'>Mã khách hàng:</p>
                <p className='text-lg'>{transaction?.customerId}</p>
              </div>
              <div className="flex flex-row gap-6 justify-between">
                <p className='font-semibold text-lg'>Thời gian:</p>
                <p className='text-lg'>{formatDateTime(transaction?.createdAt)}</p>
              </div>
              <div className="flex flex-row justify-between">
                <p className='font-semibold text-lg'>Giá vé:</p>
                <p className='text-lg'>{formatToMoney(tripDetail?.price ?? 0)}</p>
              </div>
              <div className="flex flex-row justify-between">
                <p className='font-semibold text-lg'>Số lượng ghế:</p>
                <p className='text-lg'>{seatsList?.length ?? 1}</p>
              </div>
              <div className="flex flex-row justify-between">
                <p className='font-semibold text-lg'>Tổng tiền:</p>
                <p className='text-lg'>{formatToMoney(transaction?.totalPrice)}</p>
              </div>
              <button type="button" onClick={handleCreatePayment} className="bg-primary text-white font-bold py-2 mt-2 px-4 rounded-md">Đến trang thanh toán</button>
            </div>
          </div>
        }
      </form>
    </div>
  )
}