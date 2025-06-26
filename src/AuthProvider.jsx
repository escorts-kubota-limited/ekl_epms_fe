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
  const [data, setData] = useState({ user_info: {} });
  const [token, setToken] = useState(); //access token

  useEffect(() => {
    console.log("headerrrr")
   const storedToken = localStorage.getItem('token');
   console.log("useEffect",storedToken);
    const storedDataRaw = localStorage.getItem('data');
    if (storedToken && storedDataRaw) {
      let parsed = null;
      try {
        parsed = JSON.parse(storedDataRaw);
      } catch (e) {
        console.error('Failed to parse stored data:', e);
      }
      if (parsed && parsed.user_info) {
        setToken(storedToken);
        setData(parsed);
        // restore axios headers
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        axios.defaults.headers.common['user_id'] = `${parsed.user_info.userIndex}`;
        axios.defaults.headers.common['keyword'] = `${parsed.user_info.keyword}`;
        axios.defaults.headers.common['ein'] = `${parsed.user_info.ein}`;

        // Optional: validate token with API
        // axios.get('/api/me').catch(() => logOut());
      } else {
        // invalid stored data
        localStorage.removeItem('token');
        localStorage.removeItem('data');
        setToken(null);
        setData(null);
      }
    } else {
      setToken(null);
      setData(null);
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

  // const hasPermission = (permission) => {
  //   if (!user || !user.role) return false;

  //   const permissions = ROLES_PERMISSIONS[user.role] || [];
  //   return permissions.includes(permission);
  // };
  // const hasRole = (role) => {
  //   return user?.role === role;
  // };

  console.log("data",data);
  console.log("token",token);

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
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.defaults.headers.common["user_id"] = `${user_data.userIndex}`;
      axios.defaults.headers.common["keyword"] = `${user_data.keyword}`;
      axios.defaults.headers.common["ein"] = `${user_data.ein}`;
      localStorage.setItem("token", token);
      localStorage.setItem("data", JSON.stringify({ ...userInfo }));
      // localStorage.setItem("permission", hasPermission);

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
    setData(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("data");
    // localStorage.removeItem("permission");
    delete axios.defaults.headers.common["Authorization"];
    delete axios.defaults.headers.common['user_id'];
    delete axios.defaults.headers.common['keyword'];
    delete axios.defaults.headers.common['ein'];
  };

  return (
    <AuthContext.Provider
      value={{ data, token, logIn, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
