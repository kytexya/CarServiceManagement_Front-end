import SidebarAdmin from '@/components/common/sidebar-admin';
import { showError, showSuccess } from '@/utils';
import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function AddBusPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const yourToken = localStorage.getItem('bus-token');
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const payload = {
      ...data,
      modelYear: parseInt(data.modelYear),
      seatCount: parseInt(data.seatCount),
    };
    axios.post(`${baseURL}/api/buses`, payload, {
      headers: {
        'Authorization': `Bearer ${yourToken}`,
        'ngrok-skip-browser-warning': 69420,
        'Content-Type': 'application/json',
      }
    })
      .then((res) => {
        if (res?.status === 200) {
          showSuccess();
          navigate('/admin/bus');
        }
      })
      .catch((e) => {
        showError(e.response?.data?.message);
      });
  };

  return (
    <div className='flex flex-row w-full'>
      <SidebarAdmin />
      <div className='flex flex-col w-full'>
        <div className="flex justify-between items-center h-[60px] px-4 shadow-lg">
          <h1 className='text-2xl font-bold'>Tạo xe mới</h1>
        </div>
        <div className="bg-white rounded-xl border border-gray-300 p-4 mt-10 mx-10">
          <form className="text-sm" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-10 w-full">
              <div className="flex flex-col gap-2 mb-4 w-full">
                <label className="text-sm">Tên loại xe</label>
                <input
                  type="text"
                  className={`border px-5 py-2 rounded-lg ${errors.busType ? "border-red-500" : "border-gray"
                    }`}
                  {...register("busType", {
                    required: "Vui lòng nhập dữ liệu",
                    minLength: {
                      value: 6,
                      message: "Cần nhập từ 6 ký tự trở lên",
                    },
                  })}
                />
                {errors.busType && (
                  <p className="text-red-500 text-xs">{errors.busType.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 mb-4 w-full">
                <label className="text-sm">Số ghế</label>
                <input
                  type="number"
                  inputMode="numeric"
                  className={`border px-5 py-2 rounded-lg ${errors.seatCount ? "border-red-500" : "border-gray"
                    }`}
                  {...register("seatCount", {
                    required: "Vui lòng nhập dữ liệu",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Chỉ được nhập số",
                    },
                  })}
                />
                {errors.seatCount && (
                  <p className="text-red-500 text-xs">{errors.seatCount.message}</p>
                )}
              </div>
            </div>
            <div className="flex gap-10 w-full">
              <div className="flex flex-col gap-2 mb-4 w-full">
                <label className="text-sm">Kiểu dáng</label>
                <input
                  type="text"
                  className={`border px-5 py-2 rounded-lg ${errors.model ? "border-red-500" : "border-gray"
                    }`}
                  {...register("model", {
                    minLength: {
                      value: 3,
                      message: "Cần nhập từ 3 ký tự trở lên",
                    },
                  })}
                />
                {errors.model && (
                  <p className="text-red-500 text-xs">{errors.model.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 mb-4 w-full">
                <label className="text-sm">Đời xe</label>
                <input
                  type="number"
                  inputMode="numeric"
                  className={`border px-5 py-2 rounded-lg ${errors.modelYear ? "border-red-500" : "border-gray"
                    }`}
                  {...register("modelYear", {
                    required: "Vui lòng nhập dữ liệu",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Chỉ được nhập số",
                    },
                  })}
                />
                {errors.modelYear && (
                  <p className="text-red-500 text-xs">{errors.modelYear.message}</p>
                )}
              </div>
            </div>

            <div className="flex gap-10 w-full">
              <div className="flex flex-col gap-2 mb-4 w-full">
                <label className="text-sm">Màu sắc</label>
                <input
                  type="text"
                  className={`border px-5 py-2 rounded-lg ${errors.color ? "border-red-500" : "border-gray"
                    }`}
                  {...register("color", {
                    minLength: {
                      value: 3,
                      message: "Cần nhập từ 3 ký tự trở lên",
                    },
                  })}
                />
                {errors.color && (
                  <p className="text-red-500 text-xs">{errors.color.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 mb-4 w-full">
                <label className="text-sm">Biển số</label>
                <input
                  type="text"
                  className={`border px-5 py-2 rounded-lg ${errors.busId ? "border-red-500" : "border-gray"
                    }`}
                  {...register("busId", {
                    minLength: {
                      value: 6,
                      message: "Cần nhập từ 6 ký tự trở lên",
                    },
                  })}
                />
                {errors.busId && (
                  <p className="text-red-500 text-xs">{errors.busId.message}</p>
                )}
              </div>
            </div>

            <div className="flex gap-4 justify-end">
              <Link
                to="/admin/bus"
                className="button float-right !w-[145px]"
              >
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
  )
}