import { showError } from '@/utils';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

// Mock data for demonstration, should be consistent with the profile page
const mockCustomer = {
    name: "Trần Văn Khách",
    email: "tvkhach@example.com",
    phoneNumber: "0909123456",
    address: "456 Đường XYZ, Quận 2, TP. HCM",
};

export default function EditProfilePage() {
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        // Populate form with mock data
        setValue('name', mockCustomer.name);
        setValue('email', mockCustomer.email);
        setValue('phoneNumber', mockCustomer.phoneNumber);
        setValue('address', mockCustomer.address);
    }, [setValue]);

    const onSubmit = (data) => {
        console.log("Updated Profile Data:", data);
        showError("Chức năng cập nhật thông tin chưa được kết nối API.");
    };

    return (
        <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
                <h1 className='text-3xl font-bold text-center mb-8'>Cập Nhật Thông Tin</h1>
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="font-semibold text-sm">Họ và tên</label>
                        <input
                            type="text"
                            className={`input-field mt-1 ${errors.name ? "border-red-500" : "border-gray-300"}`}
                            {...register("name", { required: "Vui lòng nhập họ tên" })}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                        <label className="font-semibold text-sm">Email</label>
                        <input
                            type="email"
                            className={`input-field mt-1 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                            {...register("email", {
                                required: "Vui lòng nhập email",
                                pattern: { value: /^\S+@\S+$/i, message: "Địa chỉ email không hợp lệ" }
                            })}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label className="font-semibold text-sm">Địa chỉ</label>
                        <input
                            type="text"
                            className={`input-field mt-1 ${errors.address ? "border-red-500" : "border-gray-300"}`}
                            {...register("address")}
                        />
                    </div>
                    <div>
                        <label className="font-semibold text-sm">Số điện thoại</label>
                        <input
                            type="text"
                            readOnly
                            className={`input-field mt-1 bg-gray-100 cursor-not-allowed`}
                            {...register("phoneNumber")}
                        />
                        <p className="text-xs text-gray-500 mt-1">Số điện thoại không thể thay đổi.</p>
                    </div>

                    <div className="flex items-center justify-end gap-4 pt-4">
                        <Link to="/profile" className="button">
                            Huỷ
                        </Link>
                        <button type="submit" className="button primary">
                            Lưu Thay Đổi
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}