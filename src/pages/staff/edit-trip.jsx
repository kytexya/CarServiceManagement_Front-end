import DriveHeader from "@/components/common/drive-header";
import SidebarAdmin from "@/components/common/sidebar-admin";
import { showError, showSuccess } from "@/utils";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function StaffEditTripPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Dữ liệu:", data);
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
        <div className="flex flex-col h-full w-full">
            <DriveHeader />
            <div className="flex flex-row w-full">
                <SidebarAdmin />
                <div className="flex flex-col w-full">
                    <div className="flex justify-between items-center h-[60px] px-4 shadow-lg">
                        <h1 className="text-2xl font-bold">Sửa chuyến đi</h1>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-300 p-4 mt-10 mx-10">
                        <form className="text-sm" onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex gap-10 w-full">
                                <div className="flex flex-col gap-2 mb-4 w-full">
                                    <label className="text-sm">Tuyến đường</label>
                                    <select
                                        className={`border px-5 py-2 rounded-lg ${errors.RouterId ? "border-red-500" : "border-gray"
                                            }`}
                                        {...register("RouterId", {
                                            required: "Vui lòng chọn dữ liệu",
                                        })}
                                    >
                                        <option value="admin">Hà Nội - Đà Nẵng</option>
                                        <option value="customer">Sài Gòn - Hà Nội</option>
                                    </select>
                                    {errors.RouterId && (
                                        <p className="text-red-500 text-xs">
                                            {errors.RouterId.message}
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2 mb-4 w-full">
                                    <label className="text-sm">Xe</label>
                                    <select
                                        className={`border px-5 py-2 rounded-lg ${errors.BusId ? "border-red-500" : "border-gray"
                                            }`}
                                        {...register("BusId", {
                                            required: "Vui lòng chọn dữ liệu",
                                        })}
                                    >
                                        <option value="1">Xe trung chuyển</option>
                                        <option value="2">Xe giường nằm</option>
                                    </select>
                                    {errors.BusId && (
                                        <p className="text-red-500 text-xs">
                                            {errors.BusId.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-10 w-full">
                                <div className="flex flex-col gap-2 mb-4 w-full">
                                    <label className="text-sm">Tài xế</label>
                                    <select
                                        className={`border px-5 py-2 rounded-lg ${errors.DriverId ? "border-red-500" : "border-gray"
                                            }`}
                                        {...register("DriverId", {
                                            required: "Vui lòng chọn dữ liệu",
                                        })}
                                    >
                                        <option value="admin">Tài xế Minh</option>
                                        <option value="customer">Tài xế Hoà</option>
                                    </select>
                                    {errors.DriverId && (
                                        <p className="text-red-500 text-xs">
                                            {errors.DriverId.message}
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2 mb-4 w-full">
                                    <label className="text-sm">Giá vé</label>
                                    <input
                                        type="text"
                                        inputMode="numeric"
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
                                        <p className="text-red-500 text-xs">
                                            {errors.Price.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-10 w-full">
                                <div className="flex flex-col gap-2 mb-4 w-full">
                                    <label className="text-sm">Giờ khởi hành</label>
                                    <input
                                        type="time"
                                        className={`border px-5 py-2 rounded-lg ${errors.DepartureTime ? "border-red-500" : "border-gray"
                                            }`}
                                        {...register("DepartureTime", {
                                            required: "Vui lòng chọn dữ liệu",
                                        })}
                                    />
                                    {errors.DepartureTime && (
                                        <p className="text-red-500 text-xs">
                                            {errors.DepartureTime.message}
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2 mb-4 w-full">
                                    <label className="text-sm">Ngày khởi hành</label>
                                    <input
                                        type="date"
                                        className={`border px-5 py-2 rounded-lg ${errors.Date ? "border-red-500" : "border-gray"
                                            }`}
                                        {...register("Date", {
                                            required: "Vui lòng chọn dữ liệu",
                                        })}
                                    />
                                    {errors.Date && (
                                        <p className="text-red-500 text-xs">
                                            {errors.Date.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-10 w-full">
                                <div className="flex flex-col gap-2 mb-4 w-full">
                                    <label className="text-sm">Mô tả</label>
                                    <input
                                        type="text"
                                        className={`border px-5 py-2 rounded-lg ${errors.Direction ? "border-red-500" : "border-gray"
                                            }`}
                                        {...register("Direction", {
                                            required: "Vui lòng chọn dữ liệu",
                                        })}
                                    />
                                    {errors.Direction && (
                                        <p className="text-red-500 text-xs">
                                            {errors.Direction.message}
                                        </p>
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
                                        <option value="customer">Đã khỏi hành</option>
                                    </select>
                                    {errors.Status && (
                                        <p className="text-red-500 text-xs">
                                            {errors.Status.message}
                                        </p>
                                    )}
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
        </div>
    );
}