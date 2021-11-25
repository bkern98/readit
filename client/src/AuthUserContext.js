import { createContext, useContext, Context } from 'react';
import useFirebaseAuth from './useFirebaseAuth';

const AuthUserContext = createContext({
  authUser: null,
  loading: true
});

const AuthUserProvider = ({ children }) => {
  const auth = useFirebaseAuth();
  return (
    <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
  );
};

const useAuth = () => useContext(AuthUserContext);

export { AuthUserProvider, useAuth };
