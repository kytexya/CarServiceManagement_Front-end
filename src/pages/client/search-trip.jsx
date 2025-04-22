import { formatTime, formatToMoney, showError } from '@/utils';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
const baseURL = import.meta.env.VITE_API_BASE_URL;

const SORT_OPTIONS = [
  { label: 'Giờ đi sớm nhất', value: 'earliest' },
  { label: 'Giờ đi muộn nhất', value: 'latest' },
  { label: 'Giá tăng dần', value: 'priceAsc' },
  { label: 'Giá giảm dần', value: 'priceDesc' },
];

export default function SearchTripPage() {
  const location = useLocation();
  const date = new URLSearchParams(location.search).get('date');
  const from = new URLSearchParams(location.search).get('from');
  const type = new URLSearchParams(location.search).get('type');
  const navigate = useNavigate();
  const [dataList, setDataList] = useState();

  useEffect(() => {
    callSearchApi(date, from, type);
  }, [date, from, type]);

  function handleSearch(value) {
    navigate(`/trip?date=${new Date(date).toISOString().split('T')[0]}&from=${from}&type=${value}`);
  }

  const callSearchApi = (date, from, type) => {
    fetch(`${baseURL}/api/Trip/search?date=${date}&keyword=${from}&type=${type}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": 69420,
      },
    })
      .then(async (res) => {
        const result = await res.json();
        if (res.status === 200) {
          setDataList(result.map((item) => ({
            ...item,
            // TODO: update field
            "busId": "52B-987.65",
            "tripId": "T005",
          })))
        }
      })
      .catch(() => {
        // showError();
      });
  };

  if (!dataList) {
    return <></>
  }

  return (
    <div className="px-8 md:px-10 md:w-2/3 mx-auto py-10">
      <div className="flex flex-row w-full gap-6">
        <div className="w-[260px] flex flex-col border h-full sticky top-24 rounded-lg p-4">
          <h3 className="font-semibold text-xl mb-2">Sắp xếp</h3>
          <div className="flex flex-col gap-2">
            {SORT_OPTIONS.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="sort"
                  value={opt.value}
                  checked={type === opt.value}
                  onChange={() => handleSearch(opt.value)}
                  className="accent-blue-600 w-5 h-5"
                />
                <span className="text-sm">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex flex-col w-full">
          <h1 className='text-2xl font-bold'>Kết quả: {dataList.length ?? 0}</h1>
          <div className="flex mt-4 flex-col gap-4">
            {dataList.length > 0 ? (
              <>
                {dataList.map((item) => <TripBox key={item.id} data={item} />)}
              </>
            ) : (
              <p className='text-xl font-bold mt-6'>Hiện tại chưa có chuyến xe phù hợp với bạn.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function TripBox({ data }) {
  const [detailBus, setDetailBus] = useState()
  const [open, setOpen] = useState(false)
  const [seats, setSeats] = useState([]);
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      callApi();
    }
  }, [open])

  function handleSubmit() {
    navigate(`/order?seat=${selected}&trip=${data?.tripId}&bus=${detailBus?.busId}`);
  }

  const callApi = () => {
    fetch(`${baseURL}/api/buses/${data?.busId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": 69420,
      },
    })
      .then(async (res) => {
        const result = await res.json();
        if (res.status === 200) {
          setDetailBus(result)
          setSeats(result.seats)
        }
      })
      .catch(() => {
        showError();
      });
  };

  return (
    <div className='bg-white border border-gray-300 shadow-xl rounded-lg p-4'>
      <div className="relative flex flex-row gap-4 w-full">
        <div>
          <img src="https://placehold.co/140" className='rounded-sm shadow-sm' />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center w-full">
            <h3 className="text-lg font-semibold">{data?.routeName}</h3>
            <p className="font-semibold text-xl text-warning">{formatToMoney(data?.price ?? 0)}</p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex flex-row gap-4">
              <p className="text-sm text-gray-600 font-semibold">Ngày đi: {data?.date}</p>
              <p className="text-sm text-gray-600 font-semibold">Giờ đi: {formatTime(data?.departureTime)}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-dark font-semibold text-sm">Điểm dừng - Thời gian nghỉ</p>
              {data?.stops?.map((item, index) => (
                <div key={index} className="flex flex-row gap-1 items-center">
                  <span className="text-gray-500 text-sm">•</span>
                  <p className="text-xs text-gray-600 font-semibold">{item?.locationName}:</p>
                  <p className="text-xs text-gray-600 font-semibold">{item?.stopDuration.slice(0, 5)}</p>
                </div>
              ))}
            </div>
          </div>
          <button onClick={() => setOpen(!open)} className='button !bg-warning !text-white !px-4 !border-none shadow-xl absolute bottom-0 right-0'>Chọn ghế</button>
        </div>
      </div>
      {open &&
        <div className="relative border-t-2 border-t-gray-200 mt-4 flex w-full">
          <div className="flex flex-col w-full">
            <h1 className='mt-4 text-xl font-bold'>Chọn ghế</h1>
            {seats.length > 0 ? (
              <>
                <div className="mt-2 flex-col grid grid-cols-4 gap-4 w-full">
                  {seats.map((seat) => (
                    <button
                      key={seat.id}
                      className={`p-3 button border border-gray-300 rounded-lg text-center hover:!text-dark shadow cursor-pointer hover:bg-blue-200 ${selected.includes(seat.seatId) ? "!bg-blue-100" : ""}
                      ${seat.isBooked && "!bg-red-100 cursor-not-allowed hover:!bg-red-100"}
                      `}
                      disabled={seat.isBooked}
                      onClick={() => setSelected(selected.includes(seat.seatId) ? selected.filter((item) => item !== seat.seatId) : [...selected, seat.seatId])}
                    >
                      <p className="font-medium select-none">{seat.seatId}</p>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex mt-2 w-full">
                <p className="font-semibold text-lg text-gray-500 text-center w-full">Chưa có dữ liệu</p>
              </div>
            )}
            <div className='w-full'>
              <button onClick={handleSubmit} className='button !bg-success !text-white !px-4 !border-none shadow-xl mt-4 float-right w-32'>Đặt vé</button>
            </div>
          </div>
        </div >
      }
    </div >
  )
}