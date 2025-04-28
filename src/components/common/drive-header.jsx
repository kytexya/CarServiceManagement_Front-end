import React, { useEffect, useState } from 'react'
import Logo from '@/assets/images/logo.png';

export default function DriveHeader() {
  const [profile, setProfile] = useState(false);

  useEffect(() => {
    const profile = localStorage.getItem("bus-profile");
    if (profile) {
      const parsedProfile = JSON.parse(profile);
      setProfile(parsedProfile);
    }
  }, []);

  return (
    <div className="relative flex justify-between items-center min-h-[72px] px-6 bg-primary">
      <div className="min-h-72px aspect-video flex items-center" to='/'>
        <div className="text-4xl py-4 text-white">
          <img src={Logo} alt="logo" className="w-14 h-14 object-cover" />
        </div>
      </div>
      <div className="flex flex-row gap-4 justify-end">
        <button className="button !bg-success !text-white min-w-[104px]">
          {profile?.username}
        </button>
        <button
          onClick={() => {
            localStorage.removeItem('bus-profile');
            localStorage.removeItem('bus-token');
            window.location.href = '/login-manager';
          }}
          className="button !bg-red-500 !text-white min-w-[104px]">
          Đăng xuất
        </button>
      </div>
    </div>
  )
}