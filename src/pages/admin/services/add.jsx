import SidebarAdmin from "@/components/common/sidebar-admin";
import { showError } from "@/utils";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function AddServicePage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Form Data:", data);
        showError("Chức năng thêm dịch vụ chưa được kết nối API.");
    };

    return (
        <div className="flex flex-row w-full h-screen bg-gray-50">
            <SidebarAdmin />
            <div className="flex flex-col w-full">
                {/* Header */}
                <div className="flex justify-between items-center px-8 py-6 border-b bg-white shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Thêm Dịch Vụ Mới</h1>
                            <p className="text-sm text-gray-600">Tạo dịch vụ mới cho hệ thống</p>
                        </div>
                    </div>
                    <Link to="/admin/services" className="button">
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
                        <Link to="/admin/services" className="hover:text-blue-600">Quản lý dịch vụ</Link>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="text-gray-900 font-medium">Thêm dịch vụ mới</span>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        {/* Form Header */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Thông tin dịch vụ</h2>
                                    <p className="text-sm text-gray-600">Nhập thông tin chi tiết về dịch vụ mới</p>
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
                                            Tên dịch vụ
                                        </label>
                                        <input
                                            type="text"
                                            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                                errors.serviceName ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-gray-300"
                                            }`}
                                            placeholder="VD: Thay dầu động cơ"
                                            {...register("serviceName", { required: "Vui lòng nhập tên dịch vụ" })}
                                        />
                                        {errors.serviceName && (
                                            <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {errors.serviceName.message}
                                            </p>
                                        )}
                                    </div>

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
                                            placeholder="VD: 500000"
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
                                            <svg className="w-4 h-4 inline mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Mô tả ngắn
                                        </label>
                                        <textarea
                                            placeholder="Mô tả các công việc sẽ thực hiện, phụ tùng liên quan..."
                                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 hover:border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors h-24 resize-none"
                                            {...register("shortDescription")}
                                        ></textarea>
                                    </div>
                                </div>

                                {/* Column 2 */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            <svg className="w-4 h-4 inline mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Thời gian ước tính (phút)
                                        </label>
                                        <input
                                            type="number"
                                            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                                errors.estimatedTime ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-gray-300"
                                            }`}
                                            placeholder="VD: 45"
                                            {...register("estimatedTime", { 
                                                required: "Vui lòng nhập thời gian", 
                                                valueAsNumber: true, 
                                                min: { value: 1, message: "Thời gian phải lớn hơn 0" } 
                                            })}
                                        />
                                        {errors.estimatedTime && (
                                            <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {errors.estimatedTime.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            <svg className="w-4 h-4 inline mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Trạng thái
                                        </label>
                                        <select
                                            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                                errors.status ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-gray-300"
                                            }`}
                                            {...register("status", { required: "Vui lòng chọn trạng thái" })}
                                        >
                                            <option value="Active">Hoạt động</option>
                                            <option value="Inactive">Không hoạt động</option>
                                        </select>
                                        {errors.status && (
                                            <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {errors.status.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            <svg className="w-4 h-4 inline mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            Mô tả chi tiết
                                        </label>
                                        <textarea
                                            placeholder="Mô tả chi tiết về dịch vụ..."
                                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 hover:border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors h-32 resize-none"
                                            {...register("description")}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Form Actions */}
                            <div className="flex gap-4 justify-end mt-8 pt-6 border-t border-gray-100">
                                <Link to="/admin/services" className="button">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Huỷ
                                </Link>
                                <button type="submit" className="button primary">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Lưu Dịch Vụ
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
} 