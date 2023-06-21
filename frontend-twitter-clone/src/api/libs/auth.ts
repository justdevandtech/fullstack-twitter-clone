import { ResponseProps } from '../../interface/response.interface';
import { userType } from '../../schema/user.schema';
import apiClient from '..';

export const register = async (
  body: userType,
): Promise<ResponseProps<{ message: string }>> => {
  try {
    const { data: result } = await apiClient.post('/register', body);
    return { data: result, success: true };
  } catch (error: any) {
    return { error, success: false };
  }
};

export const loginUser = async (body: {
  email: string;
  password: string;
}): Promise<ResponseProps<{ accessToken: string }>> => {
  try {
    const { data: result } = await apiClient.post('/login', body);
    return { data: result, success: true };
  } catch (error: any) {
    return { error, success: false };
  }
};

export const getUserData = async (token: string) => {
  try {
    const response = await apiClient.get('/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return { error, success: false };
  }
};
