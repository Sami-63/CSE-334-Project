import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

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

const FilterRooms = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const filter = async (
    checkinDate,
    checkoutdate,
    noOfBedrooms,
    noOfPeople,
    acRequired
  ) => {
    setIsLoading(true);
    setError(null);

    console.log("[filter function]  checkinDate -> ", checkinDate);
    console.log("[filter function]  checkOutdate -> ", checkoutdate);
    console.log("[filter function]  noOfBedrooms -> ", noOfBedrooms);
    console.log("[filter function]  noOfPeople -> ", noOfPeople);
    console.log("[filter function]  acRequired -> ", acRequired);

    const response = await fetch(
      "http://localhost:4000/api/bookings/filter-rooms",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          checkinDate: checkinDate,
          checkoutdate: checkoutdate,
          noOfBedrooms: noOfBedrooms,
          noOfPeople: noOfPeople,
          acRequired: acRequired,
        }),
      }
    );

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

  return { filter, isLoading, error };
};

const CheckBooking = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const checkBooking = async (id, checkinDate, checkoutdate) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      "http://localhost:4000/api/bookings/check-booking",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          checkinDate,
          checkoutdate,
        }),
      }
    );

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
      return json.response;
    }
  };

  return { checkBooking, isLoading, error };
};

const CreateRoom = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();

  const create = async (
    title,
    description,
    price,
    personCount,
    bedroomCount,
    acCount,
    imgUrl
  ) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:4000/api/rooms/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        title,
        description,
        price,
        personCount,
        bedroomCount,
        acCount,
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

export { GetAllRooms, GetRoom, FilterRooms, CheckBooking, CreateRoom };
