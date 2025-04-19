import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { Outlet } from 'react-router-dom';
export default function Layout() {
  return (
    <div className='w-[100vw] h-[100vh] flex flex-col justify-between overflow-y-scroll'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
