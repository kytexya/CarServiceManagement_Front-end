import SidebarAdmin from "@/components/common/sidebar-admin";
import { showError, showSuccess } from "@/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function EditLocationPage() {
  const { id } = useParams();
  const [data, setData] = useState();
  const navigate = useNavigate();
  const yourToken = localStorage.getItem("bus-token");

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios
      .get(`${baseURL}/api/Location/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": 69420,
          Authorization: `Bearer ${yourToken}`,
        },
      })
      .then((res) => {
        const result = res.data;
        if (res.status === 200) {
          setData(result);
          setValue("locationId", result.locationId);
          setValue("locationName", result.locationName);
        } else {
          showError(result?.message);
        }
      })
      .catch((e) => {
        showError(e.response?.data?.message);
      });
  }, []);

  const onSubmit = (data) => {
    fetch(`${baseURL}/api/Location/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": 69420,
        Authorization: `Bearer ${yourToken}`,
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        if (res.status === 200) {
          showSuccess();
          navigate("/admin/location");
        } else {
          showError(res?.message);
        }
      })
      .catch(() => {
        showError();
      });
  };

  return (
    <div className="flex flex-row w-full">
      <SidebarAdmin />
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center h-[60px] px-4 shadow-lg">
          <h1 className="text-2xl font-bold">Cập nhật địa điểm</h1>
        </div>
        <div className="bg-white rounded-xl border border-gray-300 p-4 mt-10 mx-10">
          <form className="text-sm" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-10 w-full">
              <div className="flex flex-col gap-2 mb-4 w-full">
                <label className="text-sm">Tên địa điểm</label>
                <input
                  type="text"
                  className={`border px-5 py-2 rounded-lg ${
                    errors.locationName ? "border-red-500" : "border-gray"
                  }`}
                  defaultValue={data?.locationName}
                  {...register("locationName", {
                    required: "Vui lòng nhập dữ liệu",
                    minLength: {
                      value: 4,
                      message: "Cần nhập từ 4 ký tự trở lên",
                    },
                  })}
                />
                {errors.locationName && (
                  <p className="text-red-500 text-xs">
                    {errors.locationName.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-4 justify-end">
              <Link
                to="/admin/location"
                className="button float-right !w-[145px]"
              >
                Quay lại
              </Link>
              <button
                type="submit"
                disabled={data?.isDelete}
                className="button primary float-right !w-[145px]"
              >
                Lưu thông tin
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
