import TextInput from "@/components/form/input";
import TextArea from "@/components/form/textarea";
import { showError, showSuccess } from "@/utils";
import { UNITS } from "@/utils/constant";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

const schema = yup.object().shape({
    partName: yup.string().required("Vui lòng nhập tên phụ tùng"),
    quantity: yup
        .number()
        .typeError("Vui lòng nhập số lượng hợp lệ")
        .required("Vui lòng nhập số lượng")
        .min(1, "Số lượng phải lớn hơn 0"),
    price: yup
        .number()
        .typeError("Vui lòng nhập giá hợp lệ")
        .required("Vui lòng nhập giá")
        .min(0, "Giá không được âm"),
    supplierName: yup.string().required("Vui lòng nhập nhà cung cấp"),
    unit: yup
        .string()
        .matches(/^[\p{L}\s]+$/u, "Đơn vị chỉ được nhập chữ")
        .required("Vui lòng nhập đơn vị"),
});

export default function AddInventoryPage() {
    const token = localStorage.getItem("carserv-token");
    const navigate = useNavigate();
    const [suppliers, setSuppliers] = useState([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const res = await axios.get("/api/Parts/suppliers?currentPage=1&pageSize=100", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "ngrok-skip-browser-warning": "anyvalue",
                    },
                });
                setSuppliers(res.data.items);
            } catch (err) {
                console.error("Lỗi khi load suppliers:", err);
                showError("Không thể tải danh sách nhà cung cấp!");
            }
        };
        fetchSuppliers();
    }, [token]);

    const onSubmit = async (data) => {
        const now = new Date();
        const expiryDate = new Date(now.setFullYear(now.getFullYear() + 1))
            .toISOString()
            .split("T")[0];
        try {
            const payload = {
                partName: data.partName,
                quantity: data.quantity,
                unitPrice: data.price,
                expiryDate: expiryDate,
                warrantyMonths: 12,
                unit: data.unit,
                partPrices: [
                    {
                        price: 0,
                        effectiveFrom: now,
                    }
                ],
                warrantyClaims: [{
                    supplierId: data.supplierName,
                    claimDate: moment(new Date(now.setFullYear(now.getFullYear() + 1))).format('YYYY-MM-DD'),
                    notes: '',
                }],
            };

            const res = await axios.post("/api/Parts/create", payload, {
                // params: payload,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "ngrok-skip-browser-warning": "anyvalue",
                },
                withCredentials: true,
            });

            showSuccess("Thêm phụ tùng thành công!");
            navigate("/inventory-manager/inventory");
        } catch (err) {
            console.error(err);
            showError("Không thể thêm phụ tùng. Vui lòng thử lại.");
        }
    };

    return (
        <div className="flex flex-col w-full h-screen bg-gray-50">
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
                                <TextInput label={
                                    <>
                                        <svg className="w-4 h-4 inline mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                        </svg>
                                        Tên phụ tùng
                                    </>
                                } register={register} name="partName" error={errors?.partName} placeholder={"VD: Lọc gió điều hòa"} />
                                <TextInput label={
                                    <><svg className="w-4 h-4 inline mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                    </svg>
                                        Số lượng nhập</>
                                } type="number" register={register} name="quantity" error={errors?.quantity} placeholder={"VD: 100"} />
                                <TextInput label={
                                    <><svg className="w-4 h-4 inline mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                    </svg>
                                        Đơn vị</>
                                } register={register} name="unit" error={errors?.unit} placeholder={"Cái"} />
                            </div>

                            {/* Column 2 */}
                            <div className="space-y-6">
                                <TextInput label={
                                    <><svg className="w-4 h-4 inline mr-2 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                    </svg>
                                        Giá (VND)</>
                                } type="number" register={register} name="price" error={errors?.price} placeholder={"VD: 350000"} />
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        <svg className="w-4 h-4 inline mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        Nhà cung cấp
                                    </label>
                                    <select
                                        {...register("supplierName")}
                                        className="w-full px-3 py-2 border rounded-lg"
                                    >
                                        <option value="">-- Chọn nhà cung cấp --</option>
                                        {suppliers.map((s) => (
                                            <option key={s.supplierId} value={s.supplierId}>
                                                {s.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.supplierName && (
                                        <p className="text-red-500 text-sm">{errors.supplierName.message}</p>
                                    )}
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

    );
} 