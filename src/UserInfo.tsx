import React, { useState } from "react";
import "./App.css";
import { userInfo } from "./Interfaces";

interface userInfoProps {
  user: userInfo;
}
const UserInfo: React.FC<userInfoProps> = ({ user }) => {
  const [toggleShowInfo, setToggleShowInfo] = useState<boolean>(false);
  return (
    <div
      className="user-info-wrapper"
      onClick={() => setToggleShowInfo((prev) => !prev)}>
      <span className="user-name">{user.name}</span>
      {toggleShowInfo && (
        <div className="additional-info">
          {`Street: ${user.address.street}`}
          <br></br>
          {`Suite: ${user.address.suite}`}
          <br></br>
          {`City: ${user.address.city}`}
          <br></br>
          {`Zipcode: ${user.address.zipcode}`}
        </div>
      )}
    </div>
  );
};

export default UserInfo;
