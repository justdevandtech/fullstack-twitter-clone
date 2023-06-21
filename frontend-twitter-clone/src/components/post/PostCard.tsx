import { useEffect, useState } from 'react';

import PostCardSkeleton from '../../common/PostCardSkeleton';
import PostCardItem from './PostCardItem';
import { IpostProps } from '../../interface/post';

interface PostFeedProps {
  userId?: string;
  postId?: string;
  postData: any;
  isLoading: boolean;
}

const PostCard: React.FC<PostFeedProps> = ({ postData, isLoading }) => {
  if (isLoading) {
    return (
      <div>
        {[1, 2, 3, 4, 5].map((i) => (
          <PostCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <>
      {postData?.length > 0 ? (
        postData?.map((post: IpostProps['data']) => (
          <PostCardItem key={post.id} data={post} />
        ))
      ) : (
        <PostCardItem data={postData?.data} />
      )}
    </>
  );
};

export default PostCard;
