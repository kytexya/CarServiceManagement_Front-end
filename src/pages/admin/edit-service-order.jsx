import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import TextInput from "@/components/form/input";
import Select from "@/components/form/select";
import { SERVICES } from "@/utils/constant";

const schema = yup.object().shape({
  plateNumber: yup.string().required("Vui lòng nhập biển số xe!"),
  customerName: yup.string().required("Vui lòng nhập tên khách hàng!"),
  phone: yup
    .string()
    .matches(/^[0-9]{9,11}$/, "Số điện thoại không hợp lệ")
    .required("Vui lòng nhập số điện thoại!"),
  service: yup.string().required("Vui lòng chọn dịch vụ!"),
  assignedTo: yup.number().required("Vui lòng nhập nhân viên phụ trách!"),
  status: yup.string().required("Vui lòng chọn trạng thái!"),
  estimatedTime: yup.string().required("Vui lòng nhập thời gian ước tính!"),
  notes: yup.string().optional(),
});

export default function EditServiceOrder() {
  const { id } = useParams();
  const navigate = useNavigate();

  // mock dữ liệu (thay bằng API GET)
  const mockOrder = {
    id: "SO001",
    plateNumber: "30A-12345",
    customerName: "Nguyễn Văn A",
    phone: "0123456789",
    service: 2,
    assignedTo: 1,
    status: "Scheduled",
    estimatedTime: 30,
    notes: "Kiểm tra thêm hệ thống phanh",
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      plateNumber: "",
      customerName: "",
      phone: "",
      service: 0,
      assignedTo: "",
      status: "Scheduled",
      estimatedTime: "",
      notes: "",
    },
  });

  useEffect(() => {
    Object.keys(mockOrder).forEach((key) => {
      setValue(key, mockOrder[key]);
    });
  }, [id, setValue]);

  const onSubmit = (data) => {
    console.log("Cập nhật đơn dịch vụ:", data);
    // TODO: call API PUT /ServiceOrders/{id}
    alert("Cập nhật thành công!");
    navigate("/service-orders");
  };

  const staffList = [
    { value: 1, label: "Nguyễn Thị B" },
    { value: 2, label: "Lê Văn D" },
    { value: 3, label: "Trần Văn F" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Cập nhật đơn dịch vụ #{id}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg shadow p-6 mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <TextInput
            label="Biển số xe"
            name="plateNumber"
            placeholder="Nhập biển số xe"
            register={register}
            error={errors?.plateNumber}
            readOnly
          />

          <TextInput
            label="Tên khách hàng"
            name="customerName"
            placeholder="Nhập tên khách hàng"
            register={register}
            error={errors?.customerName}
            readOnly
          />

          <TextInput
            label="Số điện thoại"
            name="phone"
            placeholder="Nhập số điện thoại"
            register={register}
            error={errors?.phone}
            readOnly
          />

          <Select
            label="Dịch vụ"
            options={SERVICES.map(s => ({ value: s.id, label: s.title }))}
            name="service"
            register={register}
            placeholder="Chọn loại dịch vụ"
            error={errors?.service}
          />


          <Select
            label={"Nhân viên phụ trách"}
            options={staffList}
            name={"assignedTo"}
            register={register}
            placeholder="Chọn nhân viên"
            error={errors?.assignedTo}
          />

          <Select
            label="Trạng thái"
            name="status"
            register={register}
            error={errors?.status}
            options={[
              { value: "Scheduled", label: "Đã đặt lịch" },
              { value: "In Progress", label: "Đang xử lý" },
              { value: "Completed", label: "Hoàn thành" },
              { value: "Cancelled", label: "Đã hủy" },
            ]}
          />

          <TextInput
            type="number"
            label="Thời gian ước tính (phút)"
            name="estimatedTime"
            placeholder="30"
            register={register}
            error={errors?.estimatedTime}
          />
        </div>

        <div className="mb-4">
          <TextInput
            label="Ghi chú"
            name="notes"
            placeholder="Nhập ghi chú (nếu có)"
            register={register}
            error={errors?.notes}
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate("/admin/service-orders")}
            className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="bg-primary px-6 py-2 text-white font-semibold rounded-md"
          >
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
}
