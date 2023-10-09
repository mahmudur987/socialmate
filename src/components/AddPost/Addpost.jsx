import { useContext, useState } from "react";
import { authContext } from "../../Context/UserContext";
import { toast } from "react-hot-toast";
// eslint-disable-next-line react/prop-types
const AddPostForm = ({ posts, setPost }) => {
  const [content, setContent] = useState("");
  const date = new Date().toLocaleString();
  const { user } = useContext(authContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      return toast.error("please logIn first");
    }
    if (!content) {
      return toast.success("write something first");
    }

    try {
      const post = {
        postUserName: user?.name,
        postUserEmail: user?.email,
        text: content,
        likes: [],
        comments: [],
        date,
      };
      const response = await fetch(
        "https://socialmate-server-6cldfhaow-mahmudur987.vercel.app/post",
        {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(post),
        }
      );
      const result = await response.json();
      if (result.status === "ok") {
        toast.success(result.message);
        setPost([...posts, result?.data]);
      } else {
        toast.error(result.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setContent("");
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">
        {" "}
        Whats on your mind? share with your friend
      </h2>
      <form onSubmit={handleSubmit} className="text-right">
        <textarea
          className="w-full border border-gray-300 p-2 mb-2"
          rows="4"
          placeholder="Write something..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default AddPostForm;
