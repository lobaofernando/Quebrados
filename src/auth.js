// auth.js
import { useState } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logoff = () => {
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logoff };
};
