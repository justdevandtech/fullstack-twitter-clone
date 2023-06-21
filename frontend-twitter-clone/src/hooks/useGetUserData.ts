import { useCallback, useEffect, useState } from 'react';

import { getUserData } from '../api/libs/auth';
import { fetchUserData, fetchUsersData } from '../api/libs/user';
import { userType } from '../schema/user.schema';
import { useReduxStoreSelector } from '../store/hooks';
import { getUsersDataFromStore, setUserData } from '../store/slices/user';
import { useReduxStoreDispatch } from './../store/hooks';

//Current Logged in User
export const useGetCurrentUserData = () => {
  const token = localStorage.getItem('token');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchCurrentUser = useCallback(async () => {
    setIsLoading(true);
    if (token) {
      const user = await getUserData(token as string);
      setCurrentUser(user);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  return { currentUser, fetchCurrentUser, isLoading };
};

interface Iuser {
  data: userType;
}

//All users
export function useFetchUsersData() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useReduxStoreDispatch();
  const usersData = useReduxStoreSelector(getUsersDataFromStore);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    const response = await fetchUsersData();
    if (response.success) {
      const { data } = response;
      dispatch(setUserData(data as userType[] | []));
    }
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    usersData,
    fetchUsers,
    isLoading,
  };
}

export function useFetccUserById(userId: string) {
  const [userData, setUserData] = useState<Iuser>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    if (userId) {
      const user = await fetchUserData(userId);
      setUserData(user as unknown as Iuser);
    }
    setIsLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser, userId]);

  return { userData, refetch: fetchUser, isLoading };
}
