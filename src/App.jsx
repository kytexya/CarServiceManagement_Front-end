import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import Layout from '@/components/common/layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '@/pages/client/login';
import RegisterPage from '@/pages/client/register';
import Homepage from '@/components/common/homepage';
import ProfilePage from '@/pages/client/profile';
import { ToastContainer } from 'react-toastify';
import AdminLayout from '@/components/common/admin-layout';
import ServiceStaffLayout from '@/components/common/service-staff-layout';
import ReportPage from '@/pages/admin/report';


// Renamed and new components for CarServ
import ServiceRequestPage from '@/pages/client/service-request';
import ServiceHistoryPage from '@/pages/client/service-history';
import EditProfilePage from './pages/client/edit-profile';

// Service Staff components from the new folder
import Dashboard from './pages/service-staff/dashboard';
import ServiceOrders from './pages/service-staff/service-orders';
import UpdateServiceHistory from './pages/service-staff/update-service-history';
import UsedPartsManagement from './pages/service-staff/used-parts-management';
import MySchedule from './pages/service-staff/my-schedule';
import NotifyCustomer from './pages/service-staff/notify-customer';
import VehicleRecords from './pages/service-staff/vehicle-records';
import ProblemReporting from './pages/service-staff/problem-reporting';

// New Inventory Manager Pages
import InventoryPage from './pages/inventory-manager/inventory';
import AddInventoryPage from './pages/inventory-manager/inventory/add';
import EditInventoryPage from './pages/inventory-manager/inventory/edit';
import DashboardPage from './pages/inventory-manager/dashboard';
import ImportPage from './pages/inventory-manager/import';
import ExportPage from './pages/inventory-manager/export';
import HistoryPage from './pages/inventory-manager/history';

// New Admin Service Management Pages - Removed old service imports

// New Admin Management Pages
import ServiceManagementPage2 from './pages/admin/service-management';
import ServiceOrdersPage from './pages/admin/service-orders';
import ScheduleManagementPage from './pages/admin/schedule-management';
import UserManagementPage from './pages/admin/user-management';
import InventoryOverviewPage from './pages/admin/inventory-overview';
import AddUserPage from './pages/admin/add-user';

import { useEffect, useState } from 'react';
import NotfoundPage from './components/common/notfound';
import React from 'react';

// Placeholder for new pages
const ServicesPage = () => <div className='text-center p-10 text-3xl'>Service Selection Page (To be implemented)</div>;
const AppointmentBookingPage = () => <div className='text-center p-10 text-3xl'>Appointment Booking Page (To be implemented)</div>;


function App() {
  const [role, setRole] = useState(0);

  useEffect(() => {
    // Using a new key for the new application to avoid conflicts
    const profile = localStorage.getItem("carserv-profile");
    if (profile) {
      const parsedProfile = JSON.parse(profile);
      setRole(parsedProfile.role);
    }
  }, [])

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        {/* Login page as landing page, rendered outside Layout to remove header/footer */}
        <Route path="/" element={<LoginPage />} />
        
        <Route element={<Layout />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/book-appointment" element={<AppointmentBookingPage />} />
          <Route path="*" element={<NotfoundPage />} />
        </Route>

        {/* Service Staff routes */}
        <Route path="/service-staff" element={<ServiceStaffLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="service-orders" element={<ServiceOrders />} />
          <Route path="update-service-history" element={<UpdateServiceHistory />} />
          <Route path="used-parts-management" element={<UsedPartsManagement />} />
          <Route path="my-schedule" element={<MySchedule />} />
          <Route path="notify-customer" element={<NotifyCustomer />} />
          <Route path="vehicle-records" element={<VehicleRecords />} />
          <Route path="problem-reporting" element={<ProblemReporting />} />
        </Route>

        {/* Inventory Manager routes */}
        <Route path="/inventory-manager" element={<AdminLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="inventory/add" element={<AddInventoryPage />} />
          <Route path="inventory/edit/:id" element={<EditInventoryPage />} />
          <Route path="import" element={<ImportPage />} />
          <Route path="export" element={<ExportPage />} />
          <Route path="history" element={<HistoryPage />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="service-management" element={<ServiceManagementPage2 />} />
          <Route path="service-orders" element={<ServiceOrdersPage />} />
          <Route path="schedule-management" element={<ScheduleManagementPage />} />
          <Route path="user-management" element={<UserManagementPage />} />
          <Route path="user-management/add" element={<AddUserPage />} />
          <Route path="inventory-overview" element={<InventoryOverviewPage />} />
          <Route path="report" element={<ReportPage />} />          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;