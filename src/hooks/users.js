import { useState, useEffect } from "react";

const firebaseUrl =
  "https://flashscore-b65db-default-rtdb.europe-west1.firebasedatabase.app/";

export const useGetAllUsers = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          setData(JSON.parse(request.responseText));
        } else {
          alert("Error. Users couldn't be loaded.");
        }
      }
    };
    request.open("GET", firebaseUrl + "/users.json");
    request.send();
  }, []);

  return data;
};
