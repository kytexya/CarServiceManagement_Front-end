import SidebarAdmin from "@/components/common/sidebar-admin";
import { showError } from "@/utils";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function UserManagementPage() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Mock data
    const users = [
        {
            id: 1,
            username: "admin001",
            fullName: "Nguyễn Văn Admin",
            email: "admin@carservice.com",
            phone: "0123456789",
            role: "admin",
            status: "active",
            lastLogin: "2024-01-15 09:30",
            createdAt: "2024-01-01",
            department: "Quản lý"
        },
        {
            id: 2,
            username: "staff001",
            fullName: "Trần Thị Staff",
            email: "staff@carservice.com",
            phone: "0987654321",
            role: "staff",
            status: "active",
            lastLogin: "2024-01-15 08:15",
            createdAt: "2024-01-05",
            department: "Dịch vụ"
        },
        {
            id: 3,
            username: "inventory001",
            fullName: "Lê Văn Inventory",
            email: "inventory@carservice.com",
            phone: "0555666777",
            role: "inventory_manager",
            status: "active",
            lastLogin: "2024-01-14 16:45",
            createdAt: "2024-01-10",
            department: "Kho"
        },
        {
            id: 4,
            username: "customer001",
            fullName: "Phạm Văn Customer",
            email: "customer@email.com",
            phone: "0333444555",
            role: "customer",
            status: "active",
            lastLogin: "2024-01-15 10:20",
            createdAt: "2024-01-12",
            department: "Khách hàng"
        },
        {
            id: 5,
            username: "staff002",
            fullName: "Hoàng Thị Staff",
            email: "staff2@carservice.com",
            phone: "0222333444",
            role: "staff",
            status: "inactive",
            lastLogin: "2024-01-10 14:30",
            createdAt: "2024-01-08",
            department: "Dịch vụ"
        }
    ];

    const getRoleColor = (role) => {
        switch (role) {
            case 'admin':
                return 'bg-red-100 text-red-800';
            case 'staff':
                return 'bg-blue-100 text-blue-800';
            case 'inventory_manager':
                return 'bg-green-100 text-green-800';
            case 'customer':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getRoleText = (role) => {
        switch (role) {
            case 'admin':
                return 'Admin';
            case 'staff':
                return 'Nhân viên';
            case 'inventory_manager':
                return 'Quản lý kho';
            case 'customer':
                return 'Khách hàng';
            default:
                return role;
        }
    };

    const getStatusColor = (status) => {
        return status === 'active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800';
    };

    const getStatusText = (status) => {
        return status === 'active' ? 'Hoạt động' : 'Không hoạt động';
    };

    const filteredUsers = users.filter(user => {
        const matchesFilter = activeFilter === 'all' || user.role === activeFilter;
        const matchesSearch = user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const handleEditUser = (userId) => {
        showError("Chức năng chỉnh sửa người dùng chưa được kết nối API.");
    };

    const handleToggleStatus = (userId) => {
        showError("Chức năng khoá/mở khoá tài khoản chưa được kết nối API.");
    };

    const handleDeleteUser = (userId) => {
        showError("Chức năng xóa người dùng chưa được kết nối API.");
    };

    const handleSendActivation = (userId) => {
        showError("Chức năng gửi email kích hoạt chưa được kết nối API.");
    };

    return (
        <div className="flex flex-row w-full h-screen bg-gray-50">
            <SidebarAdmin />
            <div className="flex flex-col w-full pl-[220px]">
                {/* Header */}
                <div className="flex justify-between items-center px-8 py-6 border-b bg-white shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Quản Lý Người Dùng</h1>
                            <p className="text-sm text-gray-600">Quản lý tài khoản và phân quyền người dùng</p>
                        </div>
                    </div>
                    <Link to="/admin/user-management/add" className="button primary">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Thêm Người Dùng
                    </Link>
                </div>

                {/* Main Content */}
                <div className="p-8">
                    {/* Filters and Search */}
                    <div className="flex flex-col lg:flex-row gap-4 mb-6">
                        {/* Search */}
                        <div className="flex-1">
                            <div className="relative">
                                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm theo tên, username hoặc email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        {/* Role Filters */}
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setActiveFilter('all')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    activeFilter === 'all'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                Tất cả ({users.length})
                            </button>
                            <button
                                onClick={() => setActiveFilter('admin')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    activeFilter === 'admin'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                Admin ({users.filter(u => u.role === 'admin').length})
                            </button>
                            <button
                                onClick={() => setActiveFilter('staff')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    activeFilter === 'staff'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                Nhân viên ({users.filter(u => u.role === 'staff').length})
                            </button>
                            <button
                                onClick={() => setActiveFilter('inventory_manager')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    activeFilter === 'inventory_manager'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                Quản lý kho ({users.filter(u => u.role === 'inventory_manager').length})
                            </button>
                            <button
                                onClick={() => setActiveFilter('customer')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    activeFilter === 'customer'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                Khách hàng ({users.filter(u => u.role === 'customer').length})
                            </button>
                        </div>
                    </div>

                    {/* Users Table */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-8 py-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900">Danh Sách Người Dùng</h2>
                            <p className="text-sm text-gray-600">Quản lý tài khoản và phân quyền hệ thống</p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thông Tin</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phân Quyền</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng Thái</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hoạt Động</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao Tác</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredUsers.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                                                    <div className="text-sm text-gray-500">@{user.username}</div>
                                                    <div className="text-xs text-gray-400">{user.email}</div>
                                                    <div className="text-xs text-gray-400">{user.phone}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                                                        {getRoleText(user.role)}
                                                    </span>
                                                    <div className="text-xs text-gray-500 mt-1">{user.department}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                                                    {getStatusText(user.status)}
                                                </span>
                                                <div className="text-xs text-gray-500 mt-1">
                                                    Đăng nhập: {user.lastLogin}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-xs text-gray-500">
                                                    <div>Tạo: {user.createdAt}</div>
                                                    <div>Cuối: {user.lastLogin}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex flex-wrap gap-2">
                                                    <button
                                                        onClick={() => handleEditUser(user.id)}
                                                        className="text-blue-600 hover:text-blue-900 text-xs"
                                                    >
                                                        Sửa
                                                    </button>
                                                    <button
                                                        onClick={() => handleToggleStatus(user.id)}
                                                        className={`text-xs ${user.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                                                    >
                                                        {user.status === 'active' ? 'Khoá' : 'Mở khoá'}
                                                    </button>
                                                    <button
                                                        onClick={() => handleSendActivation(user.id)}
                                                        className="text-purple-600 hover:text-purple-900 text-xs"
                                                    >
                                                        Gửi Email
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteUser(user.id)}
                                                        className="text-red-600 hover:text-red-900 text-xs"
                                                    >
                                                        Xóa
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {filteredUsers.length === 0 && (
                            <div className="text-center py-12">
                                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                </svg>
                                <p className="text-gray-500">Không tìm thấy người dùng nào</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 