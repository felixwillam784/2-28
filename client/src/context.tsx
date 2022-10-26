import {
  createContext, useEffect, useMemo, useState,
} from 'react';
import { UserContextType, UserContextTypeWithDispatch } from './interfaces';
import httpInstance from './services/axiosCongif';

export const UserContext = createContext<UserContextTypeWithDispatch>({
  userInfo: {
    id: 0, email: '', userName: '', role: '',
  },
  setUserInfo: () => ({
    id: 0, email: '', userName: '', role: '',
  }),
});

export default function UserInfoProvider({ children }:any) {
  const [userInfo, setUserInfo] = useState<UserContextType | null>(null);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const result = await httpInstance.get('/auth/user');
        setUserInfo(result.data);
      } catch (error) {
        setUserInfo(null);
      }
    };
    getUserInfo();
  }, []);
  const value = useMemo(() => ({
    userInfo, setUserInfo,
  }), [userInfo]);
  return (
    <UserContext.Provider value={value}>
      { children }
    </UserContext.Provider>
  );
}
