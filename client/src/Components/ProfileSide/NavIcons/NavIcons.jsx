import React from 'react'
import OtherHousesIcon from '@mui/icons-material/House';
// import Home from "../../../Images/home.png";
// import Noti from "../../../Images/noti.png";
// import Comment from "../../../Images/comment.png";
import { UilComment, UilSetting, UilHome } from "@iconscout/react-unicons";
import './NavIconsStyle.css'
import { Link } from 'react-router-dom';


const NavIcons = () => {
  return (
    <div className="navIcons">
    <Link to="../home">
      <UilHome />
    </Link>
    <UilSetting />
    {/* <img src={Noti} alt="" /> */}
    <Link to="../chat">
      <UilComment />
      {/* <img src={Comment} alt="" /> */}
    </Link>
  </div>
  )
}

export default NavIcons