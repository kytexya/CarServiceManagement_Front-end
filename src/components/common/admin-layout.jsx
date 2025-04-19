import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
    return (
        <div className='w-[100vw] h-[100vh] flex flex-col'>
            <Outlet />
        </div>
    );
}