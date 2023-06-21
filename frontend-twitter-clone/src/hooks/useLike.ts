import axios from 'axios';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import useLoginModal from './useloginModal';
import { useFetccUserById, useGetCurrentUserData } from './useGetUserData';
import { useFetchPostById, useFetchPostByUserId, useFetchPostData } from './usePostData';
import { fetchAllPost, likePost, unlikePost } from '../api/libs/post';

const useLike = ({ postId, userId }: { postId: string; userId?: string }) => {
  const { refetch: mutateFetchedUser } = useFetccUserById(userId as string);
  const { currentUser, fetchCurrentUser: mutateCurrentUser } = useGetCurrentUserData();
  const { post: fetchedPost, fetchPost: mutateFetchedPost } = useFetchPostById(postId);
  const { fetchPosts: mutateFetchedPosts } = useFetchPostData();
  const { fetchPost: mutateFetchedPostByUser } = useFetchPostByUserId(userId as string);

  const loginModal = useLoginModal();

  const hasLiked = useMemo(() => {
    const list = fetchedPost?.data?.likedIds || [];

    return list.includes(currentUser?.id);
  }, [fetchedPost, currentUser]);

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (hasLiked) {
        request = () => unlikePost(postId);
      } else {
        request = () => likePost(postId);
      }

      await request();
      mutateCurrentUser();
      mutateFetchedPost();
      mutateFetchedPosts();
      mutateFetchedPostByUser();
      mutateFetchedUser();

      toast.success('Success');
    } catch (error) {
      toast.error('Something went wrong');
    }
  }, [
    currentUser,
    hasLiked,
    postId,
    mutateCurrentUser,
    mutateFetchedPosts,
    mutateFetchedPost,
    mutateFetchedPostByUser,
    mutateFetchedUser,
    loginModal,
  ]);

  return {
    hasLiked,
    toggleLike,
  };
};

export default useLike;
