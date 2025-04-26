import Loading from '@/components/common/loading';
import SidebarAdmin from '@/components/common/sidebar-admin';
import { convertDateFormat, formatDateToInput, showError, showSuccess, timeToMinutes } from '@/utils';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function EditTripPage() {
  const { id } = useParams();
  const {
    setValue,
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [data, setData] = useState()
  const yourToken = localStorage.getItem('bus-token');
  const [routerList, setRouterList] = useState([]);
  const [driveList, setDriveList] = useState([]);
  const [busList, setBusList] = useState([]);
  const [locationList, setLocation] = useState([]);

  useEffect(() => {
    fetchRoute();
    fetchDrive();
    fetchBus();
    fetchLocation();
  }, [])


  useEffect(() => {
    axios.get(`${baseURL}/api/Trip/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 69420,
        'Authorization': `Bearer ${yourToken}`,
      }
    })
      .then((res) => {
        const result = res.data;
        if (res.status === 200) {
          setData(result);
          setValue('tripId', result.tripId);
          setValue('routeId', result.routeId);
          setValue('routeName', result.routeName);
          setValue('busId', result.busId);
          setValue('busType', result.busType);
          setValue('driverId', result.driverId);
          setValue('driverName', result.driverName);
          setValue('departureTime', result.departureTime);
          setValue('date', formatDateToInput(result.date));
          setValue('direction', result.direction);
          setValue('price', result.price);

          const locationData = result.locationRoutes.map((item) => ({
            locationId: item.locationId,
            stopDurationMinutes: timeToMinutes(item.stopDuration)
          }))
          setValue('locationRoutes', locationData);
        } else {
          showError(result?.message);
        }
      })
      .catch((e) => {
        showError(e.response?.data?.message);
      });
  }, [id]);

  function fetchRoute() {
    axios.get(`${baseURL}/api/Route`, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 69420,
        'Authorization': `Bearer ${yourToken}`
      },
      params: {
        Page: 1,
        PageSize: -1,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          const result = res?.data?.data?.filter((item) => item.isDelete === false);
          setRouterList(result?.map((item) => ({
            value: item.routeId,
            label: item.routeName
          })));
        }
      })
      .catch((error) => {
        showError(error?.response?.data?.message);
      });
  }
  function fetchDrive() {
    axios.get(`${baseURL}/api/User`, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 69420,
        'Authorization': `Bearer ${yourToken}`
      },
    })
      .then((res) => {
        if (res.status === 200) {
          const result = res?.data?.data;
          const data = result?.filter((item) => item.role === 3);
          setDriveList(data.map((item) => ({
            value: item.userId,
            label: item.name
          })));
        } else {
          showError();
        }
      })
      .catch((error) => {
        console.error('Axios error:', error);
        showError();
      });
  }

  function fetchBus() {
    axios.get(`${baseURL}/api/buses`, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 69420,
        'Authorization': `Bearer ${yourToken}`
      },
    })
      .then((res) => {
        if (res.status === 200) {
          const result = res?.data?.data?.filter((item) => item.isDelete === false);
          setBusList(result?.map((item) => ({
            value: item.busId,
            label: item.busType
          })));
        } else {
          showError();
        }
      })
      .catch((error) => {
        console.error('Axios error:', error);
        showError();
      });

  }

  function fetchLocation() {
    axios.get(`${baseURL}/api/Location`, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 69420,
        'Authorization': `Bearer ${yourToken}`
      }
    })
      .then((res) => {
        if (res.status === 200) {
          const result = res?.data?.data;
          setLocation(result.map((item) => ({
            value: item.locationId,
            label: item.locationName
          })));
        } else {
          showError();
        }
      })
      .catch((error) => {
        console.error('Axios error:', error);
        showError();
      });
  }

  const onSubmit = (data) => {
    const payload = {
      routeId: data.routeId,
      busId: data.busId,
      driverId: data.driverId,
      departureTime: data.departureTime,
      date: convertDateFormat(data.date),
      direction: data.direction,
      price: parseInt(data.price),
      status: data.status,
      locationRoutes: data.locationRoutes
    }
    axios.put(`${baseURL}/api/Trip/${id}`, payload, {
      headers: {
        'Authorization': `Bearer ${yourToken}`,
        'ngrok-skip-browser-warning': 69420,
        'Content-Type': 'application/json',
      }
    })
      .then((res) => {
        if (res.status === 200) {
          showSuccess();
          navigate('/admin/trip');
        } else {
          showError();
        }
      })
      .catch(() => {
        showError();
      });
  };

  const defaultDate = formatDateToInput(data?.date);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "locationRoutes"
  });

  if (routerList.length === 0 || driveList.length === 0 || busList.length === 0 || locationList.length === 0 || data === undefined) {
    return (
      <Loading />
    )
  }

  return (
    <div className='flex flex-row w-full'>
      <SidebarAdmin />
      <div className='flex flex-col w-full'>
        <div className="flex justify-between items-center h-[60px] px-4 shadow-lg">
          <h1 className='text-2xl font-bold'>Sửa chuyến đi</h1>
        </div>
        <div className="bg-white rounded-xl border border-gray-300 p-4 mt-10 mx-10">
          <form className="text-sm" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-10 w-full">
              <div className="flex flex-col gap-2 mb-4 w-full">
                <label className="text-sm">Tuyến đường</label>
                <select
                  defaultValue={data?.routeId}
                  className={`border px-5 py-2 rounded-lg ${errors.routeId ? "border-red-500" : "border-gray"
                    }`}
                  {...register("routeId", {
                    required: "Vui lòng chọn dữ liệu",
                  })}
                >
                  <option></option>
                  {routerList.length > 0 && routerList?.map((item) => (
                    <option value={item.value}>{item.label}</option>
                  ))}
                </select>
                {errors.routeId && (
                  <p className="text-red-500 text-xs">{errors.routeId.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 mb-4 w-full">
                <label className="text-sm">Xe</label>
                <select
                  defaultValue={data?.busId}
                  className={`border px-5 py-2 rounded-lg ${errors.busId ? "border-red-500" : "border-gray"
                    }`}
                  {...register("busId", {
                    required: "Vui lòng chọn dữ liệu",
                  })}
                >
                  <option></option>
                  {busList.length > 0 && busList?.map((item) => (
                    <option value={item.value}>{item.label}</option>
                  ))}
                </select>
                {errors.busId && (
                  <p className="text-red-500 text-xs">{errors.busId.message}</p>
                )}
              </div>
            </div>

            <div className="flex gap-10 w-full">
              <div className="flex flex-col gap-2 mb-4 w-full">
                <label className="text-sm">Tài xế</label>
                <select
                  defaultValue={data?.driverId}
                  className={`border px-5 py-2 rounded-lg ${errors.driverId ? "border-red-500" : "border-gray"
                    }`}
                  {...register("driverId", {
                    required: "Vui lòng chọn dữ liệu",
                  })}
                >
                  <option></option>
                  {driveList.length > 0 && driveList?.map((item) => (
                    <option value={item.value}>{item.label}</option>
                  ))}
                </select>
                {errors.driverId && (
                  <p className="text-red-500 text-xs">{errors.driverId.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 mb-4 w-full">
                <label className="text-sm">Giá vé</label>
                <input
                  type="text"
                  inputMode="numeric"
                  defaultValue={data?.price}
                  className={`border px-5 py-2 rounded-lg ${errors.price ? "border-red-500" : "border-gray"
                    }`}
                  {...register("price", {
                    required: "Vui lòng chọn dữ liệu",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Chỉ được nhập chữ số",
                    },
                  })}
                />
                {errors.price && (
                  <p className="text-red-500 text-xs">{errors.price.message}</p>
                )}
              </div>
            </div>

            <div className="flex gap-10 w-full">
              <div className="flex flex-col gap-2 mb-4 w-full">
                <label className="text-sm">Giờ khởi hành</label>
                <input
                  type="time"
                  defaultValue={data?.departureTime}
                  className={`border px-5 py-2 rounded-lg ${errors.departureTime ? "border-red-500" : "border-gray"
                    }`}
                  {...register("departureTime", {
                    required: "Vui lòng chọn dữ liệu",
                  })}
                />
                {errors.departureTime && (
                  <p className="text-red-500 text-xs">{errors.departureTime.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 mb-4 w-full">
                <label className="text-sm">Ngày khởi hành</label>
                <input
                  type="date"
                  defaultValue={defaultDate ?? new Date().toISOString().split('T')[0]}
                  className={`border px-5 py-2 rounded-lg ${errors.date ? "border-red-500" : "border-gray"
                    }`}
                  {...register("date", {
                    required: "Vui lòng chọn dữ liệu",
                  })}
                />
                {errors.date && (
                  <p className="text-red-500 text-xs">{errors.date.message}</p>
                )}
              </div>
            </div>

            <div className="flex gap-10 w-full">
              <div className="flex flex-col gap-2 mb-4 w-full">
                <label className="text-sm">Mô tả</label>
                <input
                  type='text'
                  defaultValue={data?.direction}
                  className={`border px-5 py-2 rounded-lg ${errors.direction ? "border-red-500" : "border-gray"
                    }`}
                  {...register("direction", {
                    required: "Vui lòng chọn dữ liệu",
                  })}
                />
                {errors.direction && (
                  <p className="text-red-500 text-xs">{errors.direction.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 mb-4 w-full">
                <label className="text-sm">Trạng thái</label>
                <select
                  className={`border px-5 py-2 rounded-lg ${errors.status ? "border-red-500" : "border-gray"
                    }`}
                  {...register("status", {
                    required: "Vui lòng chọn dữ liệu",
                  })}
                >
                  <option value="Chưa khởi hành">Chưa khởi hành</option>
                  <option value="Đã khởi hành">Đã khỏi hành</option>
                </select>
                {errors.status && (
                  <p className="text-red-500 text-xs">{errors.status.message}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-4 w-full">
              <label className="text-sm">Điểm dừng</label>
              <div>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-4 mb-2">
                    <select
                      {...register(`locationRoutes.${index}.locationId`, { required: true })}
                      className="border p-2 rounded"
                    >
                      <option value="">-- Chọn điểm dừng --</option>
                      {locationList.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>

                    <input
                      type="number"
                      placeholder="Phút nghỉ"
                      min={0}
                      {...register(`locationRoutes.${index}.stopDurationMinutes`, {
                        valueAsNumber: true,
                        required: true
                      })}
                      className="border p-2 w-32 rounded"
                    />
                    <button type="button" onClick={() => remove(index)} className="text-red-500">Xoá</button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => append({ locationId: "", stopDurationMinutes: 10 })}
                  className="button mt-2 !bg-success !text-white px-4 py-2 rounded"
                >
                  + Thêm điểm dừng
                </button>
              </div>

            </div>
            <div className="flex gap-4 justify-end">
              <Link
                to="/admin/trip"
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