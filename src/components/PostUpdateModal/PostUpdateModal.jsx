/* eslint-disable react/prop-types */
const PostUpdateModal = ({ post, handleUpdatePost, setUpdateText }) => {
  const { text, _id } = post;
  console.log(text, _id);

  return (
    <div>
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Your post</h3>
          <p className="py-4">
            <p>{text}</p>
            <textarea
              className="w-full border border-gray-300 p-2 mt-10 mb-2"
              rows="10"
              placeholder=" you can Write a comment for this post..."
              defaultValue={post?.text}
              onBlur={(e) => setUpdateText(e.target.value)}
            ></textarea>
          </p>
          <div className="modal-action">
            <label
              onClick={() => handleUpdatePost(post)}
              htmlFor="my-modal-6"
              className="btn"
            >
              update
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostUpdateModal;
