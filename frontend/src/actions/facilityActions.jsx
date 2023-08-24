import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const CreateFacility = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();

  const create = async (category, title, description, price, imgUrl) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:4000/api/facility/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        category,
        title,
        description,
        price,
        imgUrl,
      }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
      console.log("error = ", error);
      return false;
    }

    if (response.ok) {
      console.log("json -> ", json);
      setIsLoading(false);
      return true;
    }
  };

  return { create, isLoading, error };
};

const GetAllFacilityBookings = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { user } = useAuthContext();

  const getBookings = async () => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:4000/api/other-bookings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
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

  return { getBookings, isLoading, error };
};

export { CreateFacility, GetAllFacilityBookings };
