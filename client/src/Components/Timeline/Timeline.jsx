import React from 'react'
import Posts from './Posts/Posts'
import PostShare from './PostShare/PostShare'
import './TimelineStyle.css'

const Timeline = ({location}) => {
  return (
    <div className='PostSide'>
      <PostShare />
      <Posts location = {location}/>
    </div>
  )
}

export default Timeline