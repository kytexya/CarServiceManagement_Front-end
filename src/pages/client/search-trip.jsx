import { formatToMoney, showError } from '@/utils';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
const baseURL = import.meta.env.VITE_API_BASE_URL;

const SORT_OPTIONS = [
    { label: 'Giờ đi sớm nhất', value: 'earliest' },
    { label: 'Giờ đi muộn nhất', value: 'latest' },
    { label: 'Đánh giá cao nhất', value: 'rating' },
    { label: 'Giá tăng dần', value: 'priceAsc' },
    { label: 'Giá giảm dần', value: 'priceDesc' },
];

export default function SearchTripPage() {
    const location = useLocation();
    const date = new URLSearchParams(location.search).get('date');
    const from = new URLSearchParams(location.search).get('from');
    const type = new URLSearchParams(location.search).get('type');
    const navigate = useNavigate();

    useEffect(() => {
        callSearchApi();
    }, [date, from, type]);

    function handleSearch(value) {
        navigate(`/trip?date=${new Date(date).toISOString().split('T')[0]}&from=${from}&type=${value}`);
    }

    const callSearchApi = (value) => {
        fetch(`${baseURL}/trip`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(async (res) => {
                const result = await res.json();
                if (res.status === 200) { }
            })
            .catch(() => {
                // showError();
            });
    };

    return (
        <div className="px-8 md:px-10 md:w-2/3 mx-auto py-10">
            <div className="flex flex-row w-full gap-6">
                <div className="w-[260px] flex flex-col border rounded-lg p-4">
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
                    <h1 className='text-2xl font-bold'>Kết quả: 3</h1>
                    <div className="flex mt-4 flex-col gap-4">
                        <TripBox
                            from={'Hà Nội - Đà Nẵng'}
                            busId={'S27287222'}
                            price={300000}
                            busType={'Xe khách giường nằm 40 chỗ'}
                            location={[
                                { name: 'Hà Nội', time: '20 phút' },
                                { name: 'Đà Nẵng', time: '10 phút' }
                            ]}
                            date={'2024-02-01'}
                            time={'11:00'}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

function TripBox(data) {
    const [detailTrip, setDetailTrip] = useState()
    const [open, setOpen] = useState(false)
    const [seats, setSeats] = useState([]);
    const [selected, setSelected] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (open) {
            const generatedSeats = Array.from({ length: 24 }, (_, index) => {
                const seatCode = `S${100 + index + 1}`;
                return {
                    id: index + 1,
                    code: seatCode,
                    isBooked: index === 10 || index === 20,
                };
            });
            setSeats(generatedSeats);
        }
    }, [open])

    function handleSubmit() {
        navigate(`/order?seat=${selected}&trip=${detailTrip?.id}&bus=${detailTrip?.busId}`);
    }

    return (
        <div className='bg-white border border-gray-300 shadow-xl rounded-lg p-4'>
            <div className="relative flex flex-row gap-4 w-full">
                <div>
                    <img src="https://placehold.co/140" className='rounded-sm shadow-sm' />
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex justify-between items-center w-full">
                        <h3 className="text-lg font-semibold">{data?.from} - {data?.busId}</h3>
                        <p className="font-semibold text-xl text-warning">{formatToMoney(data?.price ?? 0)}</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="text-sm text-gray-600">{data?.busType}</p>
                        <div className="flex flex-row gap-6">
                            <p className="text-sm text-gray-600 font-semibold">Ngày đi: {data?.date}</p>
                            <p className="text-sm text-gray-600 font-semibold">Giờ đi: {data?.time}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-dark font-semibold">Điểm dừng - Thời gian nghỉ</p>
                            {data?.location?.map((item, index) => (
                                <div key={index} className="flex flex-row gap-1">
                                    <p className="text-sm text-gray-600 font-semibold">{item?.name}:</p>
                                    <p className="text-sm text-gray-600 font-semibold">{item?.time}</p>
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
                        <div className="mt-2 flex-col grid grid-cols-4 gap-4">
                            {seats.map((seat) => (
                                <button
                                    key={seat.id}
                                    className={`p-3 border border-gray-300 rounded-lg text-center shadow cursor-pointer hover:bg-blue-100 ${selected.includes(seat.code) ? "bg-blue-100" : ""}
                  ${seat.isBooked && "bg-red-100 cursor-not-allowed hover:bg-red-100"}
                  `}
                                    disabled={seat.isBooked}
                                    onClick={() => setSelected(selected.includes(seat.code) ? selected.filter((item) => item !== seat.code) : [...selected, seat.code])}
                                >
                                    <p className="font-medium select-none">{seat.code}</p>
                                </button>
                            ))}
                        </div>
                        <div className='w-full'>
                            <button onClick={handleSubmit} className='button !bg-success !text-white !px-4 !border-none shadow-xl mt-4 float-right w-32'>Đặt vé</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}