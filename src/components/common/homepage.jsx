import { convertDateFormat, showError } from "@/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function Homepage() {
  const [from, setFrom] = useState();
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();
  const [locationList, setLocationList] = useState([]);

  useEffect(() => {
    callApi();
  }, []);

  function callApi() {
    axios
      .get(`${baseURL}/api/Location`, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": 69420,
        },
        params: {
          Page: 1,
          PageSize: -1,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          const listData = res.data?.data || [];
          const locationList = listData.filter((item) => !item.isDelete);
          setLocationList(
            locationList.map((item) => ({
              value: item.locationName,
              label: item.locationName,
            }))
          );
        }
      })
      .catch((error) => {
        showError(error?.response?.data?.message);
      });
  }
  function handleSearch(e) {
    e.preventDefault();
    if (!from || !date) return;
    navigate(
      `/trip?date=${convertDateFormat(date)}&from=${from}&type=earliest`
    );
  }

  return (
    <div
      className="relative min-h-[501px]"
      style={{
        backgroundImage:
          "url(https:////static.vexere.com/production/banners/1209/leaderboard_1440x480-(1).jpg)",
      }}
    >
      <img
        className="absolute top-0 left-0 w-full h-full z-10"
        src="https:////static.vexere.com/production/banners/1209/leaderboard_1440x480-(1).jpg"
      ></img>
      <div className="mx-auto max-w-fit rounded-xl bg-white z-20 relative mt-60">
        <form onSubmit={handleSearch}>
          <div className="flex flex-wrap gap-6 px-4 py-2 h-full justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-sm text-gray-500">Điểm xuất phát/ Điểm đến</p>
              <select
                required
                onChange={(e) => setFrom(e.target.value)}
                className="p-2 h-[44px] border w-[200px] border-primary rounded-md"
              >
                <option value="">-- Chọn địa điểm --</option>
                {locationList.length > 0 &&
                  locationList?.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex flex-row gap-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500">Ngày đi</p>
                <input
                  required
                  type="date"
                  defaultValue={new Date().toISOString().split("T")[0]}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setDate(e.target.value)}
                  className="p-2 border border-primary rounded-md"
                />
              </div>
              <div className="flex flex-col gap-2 h-[68px] items-end justify-end">
                <button
                  type="submit"
                  className="button !bg-yellow !text-white !border-none !h-[46px] !text-xl !w-[144px]"
                >
                  Tìm kiếm
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
