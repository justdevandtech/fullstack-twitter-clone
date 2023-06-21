import React, { useState, useEffect, createContext, FC } from 'react';
import apiClient from '../api';
import { toast } from 'react-hot-toast';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextProps {
  storeItems: (token: string) => void;
  isLoggedIn: boolean;
  loading: boolean;
  logout: () => void;
  authenticateUser: () => void;
}

const AuthContext = createContext<any | null>(null);

interface Props {
  children: React.ReactElement;
}

const AuthProviderWrapper: FC<Props> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const storeItems = (token: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('timestamp', Date.now().toString());
  };

  const hasTokenExpired = () => {
    const token = localStorage.getItem('token');
    const timestamp = localStorage.getItem('timestamp');

    if (!token || !timestamp) {
      return false;
    }

    const timePassed = Date.now() - Number(timestamp);

    if (timePassed > 3600000) {
      toast.error('Sessions timed out');
      localStorage.removeItem('token');
      localStorage.removeItem('timestamp');

      window.location.reload();
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('timestamp');

    window.location.reload();
  };

  const authenticateUser = () => {
    const token = localStorage.getItem('token');

    if (!token || hasTokenExpired()) {
      toast.error('Token expired');
      setIsLoggedIn(false);
      setLoading(false);
      setUser(null);
    } else {
      apiClient
        .get(`/verify`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setLoading(false);
          setUser(response.data.user);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
          setIsLoggedIn(false);
          setLoading(false);
          setUser(null);
        });
    }
  };

  useEffect(() => {
    authenticateUser();
    hasTokenExpired();
  }, []);

  return (
    <AuthContext.Provider
      value={{ storeItems, isLoggedIn, loading, logout, authenticateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProviderWrapper };
