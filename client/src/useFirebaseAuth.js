import React, { useEffect, useState } from 'react';
import Firebase from './Firebase';

const formatAuthUser = user => ({
  uid: user.uid,
  email: user.email
});

const useFirebaseAuth = () => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const authStateChanged = async authState => {
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const formattedUser = formatAuthUser(authState);
    setAuthUser(formattedUser);
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = Firebase.auth().onAuthStateChange(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading
  };
};

export default useFirebaseAuth;
