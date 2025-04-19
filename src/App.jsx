import "./index.css";
import Layout from "@/components/common/layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "@/pages/client/login";
import RegisterPage from "@/pages/client/register";
import Homepage from "@/components/common/homepage";
import LoginAdminPage from "@/pages/client/login-admin";
import { ToastContainer } from "react-toastify";
import AccountListPage from "@/pages/admin/account";
import AddAccountList from "@/pages/admin/add-account";
import EditAccountList from "@/pages/admin/edit-account";
import ProfilePage from "@/pages/client/profile";
import AdminLayout from '@/components/common/admin-layout';
import RouterListPage from '@/pages/admin/router';
import AddRouterPage from './pages/admin/add-router';
import EditRouterPage from './pages/admin/edit-router';
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
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="account" element={<AccountListPage />} />
          <Route path="account/add" element={<AddAccountList />} />
          <Route path="account/edit/:id" element={<EditAccountList />} />
          <Route path="router" element={<RouterListPage />} />
          <Route path="router/add" element={<AddRouterPage />} />
          <Route path="router/edit/:id" element={<EditRouterPage />} />
        </Route>
      </Routes>
         
    </BrowserRouter>
  );
}
export default App;
