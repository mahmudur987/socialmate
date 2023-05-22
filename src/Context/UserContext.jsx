/* eslint-disable react/prop-types */
import { useState } from "react";
import { createContext } from "react";

import { useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const authContext = createContext();

const UserContext = ({ children }) => {
  const [user, SetUser] = useState(null);

  const logout = () => {
    localStorage.setItem("token", "");
    SetUser(null);
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5000/userData", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: localStorage.getItem("token") }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          SetUser(data.data);
        } else {
          SetUser(null);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [token]);

  const authinfo = {
    user,
    logout,
    SetUser,
  };
  return (
    <authContext.Provider value={authinfo}>{children}</authContext.Provider>
  );
};

export default UserContext;
