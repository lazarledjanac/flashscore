import React from "react";
import { AiFillStar } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";

const Teams = () => {
  return (
    <div className="leagues">
      <AiFillStar /> <text>My Teams</text>
      <hr />
      <div>
        <p>
          <AiOutlinePlus /> Add New Team
        </p>
      </div>
    </div>
  );
};

export default Teams;
