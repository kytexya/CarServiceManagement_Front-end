import DriveHeader from '@/components/common/drive-header';
import SidebarStaff from '@/components/common/sidebar-staff';
import CustomTable from '@/components/common/table';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


const columns = [
    { header: 'Mã chuyến đi', field: 'Id' },
    { header: 'Tên tuyến đường', field: 'RouterName' },
    { header: 'Tên loại xe', field: 'BusName' },
    { header: 'Tên tài xế', field: 'DriverName' },
    { header: 'Giờ khởi hành', field: 'DepartureTime' },
    { header: 'Ngày khởi hành', field: 'Date' },
    { header: 'Giá vé', field: 'Price' },
    { header: 'Trạng thái', field: 'Status' },
]

const dataTemp = [
    {
        Id: 1,
        RouterName: 'Hà Nội - Đà Nẵng',
        BusName: 'Xe giường nằm 2 tầng',
        DriverName: 'Tài xế Minh',
        Price: '300,000',
        Status: 1,
        DepartureTime: '10:00',
        Date: '2024-01-01'
    },
    {
        Id: 2,
        RouterName: 'Đà Nẵng - Hà Nội',
        BusName: 'Xe trung chuyển',
        DriverName: 'Tài xế Hoà',
        Price: '120,000',
        Status: 2,
        DepartureTime: '12:00',
        Date: '2024-01-01'
    },
]
export default function StaffTripPage() {
    const [dataList, setDataList] = useState([]);
    const [date, setDate] = useState(new Date());

    const navigate = useNavigate();
    useEffect(() => {
        const convertedData = dataTemp.map((item) => ({
            ...item,
            Status: item.Status === 1 ? 'Đã khởi hành' : 'Chưa khởi hành',
        }));
        setDataList(convertedData);
    }, [])

    return (
        <div className='flex flex-col h-full w-full'>
            <DriveHeader />
            <div className="flex flex-shrink overflow-y-scroll w-[calc(100%-300px]">
                <SidebarStaff />
                <div className="flex flex-col w-full">
                    <div className="flex justify-between items-center h-[60px] px-4 shadow-lg">
                        <h1 className='text-2xl font-bold'>Danh sách chuyến xe</h1>
                        <div className="flex flex-row gap-4 items-center">
                            <input
                                required
                                type='date'
                                defaultValue={new Date().toISOString().split('T')[0]}
                                onChange={(e) => setDate(e.target.value)}
                                className='p-2 border border-primary rounded-md !h-[40px]'
                            />
                            <button type='submit' className='button !bg-yellow !text-white !border-none !h-[42px] !text-xl !w-[144px]'>Tìm kiếm</button>
                        </div>
                    </div>
                    <CustomTable
                        columns={columns}
                        data={dataList}
                        renderActions={(row) => (
                            <div className="flex gap-2 justify-center">
                                <button
                                    onClick={() => navigate(`/staff/trip/${row.Id}`)}
                                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Xem chi tiết
                                </button>
                            </div>
                        )}
                    />
                </div>
            </div>
        </div>
    )
}