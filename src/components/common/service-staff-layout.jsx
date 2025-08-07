import { Outlet } from 'react-router-dom';
import SidebarStaff from './sidebar-staff';

export default function ServiceStaffLayout() {
    return (
        <div className='w-[100vw] h-[100vh] flex'>
            <SidebarStaff />
            <div className='flex-1 overflow-auto'>
                <Outlet />
            </div>
        </div>
    );
} 