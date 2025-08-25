import TextInput from '@/components/form/input';
import { showError, showSuccess } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from "yup";

const ENV = import.meta.env.VITE_API_BASE_URL

const schema = yup.object().shape({
  fullName: yup
    .string()
    .required("Vui lòng nhập họ tên"),

  email: yup
    .string()
    .required("Vui lòng nhập email")
    .email("Địa chỉ email không hợp lệ"),
});

export default function EditProfilePage() {
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const [customer, setCustomer] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        const storedProfile = localStorage.getItem("carserv-profile");
        if (!storedProfile) return;

        try {
            const profile = JSON.parse(storedProfile);
            setCustomer(profile);
            setValue('fullName', profile?.fullName);
            setValue('email', profile?.email);
            setValue('phoneNumber', profile?.phoneNumber);
            setValue('Address', profile?.address);
        } catch (error) {
            console.error("Lấy profile từ localStorage thất bại", error);
        }
        // Populate form with mock data
    }, [setValue]);

    const onSubmit = async (data) => {
        try {
            const token = localStorage.getItem("carserv-token");
            const res = await axios.put(`/api/Account/update-profile/${customer.userID}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'ngrok-skip-browser-warning': 'anyvalue',
                },
                // withCredentials: true,
            });

            console.log("Profile updated:", res.data);
            setCustomer(res.data);
            setValue('fullName', res.data?.fullName);
            setValue('email', res.data?.email);
            setValue('phoneNumber', res.data?.phoneNumber);
            setValue('Address', res.data?.address);

            const storedProfile = localStorage.getItem("carserv-profile");
            if (storedProfile) {
                const profileObj = JSON.parse(storedProfile);
                profileObj.fullName = res.data?.fullName;
                profileObj.email = res.data?.email;
                profileObj.phoneNumber = res.data?.phoneNumber;
                profileObj.address = res.data?.address;
                localStorage.setItem("carserv-profile", JSON.stringify(profileObj));
            }

            showSuccess("Cập nhật thông tin thành công!");
        } catch (error) {
            console.error("Cập nhật thất bại:", error);
            showError(error.response?.data?.message || "Cập nhật thất bại!");
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
                <h1 className='text-3xl font-bold text-center mb-8'>Cập Nhật Thông Tin</h1>
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <TextInput
                            label={"Họ và tên"}
                            register={register}
                            name={"fullName"}
                            error={errors?.name}
                        />
                    </div>
                    <div>
                        <TextInput
                            type={'email'}
                            label={"Email"}
                            register={register}
                            name={"email"}
                            error={errors?.email}
                        />
                    </div>
                    <div>
                        <TextInput
                            label={"Địa chỉ"}
                            register={register}
                            name={"Address"}
                        />
                    </div>
                    <div>
                        <TextInput
                            label={"Số điện thoại"}
                            register={register}
                            name={"phoneNumber"}
                            readOnly
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