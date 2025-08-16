import { Outlet } from 'react-router-dom';
import SidebarInventoryManager from '@/components/common/sidebar-inventory-manager';

export default function InventoryManagerLayout() {
    return (
        <div className='w-[100vw] h-[100vh] flex'>
            <SidebarInventoryManager />
            <div className='flex-1 overflow-auto'>
                <Outlet />
            </div>
        </div>
    );
} 