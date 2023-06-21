/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFetccUserById } from '../hooks/useGetUserData';

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
  const { userData, isLoading } = useFetccUserById(userId);
  const navigate = useNavigate();

  const onClick = useCallback(
    (event: any) => {
      event.stopPropagation();

      const url = `/users/${userId}`;
      navigate(`${url}`);
    },
    [navigate, userId],
  );

  return (
    <div
      className={`
        ${hasBorder ? 'border-2 border-[#f5f5f5]' : ''}
        ${isLarge ? 'h-32' : 'h-12'}
        ${isLarge ? 'w-32' : 'w-12'}
        rounded-full 
        hover:opacity-90 
        transition 
        cursor-pointer
        relative
      `}
    >
      <img
        className={`${isLarge ? 'h-32' : 'h-12'}
        ${isLarge ? 'w-32' : 'w-12'}`}
        onClick={onClick}
        style={{
          objectFit: 'cover',
          borderRadius: '100%',
        }}
        alt="Avatar"
        src={userData?.data?.profileImage || '../../resources/placeholder.png'}
      />
    </div>
  );
};

export default Avatar;
