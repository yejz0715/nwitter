import React from "react";
import { auth } from "../../firebase";

const Profile = () => {
  const handleLogOut = () => {
    auth.signOut();
  };
  return (
    <>
      <button onClick={handleLogOut}>logOut</button>
    </>
  );
};
export default Profile;
