import DriveHeader from '@/components/common/drive-header';
import CustomTable from '@/components/common/table';
import { formatToMoney, showError, showSuccess } from '@/utils';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
const baseURL = import.meta.env.VITE_API_BASE_URL;


const columns = [
  { header: 'Tên tuyến đường', field: 'RouterName' },
  { header: 'Tên khách hàng', field: 'CustomerName' },
  { header: 'Mã vé', field: 'TicketId' },
  { header: 'Mã ghế', field: 'SeatId' },
  { header: 'Giá vé', field: 'Price' },
  { header: 'Giờ khởi tạo', field: 'CreatedAt' },
  { header: 'Trạng thái', field: 'Status' },
]

const dataTemp = [
  {
    Id: 1,
    RouterName: 'Hà Nội - Đà Nẵng',
    CustomerName: 'Hoàng Minh',
    TicketId: 'Tài xế Minh',
    SeatId: 'S101',
    Price: 300000,
    CreatedAt: '10:00',
    Status: 1,
  },
  {
    Id: 2,
    RouterName: 'Đà Nẵng - Hà Nội',
    CustomerName: 'Hoàng Nam',
    SeatId: 'S102',
    TicketId: 'Tài xế Hoà',
    Price: 120000,
    CreatedAt: '12:00',
    Status: 2,
  },
]


