import React, { useState, lazy, Suspense } from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

const LeaguesFromCountry = lazy(() => import("./LeaguesFromCountry"));

const Country = ({ country }) => {
  const [arrow, setArrow] = useState(true);
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(true);

  const clickHandler = () => {
    setArrow(!arrow);
    setShow(!show);
    setActive(!active);
  };

  return (
    <>
      <div
        className={!active ? "countries-active" : "countries"}
        onClick={() => clickHandler()}
        key={country?.code}
      >
        <center>{country?.name}</center>
        <i>
          {arrow && <TiArrowSortedDown />}
          {!arrow && <TiArrowSortedUp />}
        </i>
      </div>
      {show && (
        <Suspense>
          <LeaguesFromCountry countryName={country?.name} />
        </Suspense>
      )}
    </>
  );
};

export default Country;
