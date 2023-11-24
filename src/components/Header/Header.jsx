import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../Context/UserContext";

const Header = () => {
  const { user, logout } = useContext(authContext);
  const websiteName = "SOCIALMATE";
  const colors = [
    "text-red-500",
    "text-green-500",
    "text-blue-500",
    "text-yellow-500",
    "text-purple-500",
  ];
  const Navigate = useNavigate();
  const handleLogout = () => {
    logout();
    Navigate("/");
  };

  console.log(user);

  const NavItem = (
    <>
      <li className="hover:bg-pink-100 rounded-lg hover:text-green-500">
        <Link to={"/"}>Home</Link>
      </li>
      <li className="hover:bg-pink-100 rounded-lg hover:text-green-500">
        <Link to={"/dashboard"}>Dashboard</Link>
      </li>
      <li className="hover:bg-pink-100 rounded-lg hover:text-green-500">
        <Link to={"/videos"}>Videos</Link>
      </li>
      <li className="hover:bg-pink-100 rounded-lg hover:text-green-500">
        <Link to={"/group"}>Group</Link>
      </li>
      {user ? (
        <li className="hover:bg-pink-100 rounded-lg hover:text-green-500">
          <button onClick={() => handleLogout()}>SignOut </button>
          <button className="text-xl font-bold">{user?.name} </button>
        </li>
      ) : (
        <>
          <li className="hover:bg-pink-100 rounded-lg hover:text-green-500">
            <Link to={"/login"}>LogIn</Link>
          </li>
          <li className="hover:bg-pink-100 rounded-lg hover:text-green-500">
            <Link to={"/signup"}>Sign Up</Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 container lg:px-7 px-2">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2  rounded-box w-52 bg-base-200"
          >
            {NavItem}
          </ul>
        </div>

        <div>
          <h1 className="text-4xl font-bold">
            {websiteName.split("").map((letter, index) => (
              <span key={index} className={colors[index % colors.length]}>
                {letter}
              </span>
            ))}
          </h1>
        </div>
      </div>
      <div className="navbar-end w-2/3 hidden lg:flex">
        <ul className="menu menu-horizontal">{NavItem}</ul>
      </div>
    </div>
  );
};

export default Header;
