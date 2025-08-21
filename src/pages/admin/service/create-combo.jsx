import Select from "@/components/form/select";
import { CATEGORIES, SERVICES, UNITS } from "@/utils/constant";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "@/components/form/input";
import Toggle from "@/components/form/toggle";
import Checkbox from "@/components/form/checkbox";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên khuyến mãi!"), // not null

  services: yup
    .array()
    .of(yup.number().integer("Mỗi dịch vụ phải là số nguyên"))
    .min(1, "Phải chọn ít nhất một dịch vụ")
    .typeError("Phải chọn ít nhất một dịch vụ")
    .required("Trường dịch vụ không được để trống"),

  price: yup
    .number()
    .typeError("Vui lòng nhập giá tiền!")
    .required("Vui lòng nhập giá tiền!"), // not null

  percent: yup
    .number()
    .typeError("Vui lòng phần trăm khuyễn mãi")
    .optional(), // not null

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
      percent: 0
    },
  });
  const status = watch("status");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("carserv-token");

      const response = await axios.post(
        `/api/services/create-service-package`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "anyvalue",
          },
        }
      );

      console.log("Tạo combo dịch vụ thành công:", response.data);
      alert("Tạo combo dịch vụ thành công!");

      navigate('/admin/service-management')
    } catch (error) {
      console.error("Error:", error);
      alert(
        error.response?.data?.message || "Không thể tạo combo dịch vụ!"
      );
    }
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Thêm combo dịch vụ</h1>

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

          <TextInput
            label={"Giá tiền (VND)"}
            placeholder={"Nhập giá tiền"}
            register={register}
            type="number"
            name={"price"}
            error={errors?.price}
          />
          <TextInput
            label={"Giảm giá (VND)"}
            placeholder={"Nhập giảm giá"}
            register={register}
            type="number"
            name={"percent"}
            error={errors?.percent}
          />
          <Checkbox
            name={"services"}
            register={register}
            label={"Dịch vụ trong gói"}
            error={errors?.services}
            options={SERVICES}
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
