import { useParams } from 'react-router-dom';

// import { ClipLoader } from 'react-spinners';
import Header from '../common/Header';
import PostCard from '../components/post/PostCard';
import UserBio from '../components/user/UserBio';
import UserHero from '../components/user/UserHero';
import { useFetccUserById } from '../hooks/useGetUserData';
import EditModal from '../modals/EditModal';
import { useFetchPostByUserId } from '../hooks/usePostData';

const UserProfile = () => {
  const { userId } = useParams();
  const { userData } = useFetccUserById(userId as string);
  const { userPostsData, isLoading } = useFetchPostByUserId(userId as string);

  console.log(userPostsData.length);

  return (
    <>
      <Header showBackArrow label={userData?.data?.name as string} />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
      {userPostsData.length > 0 ? (
        <PostCard postData={userPostsData} isLoading={isLoading} />
      ) : (
        <div className='flex justify-center text-lg mt-4'>No post found</div>
      )}
      <EditModal />
    </>
  );
};

export default UserProfile;
