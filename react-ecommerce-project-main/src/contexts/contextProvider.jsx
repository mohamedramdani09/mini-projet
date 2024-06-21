import { useState, createContext, useEffect } from "react";

export const StateContext = createContext({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});

export const ContextProvider = ({ children }) => {
  useEffect(() => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (token) {
      setUser({ token });
      console.log("set user true");
      console.log("use" ,user);
      } else{
        console.log("set user false");
    }
  }, []);

  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

  const setToken = (token) => {
    console.log('Setting token:', token);
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
      console.log('Token saved to localStorage');
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
      console.log('Token removed from localStorage');
    }
  };
  
  // const setUser = (user) => {
  //   // console.log('Setting token:', token);
  //   const token = localStorage.getItem("ACCESS_TOKEN");
  //   if (token) {
  //     _setUser(user);
  //   console.log('user is = ', user);
  //   } else {
  //     console.log('user not founded');
  //   }
  // };

  return (
    <StateContext.Provider
      value={{
        user,
        token,
        setUser,
        setToken,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}
