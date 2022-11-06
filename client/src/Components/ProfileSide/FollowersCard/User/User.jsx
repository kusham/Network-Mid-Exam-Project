import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unFollowUser } from "../../../../Actions/AuthActions";
import defaultProfile from "../../../../Resources/Images/defaultProfile.png";

const User = ({ person }) => {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const  user  = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();
  const [following, setFollowing] = useState(person.followers.includes(user._id));

  const handleFollow = () => {
    console.log("first")
    following
      ? dispatch(unFollowUser(person._id, user))
      : dispatch(followUser(person._id, user));
    setFollowing((prev) => !prev);
  };

  return (
    <div className="follower">
      <div>
        <img
          src={
            person.profilePicture
              ? publicFolder + person.profilePicture
              : defaultProfile
          }
          alt="profile"
          className="followerImage"
        />
        <div className="name">
          <span>{person.firstName}</span>
          <span>@{person.userName}</span>
        </div>
      </div>
      <button
        className={
          following ? "button fc-button UnfollowButton" : "button fc-button"
        }
        onClick={handleFollow}
      >
        {following ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default User;
