import { Link, useNavigate } from "react-router-dom";
import IconMenu from "@/components/icons/IconMenu";
import { useEffect, useState } from "react";
import IconClose from "../icons/IconClose";
import Logo from '@/assets/images/logo-car.png';
export default function Header() {
  const [openMenu, setOpenMenu] = useState(false)
  const [profile, setProfile] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const profile = localStorage.getItem("bus-profile");
    if (profile) {
      const parsedProfile = JSON.parse(profile);
      setProfile(parsedProfile);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('bus-profile');
    window.location.href = '/login';
  };

  return (
    <header className="sticky top-0 w-full z-20">
      <div className="relative flex justify-between items-center min-h-[72px] px-6 bg-primary">
        <Link className="min-h-72px aspect-video flex items-center" to='/'>
          <div className="text-4xl py-4 text-white">
            <img src={Logo} alt="logo" className="w-14 h-14 object-cover" />
          </div>
        </Link>
        <div className="flex items-center flex-wrap justify-end gap-3 max-lg:hidden">
          <nav className="flex gap-5 text-white font-bold">
            
            
          </nav>
          {profile ?
            <div className="text-white">
              <button onClick={() => setOpen(!open)} className="button hover:!bg-white hover:text-primary !w-[133px]">
                {profile?.name}
              </button>
              {open && (
                <div className="absolute overflow-hidden right-0 mt-2 w-[180px] bg-white text-black rounded-md shadow z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    Hồ sơ cá nhân
                  </Link>
                  <Link
                    to="/history"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    Lịch sử đặt vé
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}

            </div>
            :
            <div className="flex gap-3">
              <Link to={'/login'} className="button hover:!bg-white hover:text-primary !w-[133px]">
                Đăng nhập
              </Link>
              <Link to={'/register'} className="button hover:!bg-white hover:text-primary !w-[133px]">
                Đăng ký
              </Link>
            </div>
          }
        </div>
        <div className="lg:hidden text-white" onClick={() => setOpenMenu(!openMenu)}>
          {openMenu ? <IconClose /> : <IconMenu />}
          {openMenu &&
            <div className="absolute flex flex-col gap-4 top-[72px] left-0 w-full h-screen bg-white py-4 text-white items-center">
              <nav className="flex flex-col gap-4 text-primary text-center font-bold">
                <Link to="/about">Giới thiệu</Link>
                <Link to="/my-ticket">Đơn hàng của tôi</Link>
                <Link to="#">Trở thành đối tác</Link>
              </nav>
              <Link to={'/login'} className="button hover:!bg-white hover:text-primary !w-[133px]">
                Đăng nhập
              </Link>
              <Link to={'/register'} className="button hover:!bg-white hover:text-primary !w-[133px]">
                Đăng ký
              </Link>
            </div>
          }
        </div>
      </div>
    </header>
  )
}