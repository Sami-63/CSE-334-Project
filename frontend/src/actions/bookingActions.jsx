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

export { MakeBooking };
