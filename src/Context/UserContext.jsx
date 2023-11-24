/* eslint-disable react/prop-types */
import { useState } from "react";
import { createContext } from "react";

import { useEffect } from "react";
import toast from "react-hot-toast";

// eslint-disable-next-line react-refresh/only-export-components
export const authContext = createContext();

const UserContext = ({ children }) => {
  const [user, SetUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // functions
  const logout = () => {
    localStorage.setItem("accessToken", "");
    localStorage.setItem("refreshToken", "");
    SetUser(null);
  };

  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  useEffect(() => {
    fetch(
      "https://socialmate-server-m8t0cdeun-mahmudur987.vercel.app/user/userData",
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          authorization: `${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          SetUser(data.data);
        } else {
          // refreshTokenHandle
          if (refreshToken) {
            fetch(
              "https://socialmate-server-97vj92yf5-mahmudur987.vercel.app/user/refresh-token",
              {
                method: "POST", // or 'PUT'
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ refreshToken }),
              }
            )
              .then((res) => res.json())
              .then((data) => {
                localStorage.setItem("accessToken", data.accessToken);
              })
              .catch((err) => {
                console.error(err);
                toast.error("your session is Expired please LogIn again", {
                  id: 1,
                });
                SetUser(null);
              });
          }
        }
      })
      .catch((err) => {
        console.error(err);
        SetUser(null);
      });
  }, [accessToken, refreshToken]);

  const authinfo = {
    user,
    logout,
    SetUser,
    loading,
    setLoading,
  };
  return (
    <authContext.Provider value={authinfo}>{children}</authContext.Provider>
  );
};

export default UserContext;
