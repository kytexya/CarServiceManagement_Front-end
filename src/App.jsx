import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import Layout from '@/components/common/layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '@/pages/client/login';
import RegisterPage from '@/pages/client/register';
import Homepage from '@/components/common/homepage';
import LoginAdminPage from '@/pages/client/login-admin';
import ProfilePage from '@/pages/client/profile';
import { ToastContainer } from 'react-toastify';
import AccountListPage from '@/pages/admin/account';
import AddAccountList from '@/pages/admin/add-account';
import EditAccountList from '@/pages/admin/edit-account';
import AdminLayout from '@/components/common/admin-layout';
import ReportPage from '@/pages/admin/report';
import TransactionListPage from '@/pages/admin/transaction';
import PromotionListPage from '@/pages/admin/promotion';
import AddPromotionPage from '@/pages/admin/add-promotion';
import EditPromotionPage from './pages/admin/edit-promotion';

// Renamed and new components for CarServ
import ServiceRequestPage from '@/pages/client/service-request';
import ServiceHistoryPage from '@/pages/client/service-history';
import EditProfilePage from './pages/client/edit-profile';

// Service Staff components from the new folder
import StaffAccountListPage from './pages/service-staff/account';
import StaffAddAccountList from './pages/service-staff/add-account';
import StaffEditAccountList from './pages/service-staff/edit-account';
import StaffTransactionListPage from './pages/service-staff/transaction';

// New Inventory Manager Pages
import InventoryPage from './pages/inventory-manager/inventory';
import AddInventoryPage from './pages/inventory-manager/inventory/add';
import EditInventoryPage from './pages/inventory-manager/inventory/edit';

// New Admin Service Management Pages
import ServiceManagementPage from './pages/admin/services';
import AddServicePage from './pages/admin/services/add';
import EditServicePage from './pages/admin/services/edit';

import { useEffect, useState } from 'react';
import NotfoundPage from './components/common/notfound';
import PaymentSuccessPage from './pages/client/payment';

// Placeholder for new pages
const ServicesPage = () => <div className='text-center p-10 text-3xl'>Service Selection Page (To be implemented)</div>;
const AppointmentBookingPage = () => <div className='text-center p-10 text-3xl'>Appointment Booking Page (To be implemented)</div>;
const InventoryDashboard = () => <div className='text-center p-10 text-3xl'>Inventory Dashboard (To be implemented)</div>;


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
        {/* Customer-facing routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login-manager" element={<LoginAdminPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/book-appointment" element={<AppointmentBookingPage />} />
          <Route path="/service-request" element={<ServiceRequestPage />} />
          <Route path="/service-history" element={<ServiceHistoryPage />} />
          <Route path="/api/payment/vnpay-callback" element={<PaymentSuccessPage />} />
          <Route path="*" element={<NotfoundPage />} />
        </Route>

        {/* Service Staff routes */}
        <Route path="/service-staff" element={<AdminLayout />}>
          <Route path="account" element={<StaffAccountListPage />} />
          <Route path="account/add" element={<StaffAddAccountList />} />
          <Route path="account/edit/:id" element={<StaffEditAccountList />} />
          <Route path="transaction" element={<StaffTransactionListPage />} />
        </Route>

        {/* Inventory Manager routes */}
        <Route path="/inventory-manager" element={<AdminLayout />}>
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="inventory/add" element={<AddInventoryPage />} />
          <Route path="inventory/edit/:id" element={<EditInventoryPage />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="account" element={<AccountListPage />} />
          <Route path="account/add" element={<AddAccountList />} />
          <Route path="account/edit/:id" element={<EditAccountList />} />

          <Route path="promotion" element={<PromotionListPage />} />
          <Route path="promotion/add" element={<AddPromotionPage />} />
          <Route path="promotion/edit/:id" element={<EditPromotionPage />} />

          <Route path="services" element={<ServiceManagementPage />} />
          <Route path="services/add" element={<AddServicePage />} />
          <Route path="services/edit/:id" element={<EditServicePage />} />

          <Route path="report" element={<ReportPage />} />
          <Route path="transaction" element={<TransactionListPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;