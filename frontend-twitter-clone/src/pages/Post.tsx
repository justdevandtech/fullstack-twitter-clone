import React from 'react';
import PostCard from '../components/post/PostCard';
import Header from '../common/Header';
import { useParams } from 'react-router-dom';
import { useFetchPostById } from '../hooks/usePostData';
import CommentFeed from '../components/comment/CommentFeed';
import Form from '../common/Form';

function Post() {
  const { postId } = useParams();
  const { post, isLoading } = useFetchPostById(postId as string);

  return (
    <div>
      <Header showBackArrow label="Tweet" />
      <PostCard postData={post} isLoading={isLoading} />
      <Form postId={postId as string} isComment placeholder="Tweet your reply" />
      <CommentFeed comments={post?.data.comments} />
    </div>
  );
}

export default Post;
