import { useState } from "react";

const GetAllRooms = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const getRooms = async () => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:4000/api/rooms/", {
      method: "GET",
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
      console.log("error = ", error);
      return null;
    }

    if (response.ok) {
      console.log("json -> ", json);
      setIsLoading(false);
      return json;
    }
  };

  return { getRooms, isLoading, error };
};

const GetRoom = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const getRoom = async (id) => {
    console.log("id in roomAction -> ", id);

    setIsLoading(true);
    setError(null);

    const response = await fetch(`http://localhost:4000/api/rooms/${id}`, {
      method: "GET",
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
      console.log("error = ", error);
      return null;
    }

    if (response.ok) {
      console.log("json -> ", json);
      setIsLoading(false);
      return json;
    }
  };

  return { getRoom, isLoading, error };
};

export { GetAllRooms, GetRoom };
