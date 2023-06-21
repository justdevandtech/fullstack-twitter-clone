import Avatar from '../../common/Avatar';
import { useFetccUserById } from '../../hooks/useGetUserData';

interface UserHeroProps {
  userId: string;
}

const UserHero: React.FC<UserHeroProps> = ({ userId }) => {
  const { userData } = useFetccUserById(userId);

  return (
    <div>
      <div className="bg-[#f5f5f5] h-44 relative">
        {userData?.data.coverImage && (
          <img
            src={userData.data.coverImage}
            alt="CoverImage"
            style={{
              width: '100%',
              height: '11rem',
              objectFit: 'cover',
            }}
          />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={userId} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
