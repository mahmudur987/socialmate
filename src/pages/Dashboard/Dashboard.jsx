import { useContext, useEffect, useState } from "react";
import { authContext } from "../../Context/UserContext";
import DashboardPost from "../../components/DashboardPost/DashboardPost";
import { toast } from "react-hot-toast";
import Loading from "../../components/Loading/Loading";

const Dashboard = () => {
  const { user, loading, setLoading } = useContext(authContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let url = `https://socialmate-server.vercel.app/posts?email=${user?.email}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data?.data);
      })
      .catch((err) => console.error(err));
  }, [user]);
  const DrawerItem = (
    <>
      <li>
        <a>My Posts</a>
      </li>
      <li>
        <a>Liked Post</a>
      </li>
    </>
  );
  const handleDelete = (id) => {
    console.log(id);
    let url = `https://socialmate-server.vercel.app/post/${id}`;
    fetch(url, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == "ok") {
          toast.success(data.message);

          const updatePosts = posts.filter((post) => post._id !== id);
          console.log(updatePosts);
          setPosts(updatePosts);
        }
      })
      .catch((err) => console.error(err));
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className=" relative drawer container lg:px-7">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ">
        {/* <!-- Navbar --> */}
        <div className="w-full flex flex-col navbar ">
          <div className="flex-1 text-start -400 w-full lg:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
        </div>
        {/* <!-- Page content here --> */}
        <div className="flex">
          <div className=" w-1/6 hidden lg:block">
            <ul className="menu menu-horizontal flex-col">
              {/* <!-- Navbar menu content here --> */}
              {DrawerItem}
            </ul>
          </div>
          <div className="flex-grow">
            {posts.length > 0 ? (
              <div>
                {posts
                  ?.sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((post, idx) => (
                    <DashboardPost
                      handleDelete={handleDelete}
                      key={idx}
                      post={post}
                    />
                  ))}
              </div>
            ) : (
              <h1 className="text-2xl text-center text-green-600">
                {" "}
                You did not post anything yet
              </h1>
            )}{" "}
          </div>
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 bg-base-100">{DrawerItem}</ul>
      </div>
    </div>
  );
};

export default Dashboard;
