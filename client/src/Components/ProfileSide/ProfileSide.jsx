import React from "react";
import NavIcons from "./NavIcons/NavIcons";
import FollowersCard from "./FollowersCard/FollowersCard";
import ProfileCard from "./ProfileCard/ProfileCard";
import './ProfileSideStyle.css'
const ProfileSide = () => {
  return (
    <div className="ProfileSide">
      <NavIcons />
      <ProfileCard />
      <FollowersCard />
    </div>
  );
};

export default ProfileSide;
