
import React, { createContext, useContext, useState, useEffect } from 'react';

type UserType = 'customer' | 'contractor' | null;

interface UserTypeContextType {
  userType: UserType;
  setUserType: (type: UserType) => void;
  isCustomer: boolean;
  isContractor: boolean;
}

const UserTypeContext = createContext<UserTypeContextType | undefined>(undefined);

export const UserTypeProvider = ({ children }: { children: React.ReactNode }) => {
  const [userType, setUserTypeState] = useState<UserType>(null);

  useEffect(() => {
    const savedUserType = localStorage.getItem('userType') as UserType;
    if (savedUserType) {
      setUserTypeState(savedUserType);
    }
  }, []);

  const setUserType = (type: UserType) => {
    setUserTypeState(type);
    if (type) {
      localStorage.setItem('userType', type);
    } else {
      localStorage.removeItem('userType');
    }
  };

  return (
    <UserTypeContext.Provider 
      value={{
        userType,
        setUserType,
        isCustomer: userType === 'customer',
        isContractor: userType === 'contractor'
      }}
    >
      {children}
    </UserTypeContext.Provider>
  );
};

export const useUserType = () => {
  const context = useContext(UserTypeContext);
  if (context === undefined) {
    throw new Error('useUserType must be used within a UserTypeProvider');
  }
  return context;
};
