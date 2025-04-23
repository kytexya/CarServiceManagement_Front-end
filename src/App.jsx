import "./index.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Layout from "@/components/common/layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "@/pages/client/login";
import RegisterPage from "@/pages/client/register";
import Homepage from "@/components/common/homepage";
import LoginAdminPage from "@/pages/client/login-admin";
import ProfilePage from "@/pages/client/profile";
import { ToastContainer } from "react-toastify";
import AccountListPage from "@/pages/admin/account";
import AddAccountList from "@/pages/admin/add-account";
import EditAccountList from "@/pages/admin/edit-account";
import AdminLayout from "@/components/common/admin-layout";
import LocationListPage from "@/pages/admin/location";
import AddLocationPage from "@/pages/admin/add-location";
import EditLocationPage from "@/pages/admin/edit-location";
import RouterListPage from "@/pages/admin/router";
import AddRouterPage from "./pages/admin/add-router";
import EditRouterPage from "./pages/admin/edit-router";
import BusListPage from "@/pages/admin/bus";
import AddBusPage from "@/pages/admin/add-bus";
import EditBusPage from "@/pages/admin/edit-bus";
import TripListPage from "@/pages/admin/trip";
import AddTripPage from "@/pages/admin/add-trip";
import EditTripPage from "@/pages/admin/edit-trip";
import ReportPage from "@/pages/admin/report";
import TransactionListPage from "@/pages/admin/transaction";
import TicketListPage from "@/pages/admin/ticket";
import PromotionListPage from "@/pages/admin/promotion";
import AddPromotionPage from "@/pages/admin/add-promotion";
import EditPromotionPage from "./pages/admin/edit-promotion";
import SearchTripPage from "@/pages/client/search-trip";
import OrderPage from "@/pages/client/order";
import HistoryTicket from "@/pages/client/history";
import EditProfilePage from "./pages/client/edit-profile";
import DriveTripPage from "@/pages/admin/drive-trip";
import DriveTripDetailPage from "@/pages/admin/drive-trip-detail";
import StaffTripPage from "@/pages/staff/staff-trip";
import StaffTicketPage from "./pages/staff/staff-ticket";
import StaffCalendarPage from "./pages/staff/staff-trip-calendar";
import StaffAccountListPage from "./pages/staff/account";
import StaffAddAccountList from "./pages/staff/add-account";
import StaffEditAccountList from "./pages/staff/edit-account";
import StaffTransactionListPage from "./pages/staff/transaction";
import StaffEditTripPage from './pages/staff/edit-trip';
function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login-manager" element={<LoginAdminPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/trip" element={<SearchTripPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/history" element={<HistoryTicket />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
        </Route>
        <Route path="/drive" element={<AdminLayout />}>
          <Route path="trip" element={<DriveTripPage />} />
          <Route path="trip/:id" element={<DriveTripDetailPage />} />
        </Route>

        <Route path="/staff" element={<AdminLayout />}>
          <Route path="trip" element={<StaffTripPage />} />
          <Route path="trip/:id" element={<StaffEditTripPage />} />
          <Route path="ticket" element={<StaffTicketPage />} />
          <Route path="trip-calendar" element={<StaffCalendarPage />} />
          <Route path="account" element={<StaffAccountListPage />} />
          <Route path="account/add" element={<StaffAddAccountList />} />
          <Route path="account/edit/:id" element={<StaffEditAccountList />} />
          <Route path="transaction" element={<StaffTransactionListPage />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="account" element={<AccountListPage />} />
          <Route path="account/add" element={<AddAccountList />} />
          <Route path="account/edit/:id" element={<EditAccountList />} />
          <Route path="location" element={<LocationListPage />} />
          <Route path="location/add" element={<AddLocationPage />} />
          <Route path="location/edit/:id" element={<EditLocationPage />} />
          <Route path="router" element={<RouterListPage />} />
          <Route path="router/add" element={<AddRouterPage />} />
          <Route path="router/edit/:id" element={<EditRouterPage />} />
          <Route path="bus" element={<BusListPage />} />
          <Route path="bus/add" element={<AddBusPage />} />
          <Route path="bus/edit/:id" element={<EditBusPage />} />
          <Route path="trip" element={<TripListPage />} />
          <Route path="trip/add" element={<AddTripPage />} />
          <Route path="trip/edit/:id" element={<EditTripPage />} />
          <Route path="promotion" element={<PromotionListPage />} />
          <Route path="promotion/add" element={<AddPromotionPage />} />
          <Route path="promotion/edit/:id" element={<EditPromotionPage />} />
          <Route path="report" element={<ReportPage />} />
          <Route path="transaction" element={<TransactionListPage />} />
          <Route path="ticket" element={<TicketListPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
