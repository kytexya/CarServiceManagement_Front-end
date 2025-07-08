import Logo from '@/assets/images/logo-car.png';

export default function Footer() {
  return (
    <footer className="w-full bg-primary text-white text-center py-4 mt-auto">
      © {new Date().getFullYear()} Car Service. All rights reserved.
    </footer>
  );
}