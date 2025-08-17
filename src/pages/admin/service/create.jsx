import Select from "@/components/form/select";
import { CATEGORIES, SERVICES, UNITS } from "@/utils/constant";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "@/components/form/input";
import Toggle from "@/components/form/toggle";

const schema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên khuyến mãi!"), // not null

  category: yup
    .number()
    .typeError("Vui lòng chọn trạng thái")
    .required("Vui lòng chọn trạng thái"), // not null
  
  timer: yup
    .number()
    .typeError("Vui lòng điền thời gian thực hiện dịch vụ!")
    .required("Vui lòng điền thời gian thực hiện dịch vụ!"), // not null
  
  price: yup
    .number()
    .typeError("Vui lòng nhập giá tiền!")
    .required("Vui lòng nhập giá tiền!"), // not null

  status: yup.string().optional(),
});

const CreateService = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      status: "active",
    },
  });
  const status = watch("status");

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Thêm dịch vụ</h1>

      {/* Form gửi thông báo */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg shadow p-6 mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <TextInput
            label={"Tên dịch vụ"}
            placeholder={"Nhập tên dịch vụ"}
            register={register}
            name={"name"}
            error={errors?.name}
          />
          <Select 
            name={"category"}
            options={CATEGORIES}
            register={register}
            label={"Danh mục"}
            placeholder="Chọn danh mục"
            error={errors?.category}
          />
          <TextInput
            label={"Giá tiền (VND)"}
            placeholder={"Nhập giá tiền"}
            register={register}
            type="number"
            name={"price"}
            error={errors?.price}
          />
          <TextInput
            label={"Thời gian thực hiện (phút)"}
            placeholder={"Nhập thời gian"}
            register={register}
            type="number"
            name={"timer"}
            error={errors?.timer}
          />
          <Toggle
            isActive={true}
            onClick={() => {
              status === "active"
                ? setValue("status", "inactive")
                : setValue("status", "active");
            }}
            label={"Trạng thái"}
          />
        </div>

        <button className="bg-primary px-4 py-2 text-white font-bold rounded-md">
          Tạo
        </button>
      </form>
    </div>
  );
};

export default CreateService;
