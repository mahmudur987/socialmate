/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import { useState } from "react";
import { authContext } from "../../Context/UserContext";
import { toast } from "react-hot-toast";
import { AiFillLike } from "react-icons/ai";

const DisplayPost = ({ post }) => {
  const { user } = useContext(authContext);
  const { postUserName, text, _id, date: postDate } = post;
  const [Comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState([]);
  const [islike, setIsLike] = useState(false);
  const date = new Date().toLocaleString();
  useEffect(() => {
    let url = `https://socialmate-server-6cldfhaow-mahmudur987.vercel.app/post/${_id}`;
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

  useEffect(() => {
    let userIsLiked = likes.find((x) => x.likedUserName === user?.name);
    if (userIsLiked) {
      setIsLike(true);
    }
  }, [likes]);

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
      const response = await fetch(
        `https://socialmate-server-6cldfhaow-mahmudur987.vercel.app/like/${_id}`,
        {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      console.log("Success:", result);
      if (result.status === "ok") {
        toast.success(result.data);
        setIsLike(true);
      } else {
        toast.error(result.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
      const response = await fetch(
        `https://socialmate-server-6cldfhaow-mahmudur987.vercel.app/comment/${_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

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
    <div className="max-w-4xl w-full mx-auto bg-white p-4 rounded  mb-8 border border-green-500 shadow-xl">
      <h2 className="text-lg font-semibold mb-2">
        <span className="text-red-500 text-3xl uppercase ">{postUserName}</span>
        <span className="ml-5">
          {" "}
          shared the posted on{" "}
          <span className="text-sm text-red-500">{postDate}</span>
        </span>
      </h2>
      <p className="border py-5 px-1 ">{text}</p>
      <p className="text-right">
        <button
          className={`btn  btn-ghost font-bold  ${islike ? "bg-pink-300" : ""}`}
          disabled={islike}
          onClick={handleLike}
        >
          {islike ? (
            <span className="text-red-500 text-2xl">
              <AiFillLike />
            </span>
          ) : (
            <span className="text-green-500 text-2xl">
              <AiFillLike />
            </span>
          )}
        </button>
      </p>
      {Comments.length > 0 && (
        <div className=" border my-3">
          <h3 className="text-lg font-semibold py-1 ">
            All Comments for this post
          </h3>
          {Comments?.map((comment, index) => (
            <p key={index} className="text-gray-700 my-2 text-xl">
              {comment.comment}{" "}
              <span className="text-sm text-red-500">
                comment by {comment.commentUserName}
              </span>
            </p>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmitComment}>
        <textarea
          className="w-full border border-gray-300 p-2 m-1"
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
