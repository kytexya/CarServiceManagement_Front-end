import Select from "@/components/form/select";
import { UNITS } from "@/utils/constant";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "@/components/form/input";

const schema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên phụ tùng!"), // not null

  unit: yup
    .number()
    .typeError("Vui lòng chọn trạng thái")
    .required("Vui lòng chọn trạng thái"), // not null

  quantity: yup
    .number()
    .typeError("Số lượng phải là số") // báo lỗi nếu nhập string
    .required("Số lượng không được để trống")
    .integer("Số lượng phải là số nguyên")
    .min(1, "Số lượng phải lớn hơn 0"), // string not null
});

const staffList = [
  { value: 1, label: "Nguyễn Thị B" },
  { value: 2, label: "Lê Văn D" },
  { value: 3, label: "Trần Văn F" },
];

const customerList = [
  { value: 1, label: "29H 12345 - Nguyễn Thị B - Toyota Soluto 2024" },
  { value: 2, label: "74A 23456 - Lê Văn D - Honda Civic 2022" },
  { value: 3, label: "47B 34567 - Trần Văn F - Honda CRV 2024" },
];


const ServiceOrders = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Thêm phiếu dịch vụ</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg shadow p-6 mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Select
            label={"Khách hàng"}
            options={customerList}
            name={"customer"}
            register={register}
            placeholder="Chọn khách hàng"
            error={errors?.customer}
          />
          <Select
            label={"Nhân viên phụ trách"}
            options={staffList}
            name={"assignedTo"}
            register={register}
            placeholder="Chọn nhân viên"
            error={errors?.assignedTo}
          />
        </div>

        <button className="bg-primary px-4 py-2 text-white font-bold rounded-md">
          Tạo
        </button>
      </form>
    </div>
  );
};

export default ServiceOrders;
