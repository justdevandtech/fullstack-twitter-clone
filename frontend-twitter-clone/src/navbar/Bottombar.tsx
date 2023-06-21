import React, { useContext, useEffect, useState } from 'react';
import { BiLogOut } from 'react-icons/bi';
import { BsBellFill, BsHouseFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import BottonBarItem from './BottombarItem';
import { useGetCurrentUserData } from '../hooks/useGetUserData';
import { AuthContext } from '../context/authContext';

const BottomBar = () => {
  const [showButton, setShowButton] = useState(true);
  const { currentUser } = useGetCurrentUserData();
  const { logout, isLoggedIn } = useContext(AuthContext);

  const items = [
    {
      icon: BsHouseFill,
      label: 'Home',
      href: '/',
    },
    {
      icon: BsBellFill,
      label: 'Notifications',
      href: '/notifications',
      auth: true,
      alert: currentUser?.hasNotification,
    },
    {
      icon: FaUser,
      label: 'Profile',
      href: `/users/${currentUser?.id}`,
      auth: true,
    },
  ];

  useEffect(() => {
    let prevScrollPos = window.scrollY;
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setShowButton(prevScrollPos > currentScrollPos || currentScrollPos < 50);
      prevScrollPos = currentScrollPos;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 w-full bg-white border-t-[2px] border-[#eff3f4] md:hidden block sm:hidden transition-opacity duration-1000 ease-out right-0 left-0 p-4 py-3 shadow-md z-50 ${
        showButton ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex justify-between">
        {items.map((item) => (
          <BottonBarItem
            key={item.href}
            alert={item.alert as any}
            auth={item.auth}
            href={item.href}
            icon={item.icon}
            label={item.label}
          />
        ))}
        {isLoggedIn && <BottonBarItem onClick={logout} icon={BiLogOut} label="Logout" />}
      </div>
    </div>
  );
};

export default BottomBar;
