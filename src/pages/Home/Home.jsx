import { useContext, useEffect, useState } from "react";
import AddPostForm from "../../components/AddPost/Addpost";
import DisplayPost from "../../components/DisplayPost/DisplayPost";
import { authContext } from "../../Context/UserContext";
import Loading from "../../components/Loading/Loading";

const Home = () => {
  const [posts, setPost] = useState([]);
  const { loading, setLoading } = useContext(authContext);

  useEffect(() => {
    setLoading(true);
    let url = "https://socialmate-server-6cldfhaow-mahmudur987.vercel.app/post";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPost(data.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto ">
      <AddPostForm posts={posts} setPost={setPost} />

      <div className="container mx-auto flex flex-col items-center ">
        {posts
          ?.sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((post, idx) => (
            <DisplayPost key={idx} post={post} />
          ))}
      </div>
    </div>
  );
};

export default Home;
