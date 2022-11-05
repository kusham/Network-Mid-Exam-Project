import React from "react";
import DCover from "../../../Resources/Images/defaultCover.jpg";
import ProfileImg from "../../../Resources/Images/defaultProfile.png";
import "./ProfileCardStyle.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfileCard = ({ location }) => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const  {user}  = useSelector((state) => state.authReducers.authData);
  const  posts  = useSelector((state) => state.postReducer.posts);

  const numberOfPosts = posts.filter((post)=> post.userId === user._id).length;

  
  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
      <img src={
            user.coverPicture
              ? serverPublic + user.coverPicture
              : DCover
          } alt="CoverImage" />
        <img
          src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : ProfileImg
          }
          alt="ProfileImage"
        />
      </div>
      <div className="ProfileName">
        <span>{user?.firstName + " " + user?.lastName}</span>
        <span> 'Write about yourself'</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user?.followers.length}</span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user?.following.length}</span>
            <span>Following</span>
          </div>

          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{numberOfPosts}</span>
                <span>Posts</span>
              </div>{" "}
            </>
          )}
        </div>
        <hr />
      </div>

      {location === "profilePage" ? (
        ""
      ) : (
        <span>
          <Link
            to={`/profile/${user._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
