import SidebarAdmin from "@/components/common/sidebar-admin";
import { showError } from "@/utils";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";

// Mock data for demonstration
const mockService = {
    id: "SVC001",
    serviceName: "Thay dầu động cơ và kiểm tra 10 điểm",
    price: 550000,
    estimatedTime: 60, // in minutes
    status: "Active",
    description: "Sử dụng dầu nhớt bán tổng hợp 5W-30. Kiểm tra miễn phí các điểm an toàn trên xe."
};

export default function EditServicePage() {
    const { id } = useParams();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        setValue("serviceName", mockService.serviceName);
        setValue("price", mockService.price);
        setValue("estimatedTime", mockService.estimatedTime);
        setValue("status", mockService.status);
        setValue("description", mockService.description);
    }, [id, setValue]);

    const onSubmit = (data) => {
        console.log("Updated Form Data:", data);
        showError(`Chức năng chỉnh sửa dịch vụ ${id} chưa được kết nối API.`);
    };

    return (
        <div className="flex flex-row w-full h-screen bg-gray-50">
            <SidebarAdmin />
            <div className="flex flex-col w-full">
                <div className="flex justify-between items-center px-8 py-4 border-b bg-white">
                    <h1 className="text-2xl font-bold">Chỉnh Sửa Dịch Vụ</h1>
                    <Link to="/admin/services" className="button">
                        Quay Lại
                    </Link>
                </div>
                <div className="p-8">
                     <form className="bg-white rounded-xl border p-8" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                            {/* Column 1 */}
                            <div>
                                <label className="font-semibold">Tên dịch vụ</label>
                                <input
                                    type="text"
                                    className={`input-field mt-2 ${errors.serviceName ? "border-red-500" : "border-gray-300"}`}
                                    {...register("serviceName", { required: "Vui lòng nhập tên dịch vụ" })}
                                />
                                {errors.serviceName && <p className="text-red-500 text-sm mt-1">{errors.serviceName.message}</p>}
                            </div>
                            <div>
                                <label className="font-semibold">Thời gian ước tính (phút)</label>
                                <input
                                    type="number"
                                    className={`input-field mt-2 ${errors.estimatedTime ? "border-red-500" : "border-gray-300"}`}
                                    {...register("estimatedTime", { required: "Vui lòng nhập thời gian", valueAsNumber: true, min: { value: 1, message: "Thời gian phải lớn hơn 0" } })}
                                />
                                {errors.estimatedTime && <p className="text-red-500 text-sm mt-1">{errors.estimatedTime.message}</p>}
                            </div>
                            
                            {/* Column 2 */}
                             <div>
                                <label className="font-semibold">Giá (VND)</label>
                                <input
                                    type="number"
                                    className={`input-field mt-2 ${errors.price ? "border-red-500" : "border-gray-300"}`}
                                    {...register("price", { required: "Vui lòng nhập giá", valueAsNumber: true, min: { value: 0, message: "Giá không được âm" } })}
                                />
                                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
                            </div>
                            <div>
                                <label className="font-semibold">Trạng thái</label>
                                <select
                                    className={`input-field mt-2 ${errors.status ? "border-red-500" : "border-gray-300"}`}
                                    {...register("status", { required: "Vui lòng chọn trạng thái" })}
                                >
                                    <option value="Active">Hoạt động</option>
                                    <option value="Inactive">Không hoạt động</option>
                                </select>
                                {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="font-semibold">Mô tả chi tiết</label>
                            <textarea
                                placeholder="Mô tả các công việc sẽ thực hiện, phụ tùng liên quan..."
                                className="input-field mt-2 h-32"
                                {...register("description")}
                            ></textarea>
                        </div>
                        
                        {/* Form Actions */}
                        <div className="flex gap-4 justify-end mt-6">
                            <Link to="/admin/services" className="button">
                                Huỷ
                            </Link>
                            <button type="submit" className="button primary">
                                Lưu Thay Đổi
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
} 