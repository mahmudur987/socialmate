/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import { useState } from "react";
import { authContext } from "../../Context/UserContext";
import { toast } from "react-hot-toast";

const DisplayPost = ({ post }) => {
  const { user } = useContext(authContext);
  const { postUserName, text, _id, date: postDate } = post;
  const [Comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState([]);
  const date = new Date().toLocaleString();
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
  // handle like for user
  const handleLike = async () => {
    if (!user) {
      return toast.error("please logIn first");
    }
    const data = {
      likedUserName: user?.name,
      date,
    };
    console.log(data);
    try {
      const response = await fetch(`http://localhost:5000/like/${_id}`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Success:", result);
      if (result.status === "ok") {
        toast.success(result.data);
      } else {
        toast.error(result.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const userIsLiked = likes.find((x) => x.likedUserName === user.name);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!user) {
      return toast.error("please logIn first");
    }
    if (!newComment) {
      return toast.error("please write something");
    }
    const data = {
      commentUserName: user?.name,
      comment: newComment,
      date,
    };
    console.log(data);
    try {
      const response = await fetch(`http://localhost:5000/comment/${_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Success:", result);
      if (result.status === "ok") {
        setComments([...Comments, data]);
        setNewComment("");
        toast.success(result.data);
      } else {
        toast.error(result.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
      <p className="text-right">
        <button
          className={`btn btn-sm btn-ghost font-bold  ${
            userIsLiked ? "bg-pink-300" : ""
          }`}
          onClick={handleLike}
        >
          Like
        </button>
      </p>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">
          All Comments for this post
        </h3>
        {Comments.map((comment, index) => (
          <p key={index} className="text-gray-700 my-6 text-xl">
            {index + 1}. {comment.comment}{" "}
            <span className="text-sm text-red-500">
              comment by {comment.commentUserName}
            </span>
          </p>
        ))}
      </div>
      <form onSubmit={handleSubmitComment}>
        <textarea
          className="w-full border border-gray-300 p-2 mt-10 mb-2"
          rows="2"
          placeholder=" you can Write a comment for this post..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <p className="flex justify-between">
          <button className="btn btn-sm  font-bold bg-green-500 " type="submit">
            Post Comment
          </button>
        </p>
      </form>
    </div>
  );
};

export default DisplayPost;
