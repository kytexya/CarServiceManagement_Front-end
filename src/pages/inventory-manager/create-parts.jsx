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

const CreateParts = () => {
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
      <h1 className="text-2xl font-bold mb-6">Thêm phụ tùng</h1>

      {/* Form gửi thông báo */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg shadow p-6 mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <TextInput
            label={"Tên phụ tùng"}
            placeholder={"Nhập tên phụ tùng"}
            register={register}
            name={"name"}
            error={errors?.name}
          />
          <TextInput
            label={"Số lượng"}
            placeholder={"Nhập số lượng"}
            register={register}
            type="number"
            name={"quantity"}
            error={errors?.quantity}
          />
          <Select
            label={"Đơn vị"}
            options={UNITS}
            name={"unit"}
            register={register}
            placeholder="Chọn đơn vị"
            error={errors?.unit}
          />
        </div>

        <button className="bg-primary px-4 py-2 text-white font-bold rounded-md">
          Tạo
        </button>
      </form>
    </div>
  );
};

export default CreateParts;
