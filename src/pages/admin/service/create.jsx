import Select from "@/components/form/select";
import { CATEGORIES, SERVICES, UNITS } from "@/utils/constant";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "@/components/form/input";
import Toggle from "@/components/form/toggle";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { showError, showSuccess } from "@/utils";

const schema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên khuyến mãi!"), // not null

  Description: yup
    .string()
    .required("Vui lòng chọn trạng thái"), // not null
  
  estimatedLaborHours: yup
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
  const { id } = useParams();
  const serId = /^\d+$/.test(id) ? id : null;
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
  const navigate = useNavigate();

  useEffect(() => {
    if (serId) {
      const fetchService = async () => {
        try {
          const token = localStorage.getItem("carserv-token");
          const response = await axios.get(`/api/services/a/${serId}`, {
            headers: { Authorization: `Bearer ${token}`, "ngrok-skip-browser-warning": "anyvalue" },
          });
          const service = response.data;
          setValue("name", service.name);
          setValue("category", service.category);
          setValue("price", service.price);
          setValue("estimatedLaborHours", service.estimatedLaborHours);
          setValue("status", service.status);
        } catch (error) {
          console.error(error);
          showError("Không thể lấy dữ liệu dịch vụ!");
        }
      };
      fetchService();
    }
  }, [serId, setValue]);

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("carserv-token");

      const response = await axios.post(
        `/api/services/create-service`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "anyvalue",
          },
        }
      );

      console.log("Tạo combo dịch vụ thành công:", response.data);
      showSuccess("Tạo combo dịch vụ thành công!");

      navigate('/admin/service-management')
    } catch (error) {
      console.error("Error:", error);
      showError(
        error.response?.data?.message || "Không thể tạo combo dịch vụ!"
      );
    }
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
          <TextInput
            label={"Danh mục"}
            placeholder={"Nhập danh mục"}
            register={register}
            name={"Description"}
            error={errors?.Description}
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
            name={"estimatedLaborHours"}
            error={errors?.estimatedLaborHours}
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
