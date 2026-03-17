import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(false);

  const [role, setRole] = useState(null);

  const [loading, setLoading] = useState(true);

  const login = (userType) => {

    const fakeUser = {
      id: Date.now(),
      name: "Sagar",
      role: userType,
    };

    setUser(fakeUser);
    setRole(userType);

    localStorage.setItem("authUser", JSON.stringify(fakeUser));
  };

  
  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem("authUser");
  };

  
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setRole(parsedUser.role);
    }

    setLoading(false);
  }, []);

  const value = {
    user,
    role,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
