import SidebarInventoryManager from "@/components/common/sidebar-inventory-manager";
import { showError } from "@/utils";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";

// Mock data for demonstration
const mockPart = {
    id: "PART001",
    partName: "Lọc gió điều hòa",
    partNumber: "PNJ-39281",
    quantity: 80,
    price: 350000,
    supplier: "Toyota Long Biên",
    description: "Lọc gió cho điều hòa xe Toyota Vios 2022. Hàng chính hãng."
};

export default function EditInventoryPage() {
    const { id } = useParams();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        // In a real app, you would fetch the part data based on the `id`
        console.log("Fetching data for part ID:", id);
        setValue("partName", mockPart.partName);
        setValue("partNumber", mockPart.partNumber);
        setValue("quantity", mockPart.quantity);
        setValue("price", mockPart.price);
        setValue("supplier", mockPart.supplier);
        setValue("description", mockPart.description);
    }, [id, setValue]);

    const onSubmit = (data) => {
        console.log("Updated Form Data:", data);
        showError(`Chức năng chỉnh sửa phụ tùng ${id} chưa được kết nối API.`);
    };

    return (
        <div className="flex flex-row w-full h-screen bg-gray-50">
            <SidebarInventoryManager />
            <div className="flex flex-col w-full">
                <div className="flex justify-between items-center px-8 py-4 border-b bg-white">
                    <h1 className="text-2xl font-bold">Chỉnh Sửa Thông Tin Phụ Tùng</h1>
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
                                    className={`input-field mt-2 ${errors.partName ? "border-red-500" : "border-gray-300"}`}
                                    {...register("partName", { required: "Vui lòng nhập tên phụ tùng" })}
                                />
                                {errors.partName && <p className="text-red-500 text-sm mt-1">{errors.partName.message}</p>}
                            </div>
                            <div>
                                <label className="font-semibold">Mã phụ tùng (Part Number)</label>
                                <input
                                    type="text"
                                    className={`input-field mt-2 bg-gray-100`}
                                    {...register("partNumber")}
                                    readOnly
                                />
                            </div>
                             <div>
                                <label className="font-semibold">Số lượng tồn kho</label>
                                <input
                                    type="number"
                                    className={`input-field mt-2 ${errors.quantity ? "border-red-500" : "border-gray-300"}`}
                                    {...register("quantity", { required: "Vui lòng nhập số lượng", valueAsNumber: true, min: { value: 0, message: "Số lượng không được âm" } })}
                                />
                                {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>}
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
                                <label className="font-semibold">Nhà cung cấp</label>
                                <input
                                    type="text"
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
                                Lưu Thay Đổi
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
} 