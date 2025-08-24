import Pagination from "@/components/common/pagination";
import SidebarAdmin from "@/components/common/sidebar-admin";
import IconBin from "@/components/icons/IconBin";
import IconEdit from "@/components/icons/IconEdit";
import IconPackage from "@/components/icons/IconPackage";
import IconPlus from "@/components/icons/IconPlus";
import { showError, showSuccess } from "@/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ServiceManagementPage() {
  const [activeTab, setActiveTab] = useState("services");
  const [serviceTypes, setServiceTypes] = useState([]);
  const [comboPackages, setComboPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("carserv-token");

  // Mock data
  const serviceTypesMock = [
    {
      id: 1,
      name: "Bảo trì định kỳ",
      category: "Bảo trì",
      duration: 120,
      price: 500000,
      status: "Active",
    },
    {
      id: 2,
      name: "Thay nhớt động cơ",
      category: "Thay nhớt",
      duration: 45,
      price: 300000,
      status: "Active",
    },
    {
      id: 3,
      name: "Kiểm tra động cơ",
      category: "Kiểm tra",
      duration: 90,
      price: 400000,
      status: "Active",
    },
    {
      id: 4,
      name: "Thay lốp xe",
      category: "Thay lốp",
      duration: 60,
      price: 800000,
      status: "Inactive",
    },
  ];

  const comboPackagesMock = [
    {
      id: 1,
      name: "Gói Bảo Dưỡng Cơ Bản",
      services: ["Bảo trì định kỳ", "Thay nhớt động cơ"],
      price: 700000,
      discount: 10,
    },
    {
      id: 2,
      name: "Gói Kiểm Tra Toàn Diện",
      services: ["Kiểm tra động cơ", "Bảo trì định kỳ"],
      price: 800000,
      discount: 15,
    },
  ];

  useEffect(() => {
    if (activeTab === "services") {
      fetchServiceTypes();
    } else {
      fetchCombos();
    }
  }, [activeTab]);

  const fetchServiceTypes = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/services/get-all-services", { 
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'anyvalue',
          },
        withCredentials: true
      });
      setServiceTypes(res.data?.services || []);
    } catch (err) {
      showError("Không tải được danh sách dịch vụ");
    } finally {
      setLoading(false);
    }
  };

  const fetchCombos = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/services/get-all-service-packages", { 
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'anyvalue',
          },
        withCredentials: true
      });
      setComboPackages(res.data.packages || []);
    } catch (err) {
      showError("Không tải được danh sách combo");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa dịch vụ này?")) return;
    try {
      const res = await axios.delete(`/api/services/delete-service/${id}`, { 
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'anyvalue',
          },
        withCredentials: true
      });
      showSuccess("Xóa dịch vụ thành công");
      fetchServiceTypes();
    } catch (err) {
      showError("Xóa thất bại");
    }
  };

  const handleDeleteCombo = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa combo này?")) return;
    try {
      const res = await axios.delete(`/api/services/delete-service-package/${id}`, { 
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'anyvalue',
          },
        withCredentials: true
      });
      showSuccess("Xóa combo thành công");
      fetchCombos();
    } catch (err) {
      showError("Xóa thất bại");
    }
  };

  return (
    <div className="flex flex-row w-full h-screen bg-gray-50">
      <div className="flex flex-col w-full">
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b bg-white shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Quản Lý Dịch Vụ
              </h1>
              <p className="text-sm text-gray-600">
                Cấu hình loại dịch vụ và gói combo
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8">
          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
            <button
              onClick={() => setActiveTab("services")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === "services"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <svg
                className="w-4 h-4 inline mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Loại Dịch Vụ
            </button>
            <button
              onClick={() => setActiveTab("combos")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === "combos"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <IconPackage className={"w-4 h-4 inline mr-2"} />
              Gói Combo
            </button>
          </div>

          {/* Service Types Tab */}
          {activeTab === "services" && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Loại Dịch Vụ
                    </h2>
                    <p className="text-sm text-gray-600">
                      Quản lý các loại dịch vụ và thời lượng
                    </p>
                  </div>
                  <a href="/admin/service/new" className="button primary">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Thêm Dịch Vụ
                  </a>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tên Dịch Vụ
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Danh Mục
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Thời Lượng (phút)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Giá (VND)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trạng Thái
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Thao Tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {serviceTypes.map((service) => (
                      <tr key={service.serviceId} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {service.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {service?.description}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {service.estimatedLaborHours} phút
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {service.price.toLocaleString()} VND
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              // service?.status === "Active"
                              //   ? "bg-green-100 text-green-800"
                              //   : "bg-red-100 text-red-800"
                              // todo
                              'bg-green-100 text-green-800'
                            }`}
                          >
                            {/* {service?.status === "Active"
                              ? "Hoạt động"
                              : "Không hoạt động"} */}
                            {/* todo */}
                            Hoạt động
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <a
                              href={`/admin/service/${service.serviceId}`}
                              className="rounded-full p-2 hover:bg-green-100 transition-colors text-green-600"
                            >
                              <IconEdit />
                            </a>
                            <button
                              onClick={() => handleDeleteService(service.serviceId)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <IconBin />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Combo Packages Tab */}
          {activeTab === "combos" && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-8 py-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Gói Combo Dịch Vụ
                    </h2>
                    <p className="text-sm text-gray-600">
                      Quản lý các gói dịch vụ kết hợp
                    </p>
                  </div>
                  <a href="/admin/service/combo/new" className="button primary">
                    <IconPlus />
                    Thêm Gói Combo
                  </a>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tên Gói
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dịch Vụ Bao Gồm
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Giá Gốc
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Giảm Giá
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Thao Tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {comboPackages.map((combo) => (
                      <tr key={combo.packageId} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {combo.name}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {combo.services.map((service, index) => (
                              <span
                                key={index}
                                className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs mr-1 mb-1"
                              >
                                {service.description}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {combo.price.toLocaleString()} VND
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            {combo.discount ? combo.discount : 0} VND
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <a
                              href={`/admin/service/combo/${combo.packageId}`}
                              className="rounded-full p-2 hover:bg-green-100 transition-colors text-green-600"
                            >
                              <IconEdit />
                            </a>
                            <button
                              onClick={() => handleDeleteCombo(combo.packageId)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <IconBin />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {/* {<Pagination totalPage={3} />} */}
        </div>
      </div>
    </div>
  );
}
