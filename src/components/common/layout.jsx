import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const location = useLocation();

  const checkHiddenFooter = (keyword) => {
    return location.pathname.includes(keyword);
  };
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col justify-between overflow-auto">
      <Header />
      <main>{children}</main>
      {!checkHiddenFooter("admin") && <Footer />}
    </div>
  );
}
