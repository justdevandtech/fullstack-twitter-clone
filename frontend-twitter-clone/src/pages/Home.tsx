import React, { useContext } from 'react';

import Form from '../common/Form';
import Header from '../common/Header';
import PostCard from '../components/post/PostCard';
import { useFetchPostData } from '../hooks/usePostData';
import { ClipLoader } from 'react-spinners';
import { AuthContext } from '../context/authContext';

const Home = () => {
  const { isLoading, posts } = useFetchPostData();
  const { loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader
          color="skyblue"
          loading={loading}
          size={80}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <div>
      <Header label="Home" />
      <Form placeholder="What's happening...?" />
      <PostCard postData={posts} isLoading={isLoading} />
    </div>
  );
};

export default Home;
