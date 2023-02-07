import React from "react";
import { useGetSquadByTeamIdQuery } from "../services/footballApi";
import { useNavigate } from "react-router-dom";

const Squad = ({ teamId }) => {
  const navigate = useNavigate();
  const squad = useGetSquadByTeamIdQuery(teamId);
  console.log(squad);

  let array = [];
  for (let i = 0; i < squad?.length; i++) array[i] = i;
  return (
    <div className="squad">
      <table>
        <tr>
          <th></th>
          <th>Number</th>
          <th>Name</th>
          <th> Position</th>
        </tr>
        <tr>
          <th></th>
          <th>Number</th>
          <th>Name</th>
          <th>Position</th>
        </tr>
        {array.map((i) => (
          <tr onClick={() => navigate(`/player/${squad[i]?.id}`)}>
            <td>
              <img src={squad[i]?.photo} alt="" />
            </td>
            <td>{squad[i]?.number}</td>
            <td>{squad[i]?.name}</td>
            <td>({squad[i]?.position})</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Squad;
