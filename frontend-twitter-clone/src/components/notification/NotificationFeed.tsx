import { BsTwitter } from 'react-icons/bs';
import { useEffect } from 'react';
import { useFetchNotification } from '../../hooks/useNotification';
import { useGetCurrentUserData } from '../../hooks/useGetUserData';

const NotificationsFeed = () => {
  const { currentUser, fetchCurrentUser: mutateCurrentUser } = useGetCurrentUserData();
  const { notifications: fetchedNotifications = [] } = useFetchNotification(
    currentUser?.id,
  );

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  if (fetchedNotifications.length === 0) {
    return (
      <div className="text-neutral-600 text-center p-6 text-xl">No notifications</div>
    );
  }

  return (
    <div className="flex flex-col">
      {fetchedNotifications.map((notification: Record<string, any>) => (
        <div
          key={notification.id}
          className="flex flex-row items-center p-6 gap-4 border-b-[2px] border-[#eff3f4]"
        >
          <BsTwitter color="black" size={32} />
          <p className="text-black">{notification.body}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationsFeed;
