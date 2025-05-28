import { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // simule un usuario basico para cumplir con el requisito pero despuesl o armo mas en profundidad con la contraseña hardcodeada
  const login = (username, password) => {
    if (username === 'admin' && password === '1234') {
      setIsAuthenticated(true);
      navigate('/admin');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
