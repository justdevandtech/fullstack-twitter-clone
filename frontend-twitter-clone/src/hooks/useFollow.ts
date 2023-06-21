import axios from 'axios';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';

import { useFetccUserById, useGetCurrentUserData } from './useGetUserData';
import useLoginModal from './useloginModal';
import { followUser, unfollowUser } from '../api/libs/user';
import { formatErrorMessage } from '../utils/errorFormater';

const useFollow = (userId: string) => {
  const { refetch: mutateFetchedUser, userData } = useFetccUserById(userId as string);
  const { currentUser, fetchCurrentUser: mutateCurrentUser } = useGetCurrentUserData();

  const loginModal = useLoginModal();

  const isFollowing = useMemo(() => {
    const list = userData?.data.followingIds || [];

    return list.includes(currentUser?.id);
  }, [userData, userId]);

  const followuser = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    const response = await followUser(userId, currentUser?.id);
    if (response.success) {
      toast.success(response.data.message);
      mutateCurrentUser();
      mutateFetchedUser();
    }

    if (!response.success) {
      const message = formatErrorMessage(response.error);
      toast.error(message);
    }
  }, [currentUser, isFollowing, userId, mutateCurrentUser, mutateFetchedUser]);

  const unfollowuser = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    const response = await unfollowUser(userId);
    if (response.success) {
      toast.success(response.data.message);
      mutateCurrentUser();
      mutateFetchedUser();
    }

    if (!response.success) {
      const message = formatErrorMessage(response.error);
      toast.error(message);
    }
  }, [currentUser, isFollowing, userId, mutateCurrentUser, mutateFetchedUser]);

  return {
    isFollowing,
    followuser,
    unfollowuser,
  };
};

export default useFollow;
