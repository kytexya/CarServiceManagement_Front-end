import DriveHeader from "@/components/common/drive-header";
import CustomTable from "@/components/common/table";
import { formatToMoney, showError, showSuccess } from "@/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const baseURL = import.meta.env.VITE_API_BASE_URL;

const columns = [
  { header: "Mã chuyến đi", field: "tripId" },
  { header: "Tên tuyến đường", field: "routeName" },
  { header: "Tên loại xe", field: "busType" },
  { header: "Tên tài xế", field: "driverName" },
  { header: "Giờ khởi hành", field: "departureTime" },
  { header: "Ngày khởi hành", field: "date" },
  { header: "Giá vé", field: "price" },
  { header: "Trạng thái", field: "status" },
];
export default function DriveTripPage() {
  const [dataList, setDataList] = useState([]);
  const yourToken = localStorage.getItem("bus-token");
  const [userId, setUserId] = useState();

  useEffect(() => {
    const profile = localStorage.getItem("bus-profile");
    if (profile) {
      const parsedProfile = JSON.parse(profile);
      setUserId(parsedProfile.userId);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      callApi();
    }
  }, [userId]);

  function handleCompleteTrip(name, id) {
    if (confirm(`Hoàn thành chuyến đi ${name}?`)) {
      axios
        .put(`${baseURL}/api/Trip/complete/${id}`, {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": 69420,
            Authorization: `Bearer ${yourToken}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            showSuccess();
          }
          callApi();
        })
        .catch((e) => {
          showError(e?.response?.data?.message);
          callApi();
        });
    }
  }

  function callApi() {
    axios
      .get(`${baseURL}/api/Trip/assigned/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": 69420,
          Authorization: `Bearer ${yourToken}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          const data = res?.data || [];
          setDataList(
            data.map((item) => ({
              ...item,
              price: formatToMoney(item.price),
            }))
          );
        }
      })
      .catch((e) => {
        showError(e?.response?.data?.message);
      });
  }

  return (
    <div className="flex flex-col">
      <DriveHeader />
      <div className="flex justify-between items-center h-[60px] px-4 shadow-lg">
        <h1 className="text-2xl font-bold">Danh sách chuyến xe của bạn</h1>
      </div>
      <CustomTable
        columns={columns}
        data={dataList}
        renderActions={(row) => (
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => handleCompleteTrip(row.routeName, row.tripId)}
              className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Hoàn thành
            </button>
          </div>
        )}
      />
    </div>
  );
}
