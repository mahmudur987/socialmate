import { useEffect, useState } from "react";
import AddPostForm from "../../components/AddPost/Addpost";
import DisplayPost from "../../components/DisplayPost/DisplayPost";

const Home = () => {
  const [posts, setPost] = useState([]);
  useEffect(() => {
    let url = "http://localhost:5000/post";
    fetch(url)
      .then((res) => res.json())
      .then((data) => setPost(data.data))
      .catch((err) => console.error(err));
  }, []);
  console.log(posts);
  return (
    <div>
      <AddPostForm posts={posts} setPost={setPost} />

      <div>
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
