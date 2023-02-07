import React from "react";
import { useGetTransfersByTeamIdQuery } from "../services/footballApi";
import { Loader } from "../components";
import { useNavigate } from "react-router-dom";

const Transfers = ({ teamId, changeState }) => {
  const navigate = useNavigate();
  const { data: transfers, isFetching } = useGetTransfersByTeamIdQuery(teamId);
  console.log(transfers);

  let transfersIndexes = [];
  let j = 0;
  for (let i = transfers?.results - 1; i > transfers?.results - 20; i--) {
    transfersIndexes[j] = i;
    j++;
  }
  const Row = ({ index }) => {
    return (
      <tr>
        <td>{transfers?.response[index]?.transfers[0]?.date}</td>
        <td
          onClick={() =>
            navigate(`/player/${transfers?.response[index]?.player?.id}`)
          }
        >
          {transfers?.response[index]?.player?.name}
        </td>
        <td
          onClick={() => {
            navigate(
              `/teams/${transfers?.response[index]?.transfers[0]?.teams?.out?.id}`
            );
            changeState();
          }}
        >
          <img
            src={transfers?.response[index]?.transfers[0]?.teams?.out?.logo}
            alt=""
            width="20px"
            height="20px"
          />
          {transfers?.response[index]?.transfers[0]?.teams?.out?.name}
        </td>
        <td
          onClick={() => {
            navigate(
              `/teams/${transfers?.response[index]?.transfers[0]?.teams?.in?.id}`
            );
            changeState();
          }}
        >
          <img
            src={transfers?.response[index]?.transfers[0]?.teams?.in?.logo}
            alt=""
          />
          {transfers?.response[index]?.transfers[0]?.teams?.in?.name}
        </td>
      </tr>
    );
  };
  if (isFetching) return <Loader />;
  return (
    <div className="transfers">
      <table>
        <tr>
          <th>Date</th>
          <th>Player</th>
          <th>From</th>
          <th>To</th>
        </tr>
        {transfersIndexes.map((index) => (
          <Row index={index} />
        ))}
      </table>
    </div>
  );
};

export default Transfers;
