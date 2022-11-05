import React, { useState, useRef } from "react";
import "./PostShareStyle.css";
import defaultProfile from "../../../Resources/Images/defaultProfile.png";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../../../Actions/AuthActions";
import { uploadPost } from "../../../Actions/PostActions";

const PostShare = () => {
  const [textInput, setTextInput] = useState("");
  const [imageInput, setImageInput] = useState("");
  const imageRef = useRef();
  const user = useSelector((state) => state.authReducers.authData);
  const loading = useSelector((state) => state.postReducer.uploading);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const dispatch = useDispatch();
  const handleShare = () => {
    console.log(textInput);
    console.log(imageInput);

    const newPost = {
      userId: user._id,
      desc: textInput,
    };
    if (imageInput) {
      const data = new FormData();
      const fileName = Date.now() + imageInput.name;
      data.append("name", fileName);
      data.append("file", imageInput);
      newPost.image = fileName;
      console.log(newPost);
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(uploadPost(newPost));
    reset();
  };

  const reset = () => {
    setImageInput("");
    setTextInput("");
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImageInput(img);
    }
  };
  return (
    <div className="PostShare">
      <div className="PostShare-Profile">
        <img
          src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : defaultProfile
          }
          alt="Profile"
        />
        <input
          type="text"
          placeholder="What's happening?"
          required
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        />
      </div>
      <div className="postOptions">
        <div
          className="option"
          style={{ color: "var(--photo)" }}
          onClick={() => imageRef.current.click()}
        >
          <UilScenery />
          Photo
        </div>
        <div className="option" style={{ color: "var(--video)" }}>
          <UilPlayCircle />
          Video
        </div>
        <div className="option" style={{ color: "var(--location)" }}>
          <UilLocationPoint />
          Location
        </div>
        <div className="option" style={{ color: "var(--shedule)" }}>
          <UilSchedule />
          Shedule
        </div>
        <button
          className="button ps-button"
          onClick={handleShare}
          disabled={loading}
        >
          {loading ? "Uploading": "Share"}
        </button>
        <div style={{ display: "none" }}>
          <input type="file" ref={imageRef} onChange={handleImageChange} />
        </div>
      </div>
      {
        imageInput && (
      <div className="previewImage">
        <UilTimes
         onClick={() => setImageInput('')}
        />
        <img src={URL.createObjectURL(imageInput)} alt="preview" />
      </div>
        )
      }
    </div>
  );
};

export default PostShare;
