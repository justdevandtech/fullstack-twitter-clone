import { ResponseProps } from '../../interface/response.interface';
import apiClient from '..';
import { IpostProps } from '../../interface/post';

export async function fetchAllPost(): Promise<ResponseProps<IpostProps[]>> {
  try {
    const { data } = await apiClient.get('/posts');
    return { data, success: true };
  } catch (error: any) {
    return { error, success: false };
  }
}

export async function fetchPostById(
  postId: string,
): Promise<ResponseProps<IpostProps[]>> {
  try {
    const { data } = await apiClient.get(`/posts/${postId}`);
    return { data, success: true };
  } catch (error: any) {
    return { error, success: false };
  }
}

export async function fetchPostByUserId(userId: string) {
  try {
    const { data } = await apiClient.get(`/posts/users/${userId}`);
    return { data, success: true };
  } catch (error: any) {
    return { error, success: false };
  }
}

export async function createPost(body: any) {
  const token = localStorage.getItem('token');
  try {
    const { data } = await apiClient.post(
      `/posts`,
      { body },
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

export async function likePost(postId: string): Promise<ResponseProps<any>> {
  const body = {
    postId: postId,
  };
  const token = localStorage.getItem('token');
  try {
    const { data } = await apiClient.post(`/posts/like`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data, success: true };
  } catch (error: any) {
    return { error, success: false };
  }
}

export async function unlikePost(postId: string): Promise<ResponseProps<any>> {
  const token = localStorage.getItem('token');
  try {
    const { data } = await apiClient.delete(`/posts/unlike/${postId}`, {
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

export async function commentOnPost(
  postId: string,
  body: any,
): Promise<ResponseProps<any>> {
  const token = localStorage.getItem('token');
  const _body = {
    body: body,
  };
  try {
    const { data } = await apiClient.post(`/posts/comments/${postId}`, _body, {
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
