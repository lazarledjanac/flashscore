import React from "react";
import { AiFillStar, AiOutlinePlus } from "react-icons/ai";

const Teams = () => {
  return (
    <div className="leagues">
      <p>
        <AiFillStar /> My Teams
      </p>
      <hr />
      <center>
        <AiOutlinePlus /> Add New Team
      </center>
    </div>
  );
};

export default Teams;
