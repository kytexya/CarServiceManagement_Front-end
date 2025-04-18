import './index.css';
import Layout from '@/components/common/layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '@/pages/client/login';
import RegisterPage from '@/pages/client/register';
import Homepage from '@/components/common/homepage';
import LoginAdminPage from '@/pages/client/login-admin';
import { ToastContainer } from 'react-toastify';
import ProfilePage from '@/pages/client/profile';
function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login-manager" element={<LoginAdminPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
export default App;
