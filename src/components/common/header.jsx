import Logo from '@/assets/images/logo-car.png';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="w-full bg-primary shadow-md py-2 px-4 flex items-center">
      <Link to="/" className="flex items-center gap-2">
        <img src={Logo} alt="logo" className="w-10 h-10 object-cover rounded-full" />
        <span className="text-white text-xl font-bold">Car Service</span>
        </Link>
    </header>
  );
}