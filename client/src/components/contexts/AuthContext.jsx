// AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const isValidJSON = (str) => {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
};

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return isValidJSON(storedUser) ? JSON.parse(storedUser)?.role : null;
  });

  const [dentistId, setDentistId] = useState(() => {
    const storedUser = localStorage.getItem("user");
    const parsedUser = isValidJSON(storedUser) ? JSON.parse(storedUser) : null;
    return parsedUser?.role === "Dentist" ? parsedUser?.dentistId : null;
  });

  // Add patientId state
  const [patientId, setPatientId] = useState(() => {
    const storedUser = localStorage.getItem("user");
    const parsedUser = isValidJSON(storedUser) ? JSON.parse(storedUser) : null;
    return parsedUser?.role === "Patient" ? parsedUser?.patientId : null;
  });

  const navigate = useNavigate();

  const login = (user) => {
    if (user && user.role) {
      localStorage.setItem("user", JSON.stringify(user));
      setUserRole(user.role);

      // Set dentistId only if the user's role is "Dentist"
      setDentistId(user.role === "Dentist" ? user.dentistId : null);

      // Set patientId only if the user's role is "Patient"
      setPatientId(user.role === "Patient" ? user.patientId : null);

      navigate(`/${user.role}`);
    } else {
      console.error("User data is invalid: no role found");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUserRole(null);
    setDentistId(null);
    setPatientId(null);
    navigate("/login");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (isValidJSON(storedUser)) {
      const parsedUser = JSON.parse(storedUser);
      setUserRole(parsedUser?.role || null);

      // Set dentistId only if stored role is "Dentist"
      setDentistId(
        parsedUser?.role === "Dentist" ? parsedUser?.dentistId : null
      );

      // Set patientId only if stored role is "Patient"
      setPatientId(
        parsedUser?.role === "Patient" ? parsedUser?.patientId : null
      );
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ userRole, dentistId, patientId, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
