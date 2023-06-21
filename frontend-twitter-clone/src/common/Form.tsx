import { useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import { commentOnPost, createPost } from '../api/libs/post';
import useLoginModal from '../hooks/useloginModal';
import { useFetchPostById, useFetchPostData } from '../hooks/usePostData';
import useRegisterModal from '../hooks/useRegisterModal';
import { useGetCurrentUserData } from './../hooks/useGetUserData';
import Avatar from './Avatar';
import Button from './Button';
import { AuthContext } from '../context/authContext';

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form: React.FC<FormProps> = ({ placeholder, isComment = false, postId }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { currentUser } = useGetCurrentUserData();
  const { fetchPosts } = useFetchPostData();
  const { fetchPost: refetchPost } = useFetchPostById(postId as string);
  const { isLoggedIn } = useContext(AuthContext);

  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async () => {
    try {
      setIsLoading(true);

      if (isComment) {
        const result = await commentOnPost(postId as string, body);
        refetchPost();

        if (result.success) {
          toast.success('Tweet created');
          setBody('');
          fetchPosts();
        }
      } else {
        const result = await createPost(body);

        if (result.success) {
          toast.success('Tweet created');
          setBody('');
          fetchPosts();
        }
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-b-[2px] border-[#eff3f4] px-5 py-2">
      {isLoggedIn ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(event) => setBody(event.target.value)}
              value={body}
              className="
                disabled:opacity-80
                peer
                resize-none 
                mt-3 
                w-full 
                bg-white 
                ring-0 
                outline-none 
                text-[20px] 
                placeholder-black 
                text-black
              "
              placeholder={placeholder}
            ></textarea>
            <hr
              className="
                opacity-0 
                peer-focus:opacity-100 
                h-[1px] 
                w-full 
                transition"
            />
            <div className="mt-4 flex flex-row justify-end">
              <Button
                disabled={isLoading || body === ''}
                onClick={handleFormSubmit}
                label="Tweet"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="text-white text-2xl text-center mb-4 font-bold">
            Welcome to Twitter
          </h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login" onClick={loginModal.onOpen} />
            <Button label="Register" onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
