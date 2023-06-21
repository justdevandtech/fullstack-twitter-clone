/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback, useContext } from 'react';
import { IconType } from 'react-icons';
import { BsDot } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import { useGetCurrentUserData } from '../../hooks/useGetUserData';
import useLoginModal from '../../hooks/useloginModal';
import { AuthContext } from '../../context/authContext';

interface SidebarItemProps {
  label: string;
  icon: IconType;
  href?: string;
  onClick?: () => void;
  auth?: boolean;
  alert?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  icon: Icon,
  href,
  auth,
  onClick,
  alert,
}) => {
  const navigate = useNavigate();
  const loginModal = useLoginModal();
  const { isLoggedIn } = useContext(AuthContext);

  const hanleClick = useCallback(() => {
    if (onClick) {
      onClick();
    }

    if (auth && !isLoggedIn) {
      loginModal.onOpen();
      return;
    }

    if (href) {
      navigate(`${href}`);
    }
  }, [navigate, onClick, href, isLoggedIn, auth]);

  return (
    <div onClick={hanleClick} className="flex flex-row items-center">
      <div
        className="
        relative
        rounded-full 
        h-14
        w-14
        flex
        items-center
        justify-center 
        p-4
        hover:bg-slate-300 
        hover:bg-opacity-10 
        cursor-pointer 
        lg:hidden
      "
      >
        <Icon size={28} color="black" />
        {alert ? (
          <BsDot className="text-sky-500 absolute -top-4 left-0" size={70} />
        ) : null}
      </div>
      <div
        className="
        relative
        hidden 
        lg:flex 
        items-row 
        gap-4 
        p-4 
        rounded-full 
        hover:bg-slate-300 
        hover:bg-opacity-10 
        cursor-pointer
        items-center
      "
      >
        <Icon size={24} color="black" />
        <p className="hidden lg:block text-black text-xl">{label}</p>
        {alert ? (
          <BsDot className="text-sky-500 absolute -top-4 left-0" size={70} />
        ) : null}
      </div>
    </div>
  );
};

export default SidebarItem;
