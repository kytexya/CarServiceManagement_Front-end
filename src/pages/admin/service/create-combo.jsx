import Select from "@/components/form/select";
import { CATEGORIES, SERVICES, UNITS } from "@/utils/constant";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "@/components/form/input";
import Toggle from "@/components/form/toggle";
import Checkbox from "@/components/form/checkbox";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { showError, showSuccess } from "@/utils";

const schema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên khuyến mãi!"), // not null

  serviceIds: yup
    .array()
    .of(yup.number().integer("Mỗi dịch vụ phải là số nguyên"))
    .min(1, "Phải chọn ít nhất một dịch vụ")
    .typeError("Phải chọn ít nhất một dịch vụ")
    .required("Trường dịch vụ không được để trống"),

  description: yup
    .string()
    .required("Mô tả không được để trống"),

  price: yup
    .number()
    .typeError("Vui lòng nhập giá tiền!")
    .required("Vui lòng nhập giá tiền!"), // not null

  discount: yup
    .number()
    .typeError("Vui lòng nhập giá khuyễn mãi")
    .optional(), // not null

});

const CreateService = () => {
  const { id } = useParams();
  const comboId = /^\d+$/.test(id) ? id : null;
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
      discount: 0
    },
  });
  const status = watch("status");
  const navigate = useNavigate();
  const token = localStorage.getItem("carserv-token");
  const [serviceTypes, setServiceTypes] = useState([]);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(`/api/services/get-all-services?currentPage=1&pageSize=1000`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'anyvalue',
          },
          withCredentials: true
        });
        setServiceTypes(
          (res.data?.items || []).map(item => ({
            id: item.serviceId,
            title: item.name
          }))
        );
      } catch (err) {
        showError("Không tải được danh sách dịch vụ");
      }
    };
    fetchService();
  }, []);

  useEffect(() => {
    if (comboId) {
      const fetchComboService = async () => {
        try {
          const response = await axios.get(`/api/services/get-service-package/${comboId}`, {
            headers: { Authorization: `Bearer ${token}`, "ngrok-skip-browser-warning": "anyvalue" },
          });
          const service = response.data;
          setValue("name", service.name);
          setValue("serviceIds", service.services.map(s => String(s.serviceId)));
          setValue("discount", service.discount);
          setValue("price", service.price);
          setValue("description", service.description);
          console.log(service.services.map(s => s.serviceId));
        } catch (error) {
          console.error(error);
          showError("Không thể lấy dữ liệu dịch vụ!");
        }
      };
      fetchComboService();
    }
  }, [comboId, setValue]);

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("carserv-token");

      if (comboId) {
        const response = await axios.put(
          `/api/services/update-service-package/${comboId}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "anyvalue",
            },
          }
        );

        console.log("Cập nhật dịch vụ thành công:", response.data);
        showSuccess("Cập nhật dịch vụ thành công!");
      } else {
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
        showSuccess("Tạo combo dịch vụ thành công!");
      }

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
      <h1 className="text-2xl font-bold mb-6">{comboId ? 'Chỉnh sửa combo dịch vụ' : 'Thêm combo dịch vụ'}</h1>

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
            label={"Giảm giá (%)"}
            placeholder={"Nhập giảm giá"}
            register={register}
            type="number"
            name={"discount"}
            error={errors?.discount}
          />
          <TextInput
            label={"Mô tả"}
            placeholder={"Nhập mô tả"}
            register={register}
            name={"description"}
            error={errors?.description}
          />
        </div>
        <div className="mb-4">
          <Checkbox
          name={"serviceIds"}
          register={register}
          label={"Dịch vụ trong gói"}
          placeholder={"Nhập dịch vụ trong gói"}
          error={errors?.serviceIds}
          options={serviceTypes}
        />
        </div>

        <button className="bg-primary px-4 py-2 text-white font-bold rounded-md">
          {comboId ? 'Chỉnh sửa' : 'Tạo'}
        </button>
      </form>
    </div>
  );
};

export default CreateService;
