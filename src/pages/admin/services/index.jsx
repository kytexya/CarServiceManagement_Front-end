import SidebarAdmin from '@/components/common/sidebar-admin';
import CustomTable from '@/components/common/table';
import { showError } from '@/utils';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const columns = [
    { header: 'Mã Dịch Vụ', field: 'serviceId' },
    { header: 'Tên Dịch Vụ', field: 'serviceName' },
    { header: 'Giá (VND)', field: 'price' },
    { header: 'Thời Gian Ước Tính', field: 'estimatedTime' },
    { header: 'Trạng Thái', field: 'status' }
];

export default function ServiceManagementPage() {
    const [dataList, setDataList] = useState([]); // Dữ liệu rỗng
    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/admin/services/edit/${id}`);
    };

    const handleDelete = (id, name) => {
        if (confirm(`Bạn có chắc chắn muốn xóa dịch vụ "${name}"?`)) {
            showError(`Chức năng xóa cho dịch vụ ${id} chưa được cài đặt.`);
        }
    };

    return (
        <div className='flex flex-row w-full'>
            <SidebarAdmin />
            <div className='flex flex-col w-full'>
                <div className="flex justify-between items-center px-8 py-4 border-b">
                    <h1 className="text-2xl font-bold">Quản Lý Dịch Vụ</h1>
                    <Link to='/admin/services/add' className="button primary">
                        Thêm Dịch Vụ
                    </Link>
                </div>

                <div className="p-8">
                    <div className="flex gap-4 mb-6">
                        <input
                            type="search"
                            placeholder="Tìm kiếm dịch vụ..."
                            className="flex-grow border border-gray-300 rounded-lg py-2 px-4"
                        />
                        <button onClick={() => showError("Chức năng tìm kiếm chưa được kết nối.")} className="button primary">Tìm</button>
                    </div>

                    <CustomTable
                        columns={columns}
                        data={dataList}
                        renderActions={(row) => (
                            <div className="flex gap-2 justify-center">
                                <button
                                    onClick={() => handleEdit(row.serviceId)}
                                    className="button !bg-blue-500 !text-white"
                                >
                                    Sửa
                                </button>
                                <button
                                    onClick={() => handleDelete(row.serviceId, row.serviceName)}
                                    className="button !bg-red-500 !text-white"
                                >
                                    Xóa
                                </button>
                            </div>
                        )}
                    />
                    {dataList.length === 0 && (
                        <div className="text-center py-10 text-gray-500">
                           Chưa có dịch vụ nào. Vui lòng thêm dịch vụ mới.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 