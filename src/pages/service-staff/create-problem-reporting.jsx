import Select from "@/components/form/select";
import { CUSTOMERS, STATUSES } from "@/utils/constant";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextArea from "@/components/form/textarea";

const schema = yup.object().shape({
  customer_id: yup.string().required("Vui lòng chọn khách hàng!"), // not null

  status: yup.string().required("Vui lòng chọn trạng thái"), // not null

  report: yup.string().required("Nội dung của báo cáo không được để trống!"), // string not null
});

const CreateProblemReporting = () => {
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
