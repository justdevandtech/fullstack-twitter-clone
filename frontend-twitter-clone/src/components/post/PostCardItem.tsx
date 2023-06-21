/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { formatDistanceToNowStrict } from 'date-fns';
import { useCallback, useMemo } from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import Avatar from '../../common/Avatar';
import { useGetCurrentUserData } from '../../hooks/useGetUserData';
import useLoginModal from '../../hooks/useloginModal';
import useLike from '../../hooks/useLike';

interface PostItemProps {
  data: Record<string, any>;
  userId?: string;
}

const PostCardItem: React.FC<PostItemProps> = ({ data = {}, userId }) => {
  const loginModal = useLoginModal();
  const navigate = useNavigate();

  const { currentUser } = useGetCurrentUserData();
  const { hasLiked, toggleLike } = useLike({ postId: data.id, userId });

  const goToUser = useCallback(
    (ev: any) => {
      ev.stopPropagation();
      navigate(`/users/${data?.user?.id}`);
    },
    [navigate, data?.user?.id],
  );

  const goToPost = useCallback(() => {
    navigate(`/posts/${data?.id}`);
  }, [navigate, data.id]);

  const onLike = useCallback(
    async (ev: any) => {
      ev.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      toggleLike();
    },
    [loginModal, currentUser, toggleLike],
  );

  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data?.createdAt));
  }, [data.createdAt]);

  return (
    <div
      onClick={goToPost}
      className="
        border-b-[1px] 
        border-[#eff3f4] 
        p-5 
        cursor-pointer 
        hover:bg-[#f5f5f5] 
        transition
      "
    >
      <div className="flex flex-row items-start gap-3">
        <div>
          <Avatar userId={data?.user?.id} />
        </div>
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className="
                text-black 
                font-semibold 
                cursor-pointer 
                hover:underline
            "
            >
              {data?.user?.name}
            </p>
            <span
              onClick={goToUser}
              className="
                text-neutral-500
                cursor-pointer
                hover:underline
                hidden
                md:block
            "
            >
              @{data?.user?.username}
            </span>
            <span className="text-neutral-500 text-sm">{createdAt}</span>
          </div>
          <div className="text-black mt-1">
            {data?.body?.length > 250 ? `${data.body?.substring(0, 250)}...` : data?.body}
          </div>
          <div className="flex flex-row items-center mt-3 gap-10">
            <div
              className="
                flex 
                flex-row 
                items-center 
                text-neutral-500 
                gap-2 
                cursor-pointer 
                transition 
                hover:text-sky-500
            "
            >
              <AiOutlineMessage size={20} />
              <p>{data?.comments?.length || 0}</p>
            </div>
            <div
              onClick={onLike}
              className="
                flex 
                flex-row 
                items-center 
                text-neutral-500  
                gap-2 
                cursor-pointer 
                transition 
                hover:text-red-500
            "
            >
              <LikeIcon color={hasLiked ? 'red' : ''} size={20} />
              <p>{data?.likedIds?.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCardItem;
