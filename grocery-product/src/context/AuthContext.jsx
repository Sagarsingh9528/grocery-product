import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  
  const signup = (name, email, password, role = "user") => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exist = users.find((u) => u.email === email);
    if (exist) return false;

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role,
    };

    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    return true;
  };

  
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    
    if (email === "admin@gmail.com" && password === "12345") {
      const admin = { id: "1", name: "Admin", role: "admin" };
      setUser(admin);
      localStorage.setItem("authUser", JSON.stringify(admin));
      return true;
    }

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("authUser", JSON.stringify(foundUser));
      return true;
    }

    return false;
  };

  
  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
  };

  
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    isAuthenticated: !!user,
    role: user?.role || null, 
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);