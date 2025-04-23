import SidebarAdmin from '@/components/common/sidebar-admin';
import { showError, showSuccess } from '@/utils';
import React from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function AddRouterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const yourToken = localStorage.getItem('bus-token');

  const onSubmit = (data) => {
    const payload = {
      ...data,
      distance: parseInt(data.distance),
      estimatedDuration: parseInt(data.estimatedDuration),
    };
    fetch(`${baseURL}/api/Route`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${yourToken}`,
        "ngrok-skip-browser-warning": 69420,
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        // const result = await res.json();
        if (res.status === 201) {
          showSuccess();
          navigate('/admin/router');
        } else {
          showError();
        }
      })
      .catch(() => {
        showError();
      });
  };

  return (
    <div className='flex flex-row w-full'>
      <SidebarAdmin />
      <div className='flex flex-col w-full'>
        <div className="flex justify-between items-center h-[60px] px-4 shadow-lg">
          <h1 className='text-2xl font-bold'>Tạo tuyến đường</h1>
        </div>
        <div className="bg-white rounded-xl border border-gray-300 p-4 mt-10 mx-10">
          <form className="text-sm" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-10 w-full">
              <div className="flex flex-col gap-2 mb-4 w-full">
                <label className="text-sm">Tên tuyến đường</label>
                <input
                  type="text"
                  className={`border px-5 py-2 rounded-lg ${errors.routeName ? "border-red-500" : "border-gray"
                    }`}
                  {...register("routeName", {
                    required: "Vui lòng nhập dữ liệu",
                    minLength: {
                      value: 6,
                      message: "Cần nhập từ 6 ký tự trở lên",
                    },
                  })}
                />
                {errors.routeName && (
                  <p className="text-red-500 text-xs">{errors.routeName.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 mb-4 w-full">
                <label className="text-sm">Khoảng cách</label>
                <input
                  type="number"
                  inputMode="numeric"
                  className={`border px-5 py-2 rounded-lg ${errors.distance ? "border-red-500" : "border-gray"
                    }`}
                  {...register("distance", {
                    required: "Vui lòng nhập dữ liệu",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Chỉ được nhập số",
                    },
                  })}
                />
                {errors.distance && (
                  <p className="text-red-500 text-xs">{errors.distance.message}</p>
                )}
              </div>
            </div>
            <div className="flex gap-10 w-full">
              <div className="flex flex-col gap-2 mb-4 w-full">
                <label className="text-sm">
                  Thời gian ước tính
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  className={`border px-5 py-2 rounded-lg ${errors.estimatedDuration ? "border-red-500" : "border-gray"
                    }`}
                  {...register("estimatedDuration", {
                    required: "Vui lòng nhập dữ liệu",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Chỉ được nhập số",
                    },
                  })}estimatedDuration
                />
                {errors.estimatedDuration && (
                  <p className="text-red-500 text-xs">{errors.estimatedDuration.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 mb-4 w-full"></div>
            </div>
            <div className="flex gap-4 justify-end">
              <Link
                to="/admin/router"
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