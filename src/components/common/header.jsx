import { Link } from "react-router-dom";

import IconMenu from "@/components/icons/IconMenu";

import { useState } from "react";

import IconClose from "../icons/IconClose";




export default function Header() {

    const [openMenu, setOpenMenu] = useState(false)

    return (

        <header className="sticky top-0 w-full">

            <div className="relative flex justify-between items-center min-h-[72px] px-6 bg-primary">

                <Link className="min-h-72px aspect-video flex items-center" to='/'>

                    <div className="text-4xl py-4 text-white">

                        LOGO

                    </div>

                </Link>

                <div className="flex items-center flex-wrap justify-end gap-3 max-lg:hidden">

                    <nav className="flex gap-5 text-white font-bold">

                        <Link to="/about" className="hover:text-white">Giới thiệu</Link>

                        <Link to="/my-ticket" className="hover:text-white">Đơn hàng của tôi</Link>

                        <Link to="#" className="hover:text-white">Trở thành đối tác</Link>

                    </nav>

                    <div className="flex gap-3">

                        <Link to={'/login'} className="button hover:!bg-white hover:text-primary !w-[133px]">

                            Đăng nhập

                        </Link>

                        <Link to={'/register'} className="button hover:!bg-white hover:text-primary !w-[133px]">

                            Đăng ký

                        </Link>

                    </div>

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