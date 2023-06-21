import { ResponseProps } from '../../interface/response.interface';
import { userType } from '../../schema/user.schema';
import apiClient from '..';

export async function fetchUsersData(): Promise<ResponseProps<userType[]>> {
  try {
    const { data } = await apiClient.get('/users');
    return { data, success: true };
  } catch (error: any) {
    return { error, success: false };
  }
}

export async function fetchUserData(userId: string): Promise<ResponseProps<userType>> {
  try {
    const { data } = await apiClient.get(`/users/${userId}`);
    return { data, success: true };
  } catch (error: any) {
    return { error, success: false };
  }
}

interface UpdateUserProps {
  name: string;
  username: string;
  bio: string;
  profileImage: string;
  coverImage: string;
}

export async function updateUser(
  userId: string,
  body: UpdateUserProps,
): Promise<ResponseProps<userType>> {
  const token = localStorage.getItem('token');
  try {
    const { data } = await apiClient.patch(
      `/users/${userId}`,

      body,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return { data, success: true };
  } catch (error: any) {
    console.log(error);
    return { error, success: false };
  }
}

export async function followUser(
  userId: string,
  followerId: string,
): Promise<ResponseProps<any>> {
  const body = {
    followerId: followerId,
  };
  const token = localStorage.getItem('token');
  try {
    const { data } = await apiClient.post(`/users/follow/${userId}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data, success: true };
  } catch (error: any) {
    return { error, success: false };
  }
}

export async function unfollowUser(userId: string): Promise<ResponseProps<any>> {
  const token = localStorage.getItem('token');
  try {
    const { data } = await apiClient.delete(`/users/unfollow/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data, success: true };
  } catch (error: any) {
    console.log(error);
    return { error, success: false };
  }
}
