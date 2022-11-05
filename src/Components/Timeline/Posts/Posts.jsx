import React, { useEffect } from "react";
import Post from "./Post/Post";
import "./PostsStyle.css";
import {useSelector, useDispatch} from 'react-redux'
import { getTimelinePosts } from "../../../Actions/PostActions";

const Posts = ({location}) => {
  const loading = useSelector((state)=> state.postReducer.loading)
  let posts = useSelector((state)=> state.postReducer.posts)
  const {user} = useSelector((state)=> state.authReducers.authData)

  const dispatch = useDispatch();
  useEffect(() => {
   dispatch(getTimelinePosts(user._id))
  }, [])
  if (location === 'profilePage') {
    posts = posts.filter((post) => post.userId === user._id)
  }
  

  return (
    <div className="Posts">
      {loading
        ? "Fetching posts...."
        : posts ? ( posts.map((post, id) => {
            return <Post post={post} key={id} />;
          })): (
            <span>No post available</span>
          )}
    </div>
  )
}

export default Posts