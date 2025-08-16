import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import SidebarAdmin from '@/components/common/sidebar-admin';
import { showError, showSuccess } from '@/utils';

export default function AddUserPage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch
    } = useForm();

    const selectedRole = watch('role');

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
            // Mock API call
            console.log('Form data:', data);
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            showSuccess('Thêm người dùng thành công!');
            reset();
            navigate('/admin/user-management');
        } catch (error) {
            showError('Có lỗi xảy ra khi thêm người dùng.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/admin/user-management');
    };

    return (
        <div className="flex flex-row w-full h-screen bg-gray-50">
            <SidebarAdmin />
            <div className="flex flex-col w-full pl-[220px]">
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
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Họ và tên <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                {...register('fullName', { 
                                                    required: 'Họ và tên là bắt buộc',
                                                    minLength: { value: 2, message: 'Tên phải có ít nhất 2 ký tự' }
                                                })}
                                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                                    errors.fullName ? 'border-red-300' : 'border-gray-300'
                                                }`}
                                                placeholder="Nhập họ và tên"
                                            />
                                            {errors.fullName && (
                                                <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
                                            )}
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                {...register('email', { 
                                                    required: 'Email là bắt buộc',
                                                    pattern: { 
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: 'Email không hợp lệ'
                                                    }
                                                })}
                                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                                    errors.email ? 'border-red-300' : 'border-gray-300'
                                                }`}
                                                placeholder="example@email.com"
                                            />
                                            {errors.email && (
                                                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                                            )}
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Số điện thoại <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                {...register('phone', { 
                                                    required: 'Số điện thoại là bắt buộc',
                                                    pattern: { 
                                                        value: /^[0-9]{10,11}$/,
                                                        message: 'Số điện thoại không hợp lệ'
                                                    }
                                                })}
                                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                                    errors.phone ? 'border-red-300' : 'border-gray-300'
                                                }`}
                                                placeholder="0123456789"
                                            />
                                            {errors.phone && (
                                                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                                            )}
                                        </div>

                                        {/* Date of Birth */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Ngày sinh
                                            </label>
                                            <input
                                                type="date"
                                                {...register('dateOfBirth')}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div className="mt-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Địa chỉ
                                        </label>
                                        <textarea
                                            {...register('address')}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Nhập địa chỉ chi tiết"
                                        />
                                    </div>
                                </div>

                                {/* Account Information */}
                                <div className="bg-white p-6 rounded-lg shadow-sm">
                                    <h2 className="text-lg font-bold text-gray-900 mb-4">Thông tin tài khoản</h2>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Username */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Tên đăng nhập <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                {...register('username', { 
                                                    required: 'Tên đăng nhập là bắt buộc',
                                                    minLength: { value: 3, message: 'Tên đăng nhập phải có ít nhất 3 ký tự' }
                                                })}
                                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                                    errors.username ? 'border-red-300' : 'border-gray-300'
                                                }`}
                                                placeholder="Nhập tên đăng nhập"
                                            />
                                            {errors.username && (
                                                <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
                                            )}
                                        </div>

                                        {/* Role */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Vai trò <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                {...register('role', { required: 'Vai trò là bắt buộc' })}
                                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                                    errors.role ? 'border-red-300' : 'border-gray-300'
                                                }`}
                                            >
                                                <option value="">Chọn vai trò</option>
                                                {roles.map((role) => (
                                                    <option key={role.value} value={role.value}>
                                                        {role.label}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.role && (
                                                <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
                                            )}
                                            {selectedRole && (
                                                <p className="mt-1 text-sm text-gray-500">
                                                    {roles.find(r => r.value === selectedRole)?.description}
                                                </p>
                                            )}
                                        </div>

                                        {/* Password */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Mật khẩu <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="password"
                                                {...register('password', { 
                                                    required: 'Mật khẩu là bắt buộc',
                                                    minLength: { value: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' }
                                                })}
                                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                                    errors.password ? 'border-red-300' : 'border-gray-300'
                                                }`}
                                                placeholder="Nhập mật khẩu"
                                            />
                                            {errors.password && (
                                                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                                            )}
                                        </div>

                                        {/* Confirm Password */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Xác nhận mật khẩu <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="password"
                                                {...register('confirmPassword', { 
                                                    required: 'Xác nhận mật khẩu là bắt buộc',
                                                    validate: value => value === watch('password') || 'Mật khẩu không khớp'
                                                })}
                                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                                    errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                                                }`}
                                                placeholder="Nhập lại mật khẩu"
                                            />
                                            {errors.confirmPassword && (
                                                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                                            )}
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
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Phòng ban
                                            </label>
                                            <input
                                                type="text"
                                                {...register('department')}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Nhập phòng ban"
                                            />
                                        </div>

                                        {/* Position */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Chức vụ
                                            </label>
                                            <input
                                                type="text"
                                                {...register('position')}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Nhập chức vụ"
                                            />
                                        </div>

                                        {/* Notes */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Ghi chú
                                            </label>
                                            <textarea
                                                {...register('notes')}
                                                rows={6}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Ghi chú thêm về người dùng"
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