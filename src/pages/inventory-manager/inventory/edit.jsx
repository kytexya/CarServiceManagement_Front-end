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
        <div className="flex flex-col w-full h-screen bg-gray-50">
                {/* Header */}
                <div className="flex justify-between items-center px-8 py-6 border-b bg-white shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Chỉnh Sửa Thông Tin Phụ Tùng</h1>
                            <p className="text-sm text-gray-600">Cập nhật thông tin chi tiết phụ tùng</p>
                        </div>
                    </div>
                    <Link to="/inventory-manager/inventory" className="button">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Quay Lại
                    </Link>
                </div>

                {/* Main Content */}
                <div className="p-8">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
                        <Link to="/inventory-manager/inventory" className="hover:text-blue-600">Kho phụ tùng</Link>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="text-gray-900 font-medium">Chỉnh sửa phụ tùng</span>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        {/* Form Header */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Thông tin phụ tùng</h2>
                                    <p className="text-sm text-gray-600">Cập nhật thông tin chi tiết và số lượng tồn kho</p>
                                </div>
                            </div>
                        </div>

                        {/* Form Content */}
                        <form onSubmit={handleSubmit(onSubmit)} className="p-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
                                {/* Column 1 */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            <svg className="w-4 h-4 inline mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                            </svg>
                                            Tên phụ tùng
                                        </label>
                                        <input
                                            type="text"
                                            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                                errors.partName ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-gray-300"
                                            }`}
                                            placeholder="Nhập tên phụ tùng..."
                                            {...register("partName", { required: "Vui lòng nhập tên phụ tùng" })}
                                        />
                                        {errors.partName && (
                                            <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {errors.partName.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            <svg className="w-4 h-4 inline mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            Mã phụ tùng
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-gray-50 text-gray-600 cursor-not-allowed"
                                            {...register("partNumber")}
                                            readOnly
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Mã phụ tùng không thể thay đổi</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            <svg className="w-4 h-4 inline mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                            </svg>
                                            Số lượng tồn kho
                                        </label>
                                        <input
                                            type="number"
                                            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                                errors.quantity ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-gray-300"
                                            }`}
                                            placeholder="0"
                                            {...register("quantity", { 
                                                required: "Vui lòng nhập số lượng", 
                                                valueAsNumber: true, 
                                                min: { value: 0, message: "Số lượng không được âm" } 
                                            })}
                                        />
                                        {errors.quantity && (
                                            <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {errors.quantity.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Column 2 */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            <svg className="w-4 h-4 inline mr-2 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                            </svg>
                                            Giá (VND)
                                        </label>
                                        <input
                                            type="number"
                                            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                                errors.price ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-gray-300"
                                            }`}
                                            placeholder="0"
                                            {...register("price", { 
                                                required: "Vui lòng nhập giá", 
                                                valueAsNumber: true, 
                                                min: { value: 0, message: "Giá không được âm" } 
                                            })}
                                        />
                                        {errors.price && (
                                            <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {errors.price.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            <svg className="w-4 h-4 inline mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            Nhà cung cấp
                                        </label>
                                        <input
                                            type="text"
                                            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                                errors.supplier ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-gray-300"
                                            }`}
                                            placeholder="Nhập tên nhà cung cấp..."
                                            {...register("supplier", { required: "Vui lòng nhập nhà cung cấp" })}
                                        />
                                        {errors.supplier && (
                                            <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {errors.supplier.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            <svg className="w-4 h-4 inline mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            Mô tả
                                        </label>
                                        <textarea
                                            placeholder="Thêm mô tả chi tiết cho phụ tùng..."
                                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 hover:border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors h-32 resize-none"
                                            {...register("description")}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Form Actions */}
                            <div className="flex gap-4 justify-end mt-8 pt-6 border-t border-gray-100">
                                <Link to="/inventory-manager/inventory" className="button">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Huỷ
                                </Link>
                                <button type="submit" className="button primary">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Lưu Thay Đổi
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
        </div>
    );
} 