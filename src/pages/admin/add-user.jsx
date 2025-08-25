import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import SidebarAdmin from '@/components/common/sidebar-admin';
import { showError, showSuccess } from '@/utils';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from '@/components/form/input';
import TextArea from '@/components/form/textarea';
import Select from '@/components/form/select';
import axios from 'axios';

const schema = yup.object().shape({
    fullName: yup
    .string()
    .required("Họ và tên là bắt buộc")
    .min(2, "Tên phải có ít nhất 2 ký tự"),

    email: yup
    .string()
    .required("Email là bắt buộc")
    .email("Email không hợp lệ"),

    PhoneNumber: yup
    .string()
    .required("Số điện thoại là bắt buộc")
    .matches(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ"),

    username: yup
    .string()
    .required("Tên đăng nhập là bắt buộc")
    .min(2, "Tên đăng nhập phải có ít nhất 3 ký tự"),

    RoleName: yup
    .string()
    .required("Vai trò là bắt buộc"),

    password: yup
    .string()
    .required("Mật khẩu là bắt buộc")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),

    confirmPassword: yup
    .string()
    .required("Xác nhận mật khẩu là bắt buộc")
    .oneOf([yup.ref('password')], "Mật khẩu không khớp"),
});

export default function AddUserPage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch
    } = useForm({
        resolver: yupResolver(schema),
    });

    const selectedRole = watch('RoleName');

    const roles = [
        { value: 'admin', label: 'Admin', description: 'Quản trị viên hệ thống' },
        { value: 'staff', label: 'Nhân viên', description: 'Nhân viên phục vụ khách hàng' },
        { value: 'inventory_manager', label: 'Quản lý kho', description: 'Quản lý kho phụ tùng' },
        { value: 'technician', label: 'Kỹ thuật viên', description: 'Kỹ thuật viên sửa chữa' },
        { value: 'customer', label: 'Khách hàng', description: 'Khách hàng sử dụng dịch vụ' }
    ];

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
        const token = localStorage.getItem("carserv-token");
        const res = await axios.post(`/api/Account/create-new-account`, data, {
            headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'anyvalue',
            },
        });

        showSuccess("Thêm người dùng thành công!");
        reset();
        navigate("/admin/user-management");
        } catch (error) {
        console.error("Thêm người dùng thất bại:", error);
        showError(error.response?.data?.message || "Có lỗi xảy ra khi thêm người dùng!");
        } finally {
        setIsLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/admin/user-management');
    };

    return (
        <div className="flex flex-row w-full h-screen bg-gray-50">
            <div className="flex flex-col w-full">
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b bg-white shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Thêm người dùng mới</h1>
                            <p className="text-xs text-gray-600">Tạo tài khoản người dùng mới</p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleCancel}
                            className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Hủy
                        </button>
                        <button
                            onClick={handleSubmit(onSubmit)}
                            disabled={isLoading}
                            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                            {isLoading ? 'Đang xử lý...' : 'Thêm người dùng'}
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="p-6">
                    <div className="max-w-6xl">
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                            {/* Left Column - Main Form */}
                            <div className="space-y-6">
                                {/* Basic Information */}
                                <div className="bg-white p-6 rounded-lg shadow-sm">
                                    <h2 className="text-lg font-bold text-gray-900 mb-4">Thông tin cơ bản</h2>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Full Name */}
                                        <div>
                                            <TextInput
                                                isRequired
                                                label={"Họ và tên"}
                                                placeholder={"Nhập họ và tên"}
                                                register={register}
                                                name={"fullName"}
                                                error={errors?.fullName}
                                            />
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <TextInput
                                                type={"email"}
                                                isRequired
                                                label={"Email"}
                                                placeholder={"example@email.com"}
                                                register={register}
                                                name={"email"}
                                                error={errors?.email}
                                            />
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <TextInput
                                                type={"tel"}
                                                isRequired
                                                label={"Số điện thoại"}
                                                placeholder={"0123456789"}
                                                register={register}
                                                name={"PhoneNumber"}
                                                error={errors?.PhoneNumber}
                                            />
                                        </div>

                                        {/* Date of Birth */}
                                        <div>
                                            <TextInput
                                                type={"date"}
                                                label={"Ngày sinh"}
                                                register={register}
                                                name={"dateOfBirth"}
                                            />
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div className="mt-4">
                                        <TextArea
                                            label={"Địa chỉ"}
                                            register={register}
                                            name={"address"}
                                            placeholder={"Nhập địa chỉ chi tiết"}
                                        />
                                    </div>
                                </div>

                                {/* Account Information */}
                                <div className="bg-white p-6 rounded-lg shadow-sm">
                                    <h2 className="text-lg font-bold text-gray-900 mb-4">Thông tin tài khoản</h2>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Username */}
                                        <div>
                                            <TextInput
                                                isRequired
                                                label={"Tên đăng nhập"}
                                                placeholder={"Nhập tên đăng nhập"}
                                                register={register}
                                                name={"username"}
                                                error={errors?.username}
                                            />
                                        </div>

                                        {/* Role */}
                                        <div>
                                            <Select
                                                isRequired
                                                label={"Vai trò"}
                                                placeholder={"Chọn vai trò"}
                                                register={register}
                                                name={"RoleName"}
                                                error={errors?.RoleName}
                                                options={roles}
                                            />
                                            {selectedRole && (
                                                <p className="mt-1 text-sm text-gray-500">
                                                    {roles.find(r => r.value === selectedRole)?.description}
                                                </p>
                                            )}
                                        </div>

                                        {/* Password */}
                                        <div>
                                            <TextInput
                                                type={"password"}
                                                label={"Mật khẩu"}
                                                placeholder={"Nhập mật khẩu"}
                                                register={register}
                                                name={"password"}
                                                error={errors?.password}
                                            />
                                        </div>

                                        {/* Confirm Password */}
                                        <div>
                                            <TextInput
                                                type={"password"}
                                                label={"Xác nhận mật khẩu"}
                                                placeholder={"Nhập lại mật khẩu"}
                                                register={register}
                                                name={"confirmPassword"}
                                                error={errors?.confirmPassword}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Additional Information */}
                            <div className="space-y-6">
                                {/* Additional Information */}
                                <div className="bg-white p-6 rounded-lg shadow-sm">
                                    <h2 className="text-lg font-bold text-gray-900 mb-4">Thông tin bổ sung</h2>
                                    
                                    <div className="space-y-4">
                                        {/* Department */}
                                        <div>
                                            <TextInput
                                                label={"Phòng ban"}
                                                placeholder={"Nhập phòng ban"}
                                                register={register}
                                                name={"department"}
                                            />
                                        </div>

                                        {/* Position */}
                                        <div>
                                            <TextInput
                                                label={"Chức vụ"}
                                                placeholder={"Nhập chức vụ"}
                                                register={register}
                                                name={"position"}
                                            />
                                        </div>

                                        {/* Notes */}
                                        <div>
                                            <TextArea
                                                label={"Ghi chú"}
                                                placeholder={"Ghi chú thêm về người dùng"}
                                                register={register}
                                                name={"notes"}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex justify-end gap-3 pt-6">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-6 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Hủy
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-6 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                            >
                                {isLoading ? 'Đang xử lý...' : 'Thêm người dùng'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 