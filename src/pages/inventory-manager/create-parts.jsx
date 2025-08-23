import Select from "@/components/form/select";
import { UNITS } from "@/utils/constant";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "@/components/form/input";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { showSuccess } from "@/utils";

const schema = yup.object().shape({
  partName: yup.string().required("Vui lòng nhập tên phụ tùng!"), // not null

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
  const { id } = useParams();
  const partId = /^\d+$/.test(id) ? id : null;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (partId) {
      const fetchPart = async () => {
        try {
          const token = localStorage.getItem("carserv-token");
          const res = await axios.get(`/api/Parts/${partId}`, {
            headers: { Authorization: `Bearer ${token}`, 'ngrok-skip-browser-warning': 'anyvalue', },
          });
          const part = res.data;
          setValue("partName", part.partName);
          setValue("quantity", part.quantity);
          setValue("unit", part.unit);
        } catch (error) {
          console.error(error);
          showError("Không thể lấy dữ liệu phụ tùng!");
        }
      };
      fetchPart();
    }
  }, [partId, setValue]);

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("carserv-token");

      if (partId) {
        // edit
        await axios.put(`/api/parts/update`, {}, {
          params: {
            partId: partId,
            partName: data.partName,
            quantity: data.quantity,
            unit: data.unit,
          },
          headers: { Authorization: `Bearer ${token}`, 'ngrok-skip-browser-warning': 'anyvalue', },
        });
        showSuccess("Cập nhật phụ tùng thành công!");
      } else {
        // add
        await axios.post(`/api/Parts/create`, {}, {
          params: {
            partName: data.partName,
            quantity: data.quantity,
            unit: data.unit,
          },
          headers: { Authorization: `Bearer ${token}`, 'ngrok-skip-browser-warning': 'anyvalue', },
        });
        showSuccess("Tạo phụ tùng thành công!");
      }
      navigate("/inventory-manager/parts");
    } catch (error) {
      console.error(error);
      showError(error.response?.data?.message || "Không thể lưu phụ tùng!");
    }
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
            name={"partName"}
            error={errors?.partName}
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
