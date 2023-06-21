import apiClient from "..";
import { ResponseProps } from "../../interface/response.interface";

export async function fetchNotification(userId: string): Promise<ResponseProps<any>> {
    const token = localStorage.getItem('token');
  try {
    const { data } = await apiClient.get(`/users/${userId}/notifications`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data, success: true };
  } catch (error: any) {
    return { error, success: false };
  }
}
