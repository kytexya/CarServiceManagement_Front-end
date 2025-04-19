import SidebarAdmin from "@/components/common/sidebar-admin";
import TabsSelector from "@/components/common/tab";
import CustomTable from "@/components/common/table";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const columns = {
  user: [
    { header: "Tên tài khoản", field: "Username" },
    { header: "Tên", field: "Name" },
    { header: "Email", field: "Email" },
  ],
  customer: [
    { header: "Số điện thoại", field: "PhoneNumber" },
    { header: "Tên", field: "Name" },
    { header: "Điểm tích luỹ", field: "Score" },
    { header: "MembershipId", field: "MembershipId" },
    { header: "Xếp hạng", field: "RankName" },
  ],
};

const data = {
  user: [
    {
      Id: 1,
      Name: "Minh Minh Minh 1",
      Username: "username1",
      Email: "minh@example.com",
    },
    { Id: 2, Name: "Linh", Username: "username2", Email: "linh@example.com" },
  ],
  customer: [
    {
      Id: 1,
      PhoneNumber: "0920292022",
      Name: "Minh Minh 2",
      Score: 20,
      MembershipId: 12,
      RankName: "Vàng",
    },
    {
      Id: 2,
      PhoneNumber: "0921221429",
      Name: "Linh Link",
      Score: 22,
      MembershipId: 2,
      RankName: "Bạc",
    },
  ],
};

export default function AccountListPage() {
  const [activeTab, setActiveTab] = useState("user");
  const [dataList, setDataList] = useState();
  const navigate = useNavigate();

  const tabs = [
    { label: "Người dùng", value: "user" },
    { label: "Khách hàng", value: "customer" },
  ];

  return (
    <div className="flex flex-row w-full">
      <SidebarAdmin />
      <div className="flex flex-col w-full border-2">
        <div className="flex justify-between items-center px-4">
          <TabsSelector
            tabs={tabs}
            active={activeTab}
            onChange={(val) => setActiveTab(val)}
          />
          <Link to="/admin/account/add">
            <button className="inline-flex items-center justify-center px-4 h-10 font-sans font-semibold tracking-wide text-white bg-success rounded-lg">
              Thêm tài khoản
            </button>
          </Link>
        </div>

        <div className="flex border py-3 px-4 justify-end">
          <input
            type="search"
            name="keyword"
            placeholder="Nhập từ khoá tìm kiếm..."
            className="w-[300px] border border-slate-600 rounded-lg py-2 px-4"
          />
        </div>

        <CustomTable
          columns={columns[activeTab]}
          data={data[activeTab]}
          renderActions={(row) => (
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => navigate(`/admin/account/edit/${row.Id}`)}
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Sửa
              </button>
              <button
                onClick={() => alert(`Xoá ${row.Name}`)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Xoá
              </button>
            </div>
          )}
        />
      </div>
    </div>
  );
}
