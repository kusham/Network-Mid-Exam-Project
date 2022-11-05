import React from 'react'
import Logo from "../../../Resources/Images/logo.png";
import './LogoSearchStyle.css'
import { UilSearch } from '@iconscout/react-unicons'


const LogoSearch = () => {
  return (
    <div className="LogoSearch">
      <img src={Logo} alt="" />
      <div className="Search">
          <input type="text" placeholder="#Explore"/>
          <div className="s-icon">
                <UilSearch/>
          </div>

      </div>
    </div>
  )
}

export default LogoSearch