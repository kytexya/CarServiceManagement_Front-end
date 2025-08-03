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
                {/* Header */}
                <div className="flex justify-between items-center px-8 py-6 border-b bg-white shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Thêm Phụ Tùng Mới vào Kho</h1>
                            <p className="text-sm text-gray-600">Thêm phụ tùng mới vào hệ thống quản lý kho</p>
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
                        <span className="text-gray-900 font-medium">Thêm phụ tùng mới</span>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        {/* Form Header */}
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-8 py-6 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Thông tin phụ tùng mới</h2>
                                    <p className="text-sm text-gray-600">Nhập thông tin chi tiết phụ tùng mới vào kho</p>
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
                                            placeholder="VD: Lọc gió điều hòa"
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
                                            Mã phụ tùng (Part Number)
                                        </label>
                                        <input
                                            type="text"
                                            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                                errors.partNumber ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-gray-300"
                                            }`}
                                            placeholder="VD: PNJ-39281"
                                            {...register("partNumber", { required: "Vui lòng nhập mã phụ tùng" })}
                                        />
                                        {errors.partNumber && (
                                            <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {errors.partNumber.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            <svg className="w-4 h-4 inline mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                            </svg>
                                            Số lượng nhập
                                        </label>
                                        <input
                                            type="number"
                                            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                                errors.quantity ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-gray-300"
                                            }`}
                                            placeholder="VD: 100"
                                            {...register("quantity", { 
                                                required: "Vui lòng nhập số lượng", 
                                                valueAsNumber: true, 
                                                min: { value: 1, message: "Số lượng phải lớn hơn 0" } 
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
                                            placeholder="VD: 350000"
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
                                            placeholder="VD: Toyota Long Biên"
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
                                    Lưu Phụ Tùng
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
} 