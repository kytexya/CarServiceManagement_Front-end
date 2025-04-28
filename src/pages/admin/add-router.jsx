import Loading from '@/components/common/loading';
import SidebarAdmin from '@/components/common/sidebar-admin';
import { showError, showSuccess } from '@/utils';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function AddRouterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const yourToken = localStorage.getItem('bus-token');
  const [locationList, setDataLocationStart] = useState([]);
  const [locationEndList, setDataLocationEnd] = useState([]);

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    const list = locationList.filter((item) => item.value !== watch('locationStart'));
    setDataLocationEnd(list);
    setValue('locationEnd', undefined);
    setValue('routeName', undefined);
  }, [watch('locationStart')]);

  useEffect(() => {locationEndList
    if (!watch('locationStart') || !watch('locationEnd')) return
    const locationStartName = locationList.find((item) => item.value === watch('locationStart'))?.label;
    const locationEndName = locationEndList.find((item) => item.value === watch('locationEnd'))?.label;
    if (locationStartName && locationEndName) {
      setValue('routeName', `${locationStartName} - ${locationEndName}`);
    }
  }, [watch('locationStart'), watch('locationEnd')])

  function callApi() {
    axios.get(`${baseURL}/api/Location`, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 69420,
        'Authorization': `Bearer ${yourToken}`
      },
      params: {
        Page: 1,
        PageSize: 10000,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          const listData = res.data?.data || [];
          const listLocationActive = listData.filter((item) => !item.isDelete);
          setDataLocationStart(listLocationActive.map((item) => ({
            value: item.locationId,
            label: item.locationName
          })));
        }
      })
      .catch((error) => {
        showError(error?.response?.data?.message);
      });
  }

  const onSubmit = (data) => {
    const payload = {
      ...data,
      distance: parseInt(data.distance),
      estimatedDuration: parseInt(data.estimatedDuration),
    };
    axios.post(`${baseURL}/api/Route`, payload, {
      headers: {
        'Authorization': `Bearer ${yourToken}`,
        'ngrok-skip-browser-warning': 69420,
        'Content-Type': 'application/json',
      }
    })
      .then((res) => {
        if (res?.status === 200) {
          showSuccess();
          navigate('/admin/router');
        }
      })
      .catch((e) => {
        showError(e.response?.data?.message);
      });
  };

  if (locationList.length === 0) {
    return <Loading/>
  }

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
                <label className="text-sm">Chọn điểm bắt đầu</label>
                <select
                  className={`border px-5 py-2 rounded-lg ${errors.locationStart ? "border-red-500" : "border-gray"
                    }`}
                  {...register("locationStart", {
                    required: "Vui lòng chọn dữ liệu",
                  })}
                >
                  <option></option>
                  {locationList.length > 0 && locationList?.map((item) => (
                    <option value={item.value}>{item.label}</option>
                  ))}
                </select>
                {errors.locationStart && (
                  <p className="text-red-500 text-xs">{errors.locationStart.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 mb-4 w-full">
                <label className="text-sm">Chọn điểm kết thúc</label>
                <select
                  className={`border px-5 py-2 rounded-lg ${errors.locationEnd ? "border-red-500" : "border-gray"
                    }`}
                  {...register("locationEnd", {
                    required: "Vui lòng chọn dữ liệu",
                  })}
                >
                  <option></option>
                  {locationEndList.length > 0 && locationEndList?.map((item) => (
                    <option value={item.value}>{item.label}</option>
                  ))}
                </select>
                {errors.locationEnd && (
                  <p className="text-red-500 text-xs">{errors.locationEnd.message}</p>
                )}
              </div>
            </div>

            <div className="flex gap-10 w-full">
              <div className="flex flex-col gap-2 mb-4 w-full">
                <label className="text-sm">Tuyến đường</label>
                <input
                  type="text"
                  disabled
                  className={`border px-5 py-2 rounded-lg ${errors.routeName ? "border-red-500" : "border-gray"
                    }`}
                  value={watch('routeName')}
                  {...register("routeName", {
                    required: "Vui lòng nhập dữ liệu",
                    minLength: {
                      value: 4,
                      message: "Cần nhập từ 4 ký tự trở lên",
                    },
                  })}
                />
                {errors.routeName && (
                  <p className="text-red-500 text-xs">{errors.routeName.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 mb-4 w-full">
                <label className="text-sm">Khoảng cách(km)</label>
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
                  Thời gian ước tính(giờ)
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
                  })}
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