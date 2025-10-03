import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "@/components/form/input";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { showError, showSuccess } from "@/utils";

const schema = yup.object().shape({
  title: yup.string().required("Vui lòng nhập tên khuyến mãi!"), // not null

  discountPercentage: yup
    .number()
    .typeError("Vui lòng chọn phần trăm")
    .required("Vui lòng chọn phần trăm"), // not null
});

const CreatePromotion = () => {
  const { id } = useParams();
  const promotionId = /^\d+$/.test(id) ? id : null;
  const navigate = useNavigate();
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

  useEffect(() => {
    if (promotionId) {
      const fetchPromotion = async () => {
        try {
          const token = localStorage.getItem("carserv-token");
          const res = await axios.get(`/api/Promotion/retrieve-promotion/${promotionId}`, {
            headers: { 
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "anyvalue" 
            },
          });
          const promo = res.data;

          setValue("title", promo.title);
          setValue("discountPercentage", promo.discountPercentage);
        } catch (error) {
          console.error(error);
          showError("Không thể lấy dữ liệu khuyến mãi!");
        }
      };
      fetchPromotion();
    }
  }, [promotionId, setValue]);

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("carserv-token");

      let response;
      if (promotionId) {
        // update
        response = await axios.put(`/api/Promotion/update-promotion/${promotionId}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "anyvalue",
          },
        });
        showSuccess("Cập nhật khuyến mãi thành công!");
      } else {
        // create
        response = await axios.post(`/api/Promotion/create-promotion`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "anyvalue",
          },
        });
        showSuccess("Tạo khuyến mãi thành công!");
      }

      console.log("Promotion saved:", response.data);
      navigate("/admin/promotions");
    } catch (error) {
      console.error("Error:", error);
      showError(error.response?.data?.message || "Không thể lưu khuyến mãi!");
    }
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{promotionId ? 'Chỉnh sửa khuyến mãi' : 'Thêm khuyến mãi'}</h1>

      {/* Form gửi thông báo */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg shadow p-6 mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <TextInput
            label={"Tên khuyến mãi"}
            placeholder={"Nhập tên khuyến mãi"}
            register={register}
            name={"title"}
            error={errors?.title}
          />
          <TextInput
            label={"Phần trăm"}
            placeholder={"Nhập phần trăm"}
            register={register}
            type="number"
            name={"discountPercentage"}
            error={errors?.discountPercentage}
          />
        </div>

        <button className="bg-primary px-4 py-2 text-white font-bold rounded-md">
          {promotionId ? 'Chỉnh sửa' : 'Tạo'}
        </button>
      </form>
    </div>
  );
};

export default CreatePromotion;
