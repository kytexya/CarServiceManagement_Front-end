import SidebarInventoryManager from "@/components/common/sidebar-inventory-manager";
import { showError } from "@/utils";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function AddInventoryPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Form Data:", data);
        showError("Chức năng thêm phụ tùng chưa được kết nối API.");
    };

    return (
        <div className="flex flex-row w-full h-screen bg-gray-50">
            <SidebarInventoryManager />
            <div className="flex flex-col w-full">
                <div className="flex justify-between items-center px-8 py-4 border-b bg-white">
                    <h1 className="text-2xl font-bold">Thêm Phụ Tùng Mới vào Kho</h1>
                    <Link to="/inventory-manager/inventory" className="button">
                        Quay Lại
                    </Link>
                </div>
                <div className="p-8">
                    <form className="bg-white rounded-xl border p-8" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                            {/* Column 1 */}
                            <div>
                                <label className="font-semibold">Tên phụ tùng</label>
                                <input
                                    type="text"
                                    placeholder="VD: Lọc gió điều hòa"
                                    className={`input-field mt-2 ${errors.partName ? "border-red-500" : "border-gray-300"}`}
                                    {...register("partName", { required: "Vui lòng nhập tên phụ tùng" })}
                                />
                                {errors.partName && <p className="text-red-500 text-sm mt-1">{errors.partName.message}</p>}
                            </div>
                            <div>
                                <label className="font-semibold">Mã phụ tùng (Part Number)</label>
                                <input
                                    type="text"
                                    placeholder="VD: PNJ-39281"
                                    className={`input-field mt-2 ${errors.partNumber ? "border-red-500" : "border-gray-300"}`}
                                    {...register("partNumber", { required: "Vui lòng nhập mã phụ tùng" })}
                                />
                                {errors.partNumber && <p className="text-red-500 text-sm mt-1">{errors.partNumber.message}</p>}
                            </div>
                             <div>
                                <label className="font-semibold">Số lượng nhập</label>
                                <input
                                    type="number"
                                    placeholder="VD: 100"
                                    className={`input-field mt-2 ${errors.quantity ? "border-red-500" : "border-gray-300"}`}
                                    {...register("quantity", { required: "Vui lòng nhập số lượng", valueAsNumber: true, min: { value: 1, message: "Số lượng phải lớn hơn 0" } })}
                                />
                                {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>}
                            </div>

                            {/* Column 2 */}
                            <div>
                                <label className="font-semibold">Giá (VND)</label>
                                <input
                                    type="number"
                                    placeholder="VD: 350000"
                                    className={`input-field mt-2 ${errors.price ? "border-red-500" : "border-gray-300"}`}
                                    {...register("price", { required: "Vui lòng nhập giá", valueAsNumber: true, min: { value: 0, message: "Giá không được âm" } })}
                                />
                                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
                            </div>
                            <div>
                                <label className="font-semibold">Nhà cung cấp</label>
                                <input
                                    type="text"
                                    placeholder="VD: Toyota Long Biên"
                                    className={`input-field mt-2 ${errors.supplier ? "border-red-500" : "border-gray-300"}`}
                                    {...register("supplier", { required: "Vui lòng nhập nhà cung cấp" })}
                                />
                                {errors.supplier && <p className="text-red-500 text-sm mt-1">{errors.supplier.message}</p>}
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="font-semibold">Mô tả</label>
                            <textarea
                                placeholder="Thêm mô tả chi tiết cho phụ tùng..."
                                className="input-field mt-2 h-28"
                                {...register("description")}
                            ></textarea>
                        </div>
                        
                        {/* Form Actions */}
                        <div className="flex gap-4 justify-end mt-6">
                            <Link to="/inventory-manager/inventory" className="button">
                                Huỷ
                            </Link>
                            <button type="submit" className="button primary">
                                Lưu Phụ Tùng
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
} 