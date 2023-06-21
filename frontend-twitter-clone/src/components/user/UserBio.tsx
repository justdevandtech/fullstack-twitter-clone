import { format } from 'date-fns';
import { useMemo } from 'react';
import { BiCalendar } from 'react-icons/bi';

import Button from '../../common/Button';
import useEditModal from '../../hooks/useEditModal';
import { useFetccUserById, useGetCurrentUserData } from '../../hooks/useGetUserData';
import useFollow from '../../hooks/useFollow';

interface UserBioProps {
  userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  const { currentUser } = useGetCurrentUserData();
  const { userData } = useFetccUserById(userId);

  const editModal = useEditModal();

  const { isFollowing, unfollowuser, followuser } = useFollow(userId);

  const createdAt = useMemo(() => {
    if (!userData?.data.createdAt) {
      return null;
    }

    return format(new Date(userData?.data.createdAt), 'MMMM yyyy');
  }, [userData?.data.createdAt]);

  return (
    <div className="border-b-[1px] border-[#eff3f4] pb-4">
      <div className="flex justify-end p-2">
        {currentUser?.id === userId ? (
          <Button secondary label="Edit" onClick={editModal.onOpen} />
        ) : (
          <div>
            {isFollowing ? (
              <Button
                onClick={unfollowuser}
                label={'Unfollow'}
                secondary={!isFollowing}
                outline={isFollowing}
              />
            ) : (
              <Button
                onClick={followuser}
                label={'Follow'}
                secondary={!isFollowing}
                outline={isFollowing}
              />
            )}
          </div>
        )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-black mt-4 text-2xl font-semibold">{userData?.data.name}</p>
          <p className="text-md text-[#7b8892]">@{userData?.data.username}</p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-black">{userData?.data.bio}</p>
          <div
            className="
              flex 
              flex-row 
              items-center 
              gap-2 
              mt-4 
              text-neutral-500
          "
          >
            <BiCalendar size={24} />
            <p>Joined {createdAt}</p>
          </div>
        </div>
        <div className="flex flex-row items-center mt-4 gap-6">
          <div className="flex flex-row items-center gap-1">
            <p className="text-black">{userData?.data.followersCount || 0}</p>
            <p className="text-[#7b8892]">Following</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-black">{userData?.data.followingIds?.length}</p>
            <p className="text-[#7b8892]">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
