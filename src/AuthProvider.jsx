import {
  useContext,
  createContext,
  useState,
  useEffect,
  useDebugValue,
} from "react";
import { AUTH_URL, USER_LOGOUT_URL } from "./URL";
import axios from "axios";
import { ROLES_PERMISSIONS } from "./roles";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [data, setData] = useState({ user_info: {} });
  const [token, setToken] = useState(); //access token
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchUser(storedToken);
    }
    //
    // const checkLoggedIn = async () => {
    //   try {
    //     // Check for token in localStorage or cookies
    //     const token = localStorage.getItem("token");

    //     if (token) {
    //       // Fetch user data from API
    //       const response = await fetch("/api/me", {
    //         headers: { Authorization: `Bearer ${token}` },
    //       });
    //       const userData = await response.json();

    //       setUser(userData);
    //     }
    //   } catch (error) {
    //     console.error("Authentication error:", error);
    //     setUser(null);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
  }, []);

  const fetchUser = async (token) => {
    try {
    } catch (err) {
      console.log(err);
      logOut();
    }
  };

  const hasPermission = (permission) => {
    if (!user || !user.role) return false;

    const permissions = ROLES_PERMISSIONS[user.role] || [];
    return permissions.includes(permission);
  };
  const hasRole = (role) => {
    return user?.role === role;
  };

  const logIn = async (credentials) => {
    try {
      const response = await axios.post(AUTH_URL, credentials);
      const { token, user_data } = response.data;
      const userInfo = { user_info: user_data };
      // console.log(user_data);
      setToken(token);

      //const userDataAPI = user_data;
      // console.log(userDataAPI);
      console.log(user_data);
      // data = { ...data, "user_info": user_data }

      setData({ ...userInfo });
      // data.user_info = user_data;
      // console.log(data.user_info)
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.defaults.headers.common["user_id"] = `${user_data.userIndex}`;
      axios.defaults.headers.common["keyword"] = `${user_data.keyword}`;
      axios.defaults.headers.common["ein"] = `${user_data.ein}`;
      localStorage.setItem("token", token);
      localStorage.setItem("data", data);
      localStorage.setItem("permission", hasPermission);

      //console.log(response);
      return response;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  console.log(data);

  const logOut = async () => {
    try {
      const response = await axios.post(USER_LOGOUT_URL);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
    setUserData(null);
    setData(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("data");
    localStorage.removeItem("permission");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{ data, token, logIn, logOut, hasPermission, hasRole, setData,setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  console.log(AuthContext);
  return useContext(AuthContext);
};
