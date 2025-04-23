<<<<<<< HEAD
import SidebarAdmin from "@/components/common/sidebar-admin";
import CustomTable from "@/components/common/table";
import { showError, showSuccess } from "@/utils";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
const baseURL = import.meta.env.VITE_API_BASE_URL;

const detailData = {
  busId: "S27287222",
  busType: "Xe khách lớn",
  totalSeats: 20,
  bookedSeats: 10,
  seats: [
    {
      seatId: "S1022",
      isBooked: true,
    },
  ],
};

const columns = [
  {
    header: "Id",
    field: "seatId",
  },
  {
    header: "Trạng thái",
    field: "isBooked",
    className: "status-box",
  },
];
=======
import SidebarAdmin from '@/components/common/sidebar-admin';
import CustomTable from '@/components/common/table';
import { showError, showSuccess } from '@/utils';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
const baseURL = import.meta.env.VITE_API_BASE_URL;

const columns = [
  {
    header: 'Id',
    field: 'seatId',
  },
  {
    header: 'Trạng thái',
    field: 'isBooked',
    className: 'status-box'
  },
]
>>>>>>> fd857470d9b4ae59521bdad5f2fda5de3d61fb44

export default function EditBusPage() {
  const { id } = useParams();
  const [detail, setDetail] = useState();
  const [dataSeats, setDataSeats] = useState([]);
<<<<<<< HEAD
  const yourToken = localStorage.getItem("bus-token");
=======
  const yourToken = localStorage.getItem('bus-token');
>>>>>>> fd857470d9b4ae59521bdad5f2fda5de3d61fb44
  const navigate = useNavigate();
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetch(`${baseURL}/api/Buses/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": 69420,
<<<<<<< HEAD
        Authorization: `Bearer ${yourToken}`,
=======
        "Authorization": `Bearer ${yourToken}`,
>>>>>>> fd857470d9b4ae59521bdad5f2fda5de3d61fb44
      },
    })
      .then(async (res) => {
        const result = await res.json();
        if (res.status === 200) {
          setDetail(result);
<<<<<<< HEAD
          setDataSeats(
            result.seats.map((item) => ({
              ...item,
              isBooked: item.isBooked ? "Đã đặt" : "Chưa đặt",
            }))
          );
          setValue("busId", result.busId);
          setValue("seatCount", result.seatCount);
          setValue("busType", result.busType);
=======
          setDataSeats(result.seats.map((item) => ({ ...item, isBooked: item.isBooked ? 'Đã đặt' : 'Chưa đặt' })));
          setValue('busId', result.busId);
          setValue('seatCount', result.seatCount);
          setValue('busType', result.busType);
>>>>>>> fd857470d9b4ae59521bdad5f2fda5de3d61fb44
        } else {
          showError();
        }
      })
      .catch(() => {
        showError();
      });
<<<<<<< HEAD
  }, []);
=======
  }, [])
>>>>>>> fd857470d9b4ae59521bdad5f2fda5de3d61fb44

  const onSubmit = (data) => {
    const payload = {
      ...data,
      seatCount: parseInt(data.seatCount),
    };
    fetch(`${baseURL}/api/buses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
<<<<<<< HEAD
        Authorization: `Bearer ${yourToken}`,
=======
        "Authorization": `Bearer ${yourToken}`,
>>>>>>> fd857470d9b4ae59521bdad5f2fda5de3d61fb44
        "ngrok-skip-browser-warning": 69420,
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        // const result = await res.json();
        if (res.status === 200) {
          showSuccess();
<<<<<<< HEAD
          navigate("/admin/bus");
=======
          navigate('/admin/bus');
>>>>>>> fd857470d9b4ae59521bdad5f2fda5de3d61fb44
        } else {
          showError();
        }
      })
      .catch(() => {
        showError();
      });
  };

  return (
<<<<<<< HEAD
    <div className="flex flex-row w-full">
      <SidebarAdmin />
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center h-[60px] px-4 shadow-lg">
          <h1 className="text-2xl font-bold">Cập nhật xe</h1>
=======
    <div className='flex flex-row w-full'>
      <SidebarAdmin />
      <div className='flex flex-col w-full'>
        <div className="flex justify-between items-center h-[60px] px-4 shadow-lg">
          <h1 className='text-2xl font-bold'>Cập nhật xe</h1>
>>>>>>> fd857470d9b4ae59521bdad5f2fda5de3d61fb44
        </div>
        <div className="bg-white rounded-xl border border-gray-300 p-4 mt-10 mx-10">
          <form className="text-sm" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-10 w-full">
              <div className="flex flex-col gap-2 mb-4 w-full">
                <label className="text-sm">Tên loại xe</label>
                <input
                  type="text"
                  defaultValue={detail?.busType}
<<<<<<< HEAD
                  className={`border px-5 py-2 rounded-lg ${
                    errors.busType ? "border-red-500" : "border-gray"
                  }`}
=======
                  className={`border px-5 py-2 rounded-lg ${errors.busType ? "border-red-500" : "border-gray"
                    }`}
>>>>>>> fd857470d9b4ae59521bdad5f2fda5de3d61fb44
                  {...register("busType", {
                    required: "Vui lòng nhập dữ liệu",
                    minLength: {
                      value: 6,
                      message: "Cần nhập từ 6 ký tự trở lên",
                    },
                  })}
                />
<<<<<<< HEAD
                {errors.BusType && (
                  <p className="text-red-500 text-xs">
                    {errors.BusType.message}
                  </p>
=======
                {errors.busType && (
                  <p className="text-red-500 text-xs">{errors.busType.message}</p>
>>>>>>> fd857470d9b4ae59521bdad5f2fda5de3d61fb44
                )}
              </div>
              <div className="flex flex-col gap-2 mb-4 w-full">
                <label className="text-sm">Số ghế</label>
                <input
                  type="number"
                  inputMode="numeric"
                  defaultValue={detail?.seatCount}
                  disabled
<<<<<<< HEAD
                  className={`border px-5 py-2 rounded-lg ${
                    errors.seatCount ? "border-red-500" : "border-gray"
                  }`}
                  {...register("SeatCount", {
=======
                  className={`border px-5 py-2 rounded-lg ${errors.seatCount ? "border-red-500" : "border-gray"
                    }`}
                  {...register("seatCount", {
>>>>>>> fd857470d9b4ae59521bdad5f2fda5de3d61fb44
                    required: "Vui lòng nhập dữ liệu",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Chỉ được nhập số",
                    },
                  })}
                />
                {errors.seatCount && (
<<<<<<< HEAD
                  <p className="text-red-500 text-xs">
                    {errors.seatCount.message}
                  </p>
=======
                  <p className="text-red-500 text-xs">{errors.seatCount.message}</p>
>>>>>>> fd857470d9b4ae59521bdad5f2fda5de3d61fb44
                )}
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-sm mb-2">Danh sách ghế</h2>
<<<<<<< HEAD
              <CustomTable columns={columns} data={dataSeats ?? []} />
            </div>
            <div className="flex gap-4 justify-end mt-4">
              <Link to="/admin/bus" className="button float-right !w-[145px]">
=======
              <CustomTable
                columns={columns}
                data={dataSeats ?? []}
              />
            </div>
            <div className="flex gap-4 justify-end mt-4">
              <Link
                to="/admin/bus"
                className="button float-right !w-[145px]"
              >
>>>>>>> fd857470d9b4ae59521bdad5f2fda5de3d61fb44
                Quay lại
              </Link>
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
    </div>
<<<<<<< HEAD
  );
}
=======
  )
}
>>>>>>> fd857470d9b4ae59521bdad5f2fda5de3d61fb44
