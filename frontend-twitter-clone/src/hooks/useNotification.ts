import { useCallback, useEffect, useState } from 'react';
import { useReduxStoreDispatch, useReduxStoreSelector } from '../store/hooks';
import { fetchNotification } from '../api/libs/notification';
import { getUserNotificationDataFromStore, setNotificationData } from '../store/slices/notification';

export const useFetchNotification = (userId: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useReduxStoreDispatch();
  const notifications = useReduxStoreSelector(getUserNotificationDataFromStore);

  const fetchPost = useCallback(async () => {
    setIsLoading(true);
    if (userId) {
      const response = await fetchNotification(userId);
      if (response.success) {
        const { data } = response;
        console.log(data);
        dispatch(setNotificationData(data as any | []));
      }
    }
    setIsLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost, userId]);

  return { notifications, fetchPost, isLoading };
};
