import React, { useState } from 'react'
import LeftSide from '../../Components/LeftSide/LeftSide'
import ProfileRight from '../../Components/ProfileRight/ProfileRight'
import ProfileCard from '../../Components/ProfileSide/ProfileCard/ProfileCard'
import Timeline from '../../Components/Timeline/Timeline'
import './ProfileStyle.css'
const Profile = () => {
  // const [render, setRender] = useState(false);
  return (
    <div className='Profile'>
         <LeftSide />
        <div className="Profile-center"> 
            <ProfileCard location="profilePage"/>
            <Timeline location="profilePage"/>
         </div>
        <ProfileRight /> 
    </div>
  )
}

export default Profile