import React, { useContext, useEffect } from 'react';
import NotificationsFeed from '../components/notification/NotificationFeed';
import Header from '../common/Header';
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const Notification = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [navigate, isLoggedIn]);

  return (
    <div>
      <Header showBackArrow label="Notifications" />
      <NotificationsFeed />
    </div>
  );
};

export default Notification;
