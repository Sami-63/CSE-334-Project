import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const MakeBooking = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { user } = useAuthContext();

  const bookNow = async (checkInDate, checkOutDate, id, calculatedPrice) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:4000/api/bookings/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        startDate: checkInDate,
        endDate: checkOutDate,
        roomId: id,
        paymentAmount: calculatedPrice,
      }),
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

  return { bookNow, isLoading, error };
};

const GetAllBookings = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { user } = useAuthContext();

  const getRoomBookings = async () => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:4000/api/bookings/", {
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
      return json.bookings;
    }
  };

  return { getRoomBookings, isLoading, error };
};

const GetMyBooking = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { user } = useAuthContext();

  const getmyBooking = async () => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      "http://localhost:4000/api/bookings/mybookings",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
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

  return { getmyBooking, isLoading, error };
};

const GiveRoomRating = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { user } = useAuthContext();

  const giveRoomRating = async (id, rating) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:4000/api/bookings/rating", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        id,
        rating,
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

  return { giveRoomRating, isLoading, error };
};

export { MakeBooking, GetAllBookings, GetMyBooking, GiveRoomRating };
