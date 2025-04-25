import CustomTable from "@/components/common/table";
import { formatDateTime, formatToMoney, showError, showSuccess } from "@/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
const baseURL = import.meta.env.VITE_API_BASE_URL;

const columns = [
  { header: "Mã vé", field: "ticketId" },
  { header: "Tên tuyến đường", field: "routeName" },
  { header: "Mã ghế", field: "seatId" },
  { header: "Giá gốc", field: "originalPrice" },
  { header: "Giá khuyến mãi", field: "price" },
  { header: "Giờ khởi tạo", field: "createdAt" },
  { header: "Trạng thái", field: "status", className: "status-box" },
];

export default function HistoryTicket() {
  const [dataList, setDataList] = useState([]);
  const [profile, setProfile] = useState(false);
  useEffect(() => {
    const profile = localStorage.getItem("bus-profile");
    if (profile) {
      const parsedProfile = JSON.parse(profile);
      setProfile(parsedProfile);
    }
  }, []);

  useEffect(() => {
    if (profile.customerId) {
      callApi(profile.customerId);
    }
  }, [profile]);

  function callApi(customerId) {
    axios
      .get(`${baseURL}/api/Ticket/by-customer/${customerId}`, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": 69420,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          const listData = res.data || [];
          setDataList(
            listData.map((item) => ({
              ...item,
              createdAt: formatDateTime(item.createdAt),
              price: formatToMoney(item.price),
            }))
          );
        }
      })
      .catch((e) => {
        showError(e.response?.data?.message);
      });
  }

  function handleCancel(id) {
    axios
      .put(
        `${baseURL}/api/Ticket/cancel/${id}`,
        {},
        {
          headers: {
            "ngrok-skip-browser-warning": 69420,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res?.status === 200) {
          showSuccess();
          callApi(profile.customerId);
        }
      })
      .catch((e) => {
        showError(e.response?.data?.message);
      });
  }

  return (
    <div className="px-8 md:px-10 mx-auto py-10 my-20">
      <div className="border shadow-lg rounded-lg p-4">
        <h1 className="text-2xl font-bold mb-4">Danh sách vé xe đã đặt</h1>
        <CustomTable
          columns={columns}
          data={dataList}
          renderActions={(row) => (
            <div className="flex gap-2 justify-center">
              {row?.isCancelled === false && (
                <button
                  onClick={() => handleCancel(row.ticketId)}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Huỷ vé
                </button>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
}
