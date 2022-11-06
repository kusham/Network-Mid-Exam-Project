import React from 'react'
import InfoCard from '../InfoCard/InfoCard'
import FollowersCard from '../ProfileSide/FollowersCard/FollowersCard'
import NavIcons from '../ProfileSide/NavIcons/NavIcons'
import './ProfileRightStyle.css'
const ProfileRight = () => {
  return (
    <div className='ProfileRight'>
        <NavIcons />
        <InfoCard  />
        <FollowersCard />

    </div>
  )
}

export default ProfileRight