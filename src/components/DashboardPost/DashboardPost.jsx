import { useEffect, useState } from "react";
import PostUpdateModal from "../PostUpdateModal/PostUpdateModal";
import { toast } from "react-hot-toast";

// eslint-disable-next-line react/prop-types
const DashboardPost = ({ post }) => {
  // eslint-disable-next-line react/prop-types
  const { postUserName, text, _id, date: postDate } = post;

  const [updatetext, setUpdateText] = useState("");
  const date = new Date().toLocaleString();
  const [Comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  useEffect(() => {
    let url = `http://localhost:5000/post/${_id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          //   console.log(data.data);
          setLikes(data.data.likes);
          setComments(data.data.comments);
        }
      });
  }, [setLikes, setComments, _id]);

  const handleUpdatePost = async (id) => {
    const data = { updatetext, date };
    if (updatetext === text) {
      return toast.error("nothing to update");
    }

    console.log(data, id);

    // try {
    //   const response = await fetch(`http://localhost:5000/updatepost/${id}`, {
    //     method: "PATCH", // or 'PUT'
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   });

    //   const result = await response.json();
    //   console.log("Success:", result);
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-4 rounded shadow mb-8 border border-green-500">
      <h2 className="text-lg font-semibold mb-2">
        <span className="text-red-500 text-3xl uppercase ">{postUserName}</span>
        <span className="ml-5">
          {" "}
          shared the posted on{" "}
          <span className="text-sm text-red-500">{postDate}</span>
        </span>
      </h2>
      <p className="text-gray-700 mb-4 border p-2 ">{text}</p>

      <div className="mb-4 flex justify-between">
        <div>
          {" "}
          <h3 className="text-lg font-semibold mb-2">All Comments :</h3>
          {Comments.length === 0 && (
            <p className="text-gray-700 my-6 text-xl">
              No comments for this post
            </p>
          )}
          {Comments.map((comment, index) => (
            <p key={index} className="text-gray-700 my-6 text-xl">
              {index + 1}. {comment?.comment}{" "}
              <span className="text-sm text-red-500">
                comment by {comment?.commentUserName}
              </span>
            </p>
          ))}
        </div>
        <div>total Likes : {likes.length}</div>
      </div>

      <div className="w-full flex justify-between my-5 p-3">
        <label className="btn btn-sm bg-green-500" htmlFor="my-modal-6">
          Update Post
        </label>

        <button className="btn btn-sm bg-red-500">Delete Post </button>
      </div>
      <PostUpdateModal
        post={post}
        handleUpdatePost={handleUpdatePost}
        setUpdateText={setUpdateText}
      />
    </div>
  );
};

export default DashboardPost;