export default function DriveTripDetailPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [dataTicketList, setDataTicketList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const convertedData = dataTemp.map((item) => ({
      ...item,
      Price: formatToMoney(item.Price),
      Status: item.Status === 2 ? 'Đã lên xe' : 'Chưa lên xe',
    }));
    setDataTicketList(convertedData);
  }, [])


  const onSubmit = (data) => {
    fetch(`${baseURL}/trip`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        // const result = await res.json();
        if (res.status === 200) {
          showSuccess();
        } else {
          showError();
        }
      })
      .catch(() => {
        showError();
      });
  };

  return (
    <div className='flex flex-col'>
      <DriveHeader />
      <form className="text-sm" onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col w-full'>
          <div className="flex justify-between items-center h-[60px] px-4 shadow-lg">
            <h1 className='text-2xl font-bold'>Chi tiết chuyến xe</h1>
          </div>
          <div className="bg-white rounded-xl border border-gray-300 p-4 mt-10 mx-10">
            <h1 className='text-xl font-bold'>Thông tin chuyến xe</h1>
            <div className="flex gap-10 w-full">
              <div className="flex flex-col gap-2 mb-4 w-full">
                <label className="text-sm">Tuyến đường</label>
                <select
                  disabled
                  className={`bg-gray-100 border px-5 py-2 rounded-lg ${errors.RouterId ? "border-red-500" : "border-gray"
                    }`}
                  {...register("RouterId", {
                    required: "Vui lòng chọn dữ liệu",
                  })}
                >
                  <option value="admin">Hà Nội - Đà Nẵng</option>
                  <option value="customer">Sài Gòn - Hà Nội</option>
                </select>
                {errors.RouterId && (
                  <p className="text-red-500 text-xs">{errors.RouterId.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 mb-4 w-full">
                <label className="text-sm">Xe</label>
                <select
                  disabled
                  className={`bg-gray-100 border px-5 py-2 rounded-lg ${errors.BusId ? "border-red-500" : "border-gray"
                    }`}
                  {...register("BusId", {
                    required: "Vui lòng chọn dữ liệu",
                  })}
                >
                  <option value="1">Xe trung chuyển</option>
                  <option value="2">Xe giường nằm</option>
                </select>
                {errors.BusId && (
                  <p className="text-red-500 text-xs">{errors.BusId.message}</p>
                )}
              </div>
            </div>

            <div className="flex gap-10 w-full">
              <div className="flex flex-col gap-2 mb-4 w-full">
                <label className="text-sm">Tài xế</label>
                <select
                  disabled
                  className={`bg-gray-100 border px-5 py-2 rounded-lg ${errors.DriverId ? "border-red-500" : "border-gray"
                    }`}
                  {...register("DriverId", {
                    required: "Vui lòng chọn dữ liệu",
                  })}
                >
                  <option value="admin">Tài xế Minh</option>
                  <option value="customer">Tài xế Hoà</option>
                </select>
                {errors.DriverId && (
                  <p className="text-red-500 text-xs">{errors.DriverId.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 mb-4 w-full">
                <label className="text-sm">Giá vé</label>
                <input
                  type="text"
                  inputMode="numeric"
                  disabled
                  className={`border px-5 py-2 rounded-lg ${errors.Price ? "border-red-500" : "border-gray"
                    }`}
                  {...register("Price", {
                    required: "Vui lòng chọn dữ liệu",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Chỉ được nhập chữ số",
                    },
                  })}
                />
                {errors.Price && (
                  <p className="text-red-500 text-xs">{errors.Price.message}</p>
                )}
              </div>
            </div>

            <div className="flex gap-10 w-full">
              <div className="flex flex-col gap-2 mb-4 w-full">
                <label className="text-sm">Giờ khởi hành</label>
                <input
                  disabled
                  type="time"
                  className={`border px-5 py-2 rounded-lg ${errors.DepartureTime ? "border-red-500" : "border-gray"
                    }`}
                  {...register("DepartureTime", {
                    required: "Vui lòng chọn dữ liệu",
                  })}
                />
                {errors.DepartureTime && (
                  <p className="text-red-500 text-xs">{errors.DepartureTime.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 mb-4 w-full">
                <label className="text-sm">Ngày khởi hành</label>
                <input
                  type="date"
                  disabled
                  className={`border px-5 py-2 rounded-lg ${errors.Date ? "border-red-500" : "border-gray"
                    }`}
                  {...register("Date", {
                    required: "Vui lòng chọn dữ liệu",
                  })}
                />
                {errors.Date && (
                  <p className="text-red-500 text-xs">{errors.Date.message}</p>
                )}
              </div>
            </div>

            <div className="flex gap-10 w-full">
              <div className="flex flex-col gap-2 mb-4 w-full">
                <label className="text-sm">Mô tả</label>
                <input
                  type='text'
                  disabled
                  className={`border px-5 py-2 rounded-lg ${errors.Direction ? "border-red-500" : "border-gray"
                    }`}
                  {...register("Direction", {
                    required: "Vui lòng chọn dữ liệu",
                  })}
                />
                {errors.Direction && (
                  <p className="text-red-500 text-xs">{errors.Direction.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 mb-4 w-full">
                <label className="text-sm">Trạng thái</label>
                <select
                  className={`border px-5 py-2 rounded-lg ${errors.Status ? "border-red-500" : "border-gray"
                    }`}
                  {...register("Status", {
                    required: "Vui lòng chọn dữ liệu",
                  })}
                >
                  <option value="admin">Chưa khởi hành</option>
                  <option value="customer">Đã khởi hành</option>
                </select>
                {errors.Status && (
                  <p className="text-red-500 text-xs">{errors.Status.message}</p>
                )}
              </div>
            </div>

          </div>
          <div className="bg-white rounded-xl border border-gray-300 p-4 mt-6 mx-10">
            <h1 className='text-xl font-bold'>Thông tin vé</h1>
            <CustomTable
              columns={columns}
              data={dataTicketList}
              renderActions={(row) => (
                <div className="flex gap-2 justify-center">
                  <button
                    type='button'
                    onClick={() => alert(row.Id)}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Xác nhận lên xe
                  </button>
                </div>
              )}
            />
          </div>
        </div>
        <div className="absolute bottom-0 shadow-sm bg-white border px-4 py-4 left-0 w-full flex gap-4 justify-end">
          <Link
            to="/drive/trip"
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
  )
}