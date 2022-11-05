import React, { useState } from "react";
import "./PostStyle.css";
import { useDispatch, useSelector } from "react-redux";
import ChatIcon from "@mui/icons-material/Chat";
import ReplyIcon from "@mui/icons-material/Reply";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { commentPost } from "../../../../Actions/PostActions";
import { likePost } from "../../../../API/PostAPI";

const Post = ({ post }) => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const user = useSelector((state) => state.authReducers.authData);
  const [likes, setLikes] = useState(post.likes.length);
  const [liked, setLiked] = useState(post.likes.includes(user._id));
  const [comments, setComments] = useState(false);
  const [commentInput, setCommentsInput] = useState("");

  const dispatch = useDispatch();
  // console.log(post);
  const handleLike = () => {
    likePost(post._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  const handleComment = () => {
    dispatch(
      commentPost({ id: post._id, userId: user._id, comment: commentInput })
    );
    post.comments.push(commentInput);
    setComments((prev) => !prev);
    setCommentsInput("");
  };

  return (
    <div className="Post">
      {post.image ? (
        <img src={post.image ? serverPublic + post.image : ""} alt="" />
      ) : (
        <span>{post.desc}</span>
      )}
      <div className="postReact">
        <div className="like-icon" onClick={handleLike}>
          {liked ? (
            <FavoriteIcon className="liked" />
          ) : (
            <FavoriteBorderIcon className="not-liked" />
          )}
        </div>
        <div
          className="comment-icon"
          onClick={() => setComments((prev) => !prev)}
        >
          <ChatIcon />
        </div>
        <div className="share-icon">
          <ReplyIcon />
        </div>
      </div>
      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>

      <div className="detail">
        <span>
          <b>by {post.userName}</b>
        </span>
        {post.image && <span>{post.desc}</span>}
      </div>
      {comments && (
        <div className="comment-section">
          <input
            type="text"
            placeholder="Add your comments..."
            value={commentInput}
            onChange={(e) => setCommentsInput(e.target.value)}
          />
          <button onClick={handleComment} className="button">
            Comment
          </button>
        </div>
      )}

      <div className="people-comment">
        {post?.comments?.map((comment) => (
          <div className="comment">
            <span>{comment.comment}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
