import React, { useEffect, useState } from 'react'
import "./InfoCardStyle.css";
import { UilPen } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from "../../API/AuthAPI";
import EditProfile from '../EditProfile/EditProfile';
import { logout } from '../../Actions/AuthActions';


const InfoCard = () => {
    const dispatch = useDispatch()
    const params = useParams();
    const [modalOpened, setModalOpened] = useState(false);
    const profileUserId = params.id;
    const [profileUser, setProfileUser] = useState({});

  const user  = useSelector((state) => state.authReducer.authData);
// const user =JSON.parse(sessionStorage.getItem("profile")).user;
  const handleLogOut = ()=> {
    dispatch(logout())
  }

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        console.log("fetching")
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
        console.log(profileUser)
      }
    };
    fetchProfileUser();
  }, []);

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {user._id === profileUserId ? (
          <div>
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={() => setModalOpened(true)}
            />
            <EditProfile
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              user = {user}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="info">
        {/* */}
        <span>
          <b>Status </b>
        </span>
        <span>{user.relationship}</span>
      </div>
      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>{user.livesIn}</span>
      </div>
      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>{user.worksAt}</span>
      </div>

      <button className="button logout-button" onClick={handleLogOut}>Log Out</button>
    </div>
  )
}

export default InfoCard