import React from 'react'
import LeftSide from '../../Components/LeftSide/LeftSide'
import ProfileSide from '../../Components/ProfileSide/ProfileSide'
import Timeline from '../../Components/Timeline/Timeline'
import './HomeStyle.css'


const Home = () => {
  return (
    <div className='Home'>
        <LeftSide />
        <Timeline />
        <ProfileSide />
    </div>
  )
}

export default Home