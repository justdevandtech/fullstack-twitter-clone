/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { register } from '../api/libs/auth';
import Input from '../common/Input';
import Modal from '../common/Modal';
import useLoginModal from '../hooks/useloginModal';
import useRegisterModal from '../hooks/useRegisterModal';
import { UserSchema, userType } from '../schema/user.schema';
import { formatErrorMessage } from '../utils/errorFormater';

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }

    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal, isLoading]);

  const { handleSubmit, control } = useForm<userType>();

  const onSubmit = async (data: userType) => {
    setIsLoading(true);
    const response = await register(data);
    if (response.success) {
      toast.success(response.data?.message as string);
      registerModal.onClose();
      setIsLoading(false);
      loginModal.onOpen();
    }

    if (!response.success) {
      const message = formatErrorMessage(response.error);
      toast.error(message);
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        disabled={isLoading}
        placeholder="Email"
        name="email"
        label="Email"
        control={control}
      />
      <Input
        disabled={isLoading}
        placeholder="Name"
        label="Name"
        name="name"
        control={control}
      />
      <Input
        name="username"
        label="Username"
        control={control}
        disabled={isLoading}
        placeholder="Username"
      />

      <Input
        disabled={isLoading}
        placeholder="Password"
        type="password"
        label={'Password'}
        name={'password'}
        control={control}
      />
      {/* <Input
        disabled={isLoading}
        placeholder="Confirm password"
        type="password"
        label={'Confirm password'}
        name={'confirmPassword'}
        control={control}
      /> */}
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        Already have an account?
        <span
          onClick={onToggle}
          className="
            text-sky-500 
            cursor-pointer 
            hover:underline
          "
        >
          {' '}
          Sign in
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Create an account"
      actionLabel="Register"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
