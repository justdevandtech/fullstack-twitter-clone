import Avatar from '../common/Avatar';
import { useFetchUsersData } from '../hooks/useGetUserData';
import { userType } from '../schema/user.schema';

const FollowBar = () => {
  const { usersData } = useFetchUsersData();

  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className="bg-[#f7f9f9] rounded-xl p-4">
        <h2 className="text-black text-xl font-semibold">Who to follow</h2>
        <div className="flex flex-col gap-6 mt-4">
          {usersData?.length ?? 0
            ? usersData?.map((user: userType) => (
                <div key={user.id} className="flex flex-row gap-4">
                  <Avatar userId={user.id} />
                  <div className="flex flex-col">
                    <p className="text-black font-semibold text-sm">{user.name}</p>
                    <p className="text-[#a6afb6] text-sm">@{user.username}</p>
                  </div>
                </div>
              ))
            : 'No Data Available'}
        </div>
      </div>
    </div>
  );
};

export default FollowBar;