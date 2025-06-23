import SidebarAdmin from '@/components/common/sidebar-admin';
import CustomTable from '@/components/common/table';
import { showError } from '@/utils';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const columns = [
    { header: 'Mã Tài Khoản', field: 'userId' },
    { header: 'Tên Đăng Nhập', field: 'username' },
    { header: 'Họ và Tên', field: 'name' },
    { header: 'Số Điện Thoại', field: 'phoneNumber' },
    { header: 'Vai Trò', field: 'role' },
];

const getRoleName = (role) => {
    switch (role) {
        case 1: return 'Admin';
        case 2: return 'Nhân viên Dịch vụ';
        case 4: return 'Quản lý Kho';
        default: return 'Không xác định';
    }
}

export default function AccountListPage() {
    const [dataList, setDataList] = useState([]); // Leave empty
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");

    const handleSearch = () => {
        showError("Chức năng tìm kiếm và lọc chưa được kết nối API.");
    };

    const handleEdit = (id) => {
        navigate(`/admin/account/edit/${id}`);
    };

    const handleDeactivate = (id, name) => {
        if (confirm(`Bạn có chắc chắn muốn vô hiệu hóa tài khoản "${name}"?`)) {
            showError(`Chức năng vô hiệu hóa cho tài khoản ${id} chưa được cài đặt.`);
        }
    };

    return (
        <div className='flex flex-row w-full'>
            <SidebarAdmin />
            <div className='flex flex-col w-full'>
                <div className="flex justify-between items-center px-8 py-4 border-b">
                    <h1 className="text-2xl font-bold">Quản Lý Tài Khoản Hệ Thống</h1>
                    <Link to='/admin/account/add' className="button primary">
                        Thêm Tài Khoản
                    </Link>
                </div>

                <div className="p-8">
                    <div className="flex gap-4 mb-6">
                        <input
                            type="search"
                            name="keyword"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="Tìm theo tên đăng nhập, SĐT..."
                            className="flex-grow border border-gray-300 rounded-lg py-2 px-4"
                        />
                        <select
                            className="border border-gray-300 rounded-lg py-2 px-4"
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                        >
                            <option value="all">Tất cả vai trò</option>
                            <option value="1">Admin</option>
                            <option value="2">Nhân viên Dịch vụ</option>
                            <option value="4">Quản lý Kho</option>
                        </select>
                        <button onClick={handleSearch} className="button primary">Lọc</button>
                    </div>

                    <CustomTable
                        columns={columns}
                        data={dataList}
                        renderActions={(row) => (
                            <div className="flex gap-2 justify-center">
                                <button
                                    onClick={() => handleEdit(row.userId)}
                                    className="button !bg-blue-500 !text-white"
                                >
                                    Sửa
                                </button>
                                <button
                                    onClick={() => handleDeactivate(row.userId, row.name)}
                                    className="button !bg-red-500 !text-white"
                                >
                                    Vô hiệu hoá
                                </button>
                            </div>
                        )}
                    />
                    {dataList.length === 0 && (
                        <div className="text-center py-10 text-gray-500">
                            Không có dữ liệu để hiển thị.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}