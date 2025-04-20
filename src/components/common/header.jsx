import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Homepage() {
  const [from, setFrom] = useState();
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    if (!from || !date) return;
    navigate(`/trip?date=${new Date(date).toISOString().split('T')[0]}&from=${from}&type=earliest`);
  }

  return (
    <div className="relative min-h-[501px]"
      style={{
        backgroundImage: "url(https:////static.vexere.com/production/banners/1209/leaderboard_1440x480-(1).jpg)",
      }}>
      <img className='absolute top-0 left-0 w-full h-full z-10' src="https:////static.vexere.com/production/banners/1209/leaderboard_1440x480-(1).jpg">
      </img>
      <div className='mx-auto max-w-fit rounded-xl bg-white z-20 relative mt-60'>
        <form onSubmit={handleSearch}>
          <div className="flex flex-wrap gap-4 px-4 py-2 h-full justify-between">
            <div className="flex flex-col gap-1">
              <p className='text-sm text-gray-500'>Nơi xuất phát</p>
              <input
                className='p-2 h-[44px] border border-primary rounded-md w-[330px]'
                placeholder='Nhập tên chuyến đi hoặc điểm dừng...'
                list="citySuggestions"
                onChange={(e) => setFrom(e.target.value)}
                required
              />
              <datalist id="citySuggestions">
                <option value="Da Lat" />
                <option value="Sài Gòn" />
                <option value="HCM" />
                <option value="Hà Nội" />
                <option value="Đà Nẵng" />
              </datalist>
            </div>

            <div className="flex flex-row gap-3">
              <div className="flex flex-col gap-1">
                <p className='text-sm text-gray-500'>Ngày đi</p>
                <input
                  required
                  type='date'
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDate(e.target.value)}
                  className='p-2 border border-primary rounded-md'
                />
              </div>
              <div className="flex flex-col gap-2 h-[68px] items-end justify-end">
                <button type='submit' className='button !bg-yellow !text-white !border-none !h-[46px] !text-xl !w-[144px]'>Tìm kiếm</button>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  )
}