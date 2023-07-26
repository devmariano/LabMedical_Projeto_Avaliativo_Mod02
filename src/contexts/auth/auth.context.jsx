import { createContext, useState } from "react";
import PropTypes from 'prop-types';

export const AuthContext = createContext({
  auth: {
    user: {},
    isLogged: false,
  },
  setAuth: () => {},
});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const storedUser = localStorage.getItem('user');
    const storedIsLogged = localStorage.getItem('isLogged');
    return {
      user: storedUser ? JSON.parse(storedUser) : {},
      isLogged: storedIsLogged === 'true',
    };
  });

  const handleLogin = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isLogged', 'true');
    setAuth({ user, isLogged: true });
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isLogged');
    setAuth({ user: {}, isLogged: false });
  };

  return (
    <AuthContext.Provider value={{ auth, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
}