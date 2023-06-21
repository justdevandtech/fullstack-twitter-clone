import React, { useContext, useEffect } from 'react';
import { BiLogOut } from 'react-icons/bi';
import { BsBellFill, BsHouseFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';

import { useGetCurrentUserData } from '../../hooks/useGetUserData';
import SidebarItem from './SidebarItem';
import SidebarLogo from './SidebarLogo';
import SidebarTweetButton from './SidebarTweetButton';
import { AuthContext } from '../../context/authContext';

const SideBar = () => {
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

  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem
              key={item.label}
              alert={item.alert}
              auth={item.auth}
              href={item.href}
              icon={item.icon}
              label={item.label}
            />
          ))}
          {isLoggedIn && <SidebarItem onClick={logout} icon={BiLogOut} label="Logout" />}

          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
