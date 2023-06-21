import { useCallback, useEffect, useState } from 'react';

import { fetchAllPost, fetchPostById, fetchPostByUserId } from '../api/libs/post';
import { useReduxStoreDispatch, useReduxStoreSelector } from '../store/hooks';
import { getPostsDataFromStore, setPostsData } from '../store/slices/post';
import { IpostProps } from '../interface/post';
import { getUserPostsDataFromStore, setUserPostsData } from '../store/slices/postByUserId';

export const useFetchPostData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useReduxStoreDispatch();
  const posts = useReduxStoreSelector(getPostsDataFromStore);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    const response = await fetchAllPost();

    if (response.success) {
      const { data } = response;
      dispatch(setPostsData(data as IpostProps[] | []));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, fetchPosts, isLoading };
};

export const useFetchPostById = (postId: string) => {
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchPost = useCallback(async () => {
    setIsLoading(true);
    if (postId) {
      const post = await fetchPostById(postId);
      setPost(post);
    }
    setIsLoading(false);
  }, [postId]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return { post, fetchPost, isLoading };
};

export const useFetchPostByUserId = (userId: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
   const dispatch = useReduxStoreDispatch();
   const userPostsData = useReduxStoreSelector(getUserPostsDataFromStore);

  const fetchPost = useCallback(async () => {
    setIsLoading(true);
    if (userId) {
      const response = await fetchPostByUserId(userId);
      if (response.success) {
        const { data } = response;
        dispatch(setUserPostsData(data as IpostProps[] | []));
      }
    }
    setIsLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost, userId]);

  return { userPostsData, fetchPost, isLoading };
};
