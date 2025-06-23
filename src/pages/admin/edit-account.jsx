import SidebarAdmin from '@/components/common/sidebar-admin';
import { showError } from '@/utils';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';

// Mock data for demonstration
const mockUser = {
    id: "USER001",
    username: "nhanvien01",
    name: "Lê Thị B",
    phoneNumber: "0912345678",
    role: "2", // Service Staff
};

export default function AdminEditAccountPage() {
    const { id } = useParams();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        // Populate form with mock data
        setValue("username", mockUser.username);
        setValue("name", mockUser.name);
        setValue("phoneNumber", mockUser.phoneNumber);
        setValue("role", mockUser.role);
    }, [setValue]);

    const onSubmit = (data) => {
        console.log("Updated Form Data:", data);
        showError(`Chức năng chỉnh sửa tài khoản ${id} chưa được kết nối API.`);
    };

    return (
        <div className="flex flex-row w-full h-screen bg-gray-50">
            <SidebarAdmin />
            <div className="flex flex-col w-full">
                <div className="flex justify-between items-center px-8 py-4 border-b bg-white">
                    <h1 className="text-2xl font-bold">Chỉnh Sửa Tài Khoản Hệ Thống</h1>
                    <Link to="/admin/account" className="button">
                        Quay Lại
                    </Link>
                </div>
                <div className="p-8">
                    <form className="bg-white rounded-xl border p-8 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6" onSubmit={handleSubmit(onSubmit)}>
                        {/* Column 1 */}
                        <div>
                            <label className="font-semibold">Tên đăng nhập</label>
                            <input
                                type="text"
                                className={`input-field mt-2 bg-gray-100`}
                                {...register("username")}
                                readOnly // Username usually shouldn't be changed
                            />
                        </div>
                        <div>
                            <label className="font-semibold">Họ và tên</label>
                            <input
                                type="text"
                                placeholder="Nhập họ và tên..."
                                className={`input-field mt-2 ${errors.name ? "border-red-500" : "border-gray-300"}`}
                                {...register("name", {
                                    required: "Vui lòng nhập họ và tên",
                                })}
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                        </div>
                        <div>
                            <label className="font-semibold">Mật khẩu</label>
                            <input
                                type="password"
                                placeholder="Để trống nếu không đổi"
                                className={`input-field mt-2 ${errors.password ? "border-red-500" : "border-gray-300"}`}
                                {...register("password", {
                                    minLength: { value: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
                                })}
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        </div>

                        {/* Column 2 */}
                        <div>
                            <label className="font-semibold">Số điện thoại</label>
                            <input
                                type="text"
                                inputMode="numeric"
                                placeholder="Nhập số điện thoại..."
                                className={`input-field mt-2 ${errors.phoneNumber ? "border-red-500" : "border-gray-300"}`}
                                {...register("phoneNumber", {
                                    required: "Vui lòng nhập số điện thoại",
                                    pattern: { value: /^[0-9]{10}$/, message: "Số điện thoại phải có 10 chữ số" },
                                })}
                            />
                            {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
                        </div>
                        <div>
                            <label className="font-semibold">Phân quyền</label>
                            <select
                                className={`input-field mt-2 ${errors.role ? "border-red-500" : "border-gray-300"}`}
                                {...register("role", { required: "Vui lòng chọn phân quyền" })}
                            >
                                <option value="">-- Chọn vai trò --</option>
                                <option value="1">Admin</option>
                                <option value="2">Nhân viên Dịch vụ</option>
                                <option value="4">Quản lý Kho</option>
                            </select>
                            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
                        </div>
                         <div>
                            {/* Empty div for alignment */}
                        </div>

                        {/* Form Actions */}
                        <div className="md:col-span-2 flex gap-4 justify-end mt-4">
                            <Link to="/admin/account" className="button">
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