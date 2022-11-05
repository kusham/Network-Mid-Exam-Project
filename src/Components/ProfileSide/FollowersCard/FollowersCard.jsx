import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import { useSelector } from "react-redux";
import FollowersModel from "./FollowersModel/FollowersModel";
import User from "./User/User";
import { getAllUser } from "../../../API/AuthAPI";

const FollowersCard = ({ location }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [people, setPeople] = useState([]);
  const [render, setRender] = useState(false);

  const  user  = useSelector((state) => state.authReducers.authData);

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
        setPeople(data.users)
    };
    fetchPersons();
  }, [render]);
const renderPeople = people.filter((item) => item._id !== user._id);
  return (
    <div className="FollowersCard">
      <h3>People you may know</h3>

      {renderPeople.map((person, id) => (
        <User person={person} key={id} />
      ))}
      {!location ? (
        <span onClick={() => setModalOpened(true)}>Show more</span>
      ) : (
        ""
      )}

      <FollowersModel
      setRender={setRender}
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
      />
    </div>
  );
};

export default FollowersCard;
