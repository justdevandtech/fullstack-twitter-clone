/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useCallback, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { loginUser } from '../api/libs/auth';
import Input from '../common/Input';
import Modal from '../common/Modal';
import { useFetchUsersData, useGetCurrentUserData } from '../hooks/useGetUserData';
import useLoginModal from '../hooks/useloginModal';
import useRegisterModal from '../hooks/useRegisterModal';
import { formatErrorMessage } from '../utils/errorFormater';
import { AuthContext } from '../context/authContext';
import { useFetchPostData } from '../hooks/usePostData';

const LoginModal = () => {
  const loginModal = useLoginModal();
  const { storeItems, authenticateUser } = useContext(AuthContext);
  const registerModal = useRegisterModal();
  const { fetchCurrentUser } = useGetCurrentUserData();
  const { fetchUsers } = useFetchUsersData();
  const { fetchPosts } = useFetchPostData();

  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const { handleSubmit, control } = useForm<{ email: string; password: string }>();

  const onSubmit = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    const response = await loginUser(data);
    if (response.success) {
      const token = response.data?.accessToken;
      storeItems(token);
      authenticateUser();
      fetchCurrentUser();
      fetchPosts();
      fetchUsers();
      toast.success('Logged in successfully');
      loginModal.onClose();
      setIsLoading(false);
    }

    if (response.error) {
      const message = formatErrorMessage(response.error);
      toast.error(message);
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        type="email"
        name="email"
        label="Email"
        control={control}
        disabled={isLoading}
      />
      <Input
        placeholder="Password"
        type="password"
        name="password"
        label="Password"
        control={control}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        First time using Twitter?
        <span
          onClick={onToggle}
          className="
            text-sky-500 
            cursor-pointer 
            hover:underline
          "
        >
          Create an account
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Sign in"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
