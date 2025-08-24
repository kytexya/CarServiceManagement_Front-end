import Select from "@/components/form/select";
import { CUSTOMERS, STATUSES } from "@/utils/constant";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextArea from "@/components/form/textarea";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { showError } from "@/utils";

const schema = yup.object().shape({
  customer_id: yup.string().required("Vui lòng chọn khách hàng!"), // not null

  status: yup.string().required("Vui lòng chọn trạng thái"), // not null

  report: yup.string().required("Nội dung của báo cáo không được để trống!"), // string not null
});

const CreateProblemReporting = () => {
  const { id } = useParams();
  const reportId = /^\d+$/.test(id) ? id : null;
  const navigate = useNavigate();
  const token = localStorage.getItem("carserv-token");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (reportId) {
      const fetchReport = async () => {
        try {
          const response = await axios.get(`/api/problem-reporting/${reportId}`, {
            headers: { Authorization: `Bearer ${token}`, "ngrok-skip-browser-warning": "anyvalue" },
          });

          const report = response.data;
          setValue("customerId", String(report.customerId));
          setValue("status", report.status);
          setValue("report", report.report);
        } catch (error) {
          console.error(error);
          showError("Không thể lấy dữ liệu báo cáo!");
        }
      };
      fetchReport();
    }
  }, [reportId, setValue]);

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("carserv-token");

      if (reportId) {
        const response = await axios.put(
          `/api/problem-reporting/${reportId}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning/update": "anyvalue",
            },
          }
        );
        console.log("Cập nhật báo cáo thành công:", response.data);
        showSuccess("Cập nhật báo cáo thành công!");
      } else {
        const response = await axios.post(
          `/api/problem-reporting/new`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "anyvalue",
            },
          }
        );
        console.log("Tạo báo cáo thành công:", response.data);
        showSuccess("Tạo báo cáo thành công!");
      }

      navigate('/service-staff/problem-reporting')
    } catch (error) {
      console.error("Error:", error);
      showError(error.response?.data?.message || "Không thể lưu báo cáo!");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Tạo báo cáo lỗi</h1>

      {/* Form gửi thông báo */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg shadow p-6 mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Select
            label={"Khách hàng"}
            options={CUSTOMERS}
            name={"customer_id"}
            fieldName="name"
            fieldValue="id"
            register={register}
            placeholder="Chọn khách hàng"
            error={errors?.customer_id}
          />
          <Select
            label={"Trạng thái"}
            options={STATUSES}
            name={"status"}
            fieldValue="value"
            register={register}
            placeholder="Chọn trạng thái"
            error={errors?.status}
          />
          <div className="col-span-2">
            <TextArea 
              name={'report'}
              register={register}
              error={errors?.report}
            />
          </div>
        </div>
        
        <button className="bg-primary px-4 py-2 text-white font-bold rounded-md">
          Tạo
        </button>
      </form>
    </div>
  );
};

export default CreateProblemReporting;
