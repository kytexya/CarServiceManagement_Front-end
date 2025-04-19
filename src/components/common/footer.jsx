export default function Footer() {
    return <footer className="bg-primary text-lg text-white">
        <div className="px-4 md:px-10 xl:px-20 mx-auto md:w-[80%] max-w-[1400px] pb-8">
            <div>
                <div className="text-4xl py-4">
                    LOGO
                </div>
                <span className="text-sm">ĐẶT VÉ NHANH - DỊCH VỤ CHẤT LƯỢNG</span><br />
                <span className="text-sm">Cam kết hoàn tiền khi nhà xe không cung cấp dịch vụ vận chuyển</span>
            </div>
            <div className="flex flex-wrap items-start justify-between mt-4 gap-6 lg:gap-10">
                <div>
                    <h5 className="font-bold">Bến xe</h5>
                    <ul className="ml-7 list-disc">
                        <li>
                            Bến xe Miền Đông
                        </li>
                        <li>
                            Bến xe Miền Trung tâm Đà Nẵng
                        </li>
                        <li>
                            Bến xe Hải Phòng
                        </li>
                        <li>
                            Bến xe Yên Bái
                        </li>
                        <li>
                            Bến xe Hải Dương
                        </li>
                        <li>
                            Bến xe Phú Thọ
                        </li>
                    </ul>
                </div>
                <div>
                    <h5 className="font-bold">Nhà xe</h5>
                    <ul className="ml-7 list-disc">
                        <li>
                            Xe Liên Hưng
                        </li>
                        <li>
                            Xe Long Vân
                        </li>
                        <li>
                            Xe Hải Đăng
                        </li>
                        <li>
                            Xe Phúc Quyên
                        </li>
                        <li>
                            Xe Tiến Anh
                        </li>
                        <li>
                            Xe Phúc Xuyên
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col">
                    <h5 className="font-bold">Thông tin</h5>
                    <li>
                        <a href="#">Chính sách bảo mật</a>
                    </li>
                    <li>
                        <a href="#">Chính sách hoàn tiền</a>
                    </li>
                    <li>
                        <a href="#">Chính sách thanh toán</a>
                    </li>
                </div>
            </div>
            <hr className="my-6" />
            <div className="flex justify-between items-start">
                <div className="flex flex-row justify-between w-full">
                    <p className="font-bold">© 2024 Bus Management. Website đặt vé xe</p>
                    <a href="mailto:bus@gmail.com">Liên hệ: bus@gmail.com</a>
                </div>
            </div>
        </div>
    </footer>
}