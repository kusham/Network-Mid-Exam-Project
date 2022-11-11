import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../../API/AuthAPI";
import defaultProfile from "../../Resources/Images/defaultProfile.png";

const Conversation = ({ chat, currentUser, onlineUser, online }) => {
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
  console.log("hi");
  useEffect(() => {
    const userId = chat.members.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        console.log(data);
        setUserData(data.user);
        dispatch({ type: "SAVE_USER", data: data.user });
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, []);
  return (
    <>
      <div className="follower conversation">
        <div>
          {online && <div className="online-dot"></div>}
          <img
            src={
              userData?.profilePicUrl ? userData.profilePicUrl : defaultProfile
            }
            alt="Profile"
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="name" style={{ fontSize: "0.8rem" }}>
            <span>
              {userData?.firstName} {userData?.lastName}
            </span>
            <span style={{ color: online ? "#51e200" : "" }}>
              {online ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default Conversation;
