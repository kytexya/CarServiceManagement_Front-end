import SidebarAdmin from '@/components/common/sidebar-admin';
import CustomTable from '@/components/common/table';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const columns = [
    {
        header: 'Loại xe',
        field: 'BusType',
    },
    {
        header: 'Số ghế',
        field: 'SeatCount'
    },
    {
        header: 'Trạng thái',
        field: 'IsDelete',
        className: 'status-box'
    },
]

const dataTemp = [
    { Id: 1, BusType: 'Xe khách lớn', SeatCount: 22, IsDelete: true },
    { Id: 2, BusType: 'Xe trung chuyển', SeatCount: 32, IsDelete: false },
    { Id: 3, BusType: 'Xe giường nằm', SeatCount: 42, IsDelete: false },
    { Id: 4, BusType: 'Xe ghế ngồi', SeatCount: 32, IsDelete: false },
]

export default function BusListPage() {
    const [dataList, setDataList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const convertedData = dataTemp.map((item) => ({
            ...item,
            IsDelete: item.IsDelete ? 'Không hoạt động' : 'Đang hoạt động',
        }));
        setDataList(convertedData);
    }, [])

    return (
        <div className='flex flex-row w-full'>
            <SidebarAdmin />
            <div className='flex flex-col w-full'>

                <div className="flex justify-between items-center h-[60px] px-4 shadow-lg">
                    <h1 className='text-2xl font-bold'>  xe</h1>
                </div>

                <div className="flex justify-between items-center px-4 h-[64px]">
                    <input
                        type="search"
                        name="keyword"
                        placeholder="Nhập từ khoá tìm kiếm..."
                        className="w-[300px] border border-slate-600 rounded-lg py-2 px-4"
                    />
                    <Link to='/admin/bus/add'>
                        <button className="inline-flex items-center justify-center px-4 h-10 font-sans font-semibold tracking-wide text-white bg-success rounded-lg">
                            Thêm xe mới
                        </button>
                    </Link>
                </div>

                <CustomTable
                    columns={columns}
                    data={dataList}
                    renderActions={(row) => (
                        <div className="flex gap-2 justify-center">
                            <button
                                onClick={() => navigate(`/admin/bus/edit/${row.Id}`)}
                                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Sửa
                            </button>
                            <button
                                onClick={() => alert(`Xoá ${row.Id}`)}
                                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Xoá
                            </button>
                        </div>
                    )}
                />
            </div>
        </div>
    )
}