import Layout from '@/components/common/layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '@/pages/client/login';
import RegisterPage from '@/pages/client/register';
import Homepage from '@/components/common/homepage';
import './index.css';
function App() {
  

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
export default App
