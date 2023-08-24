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

const GetFacility = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const getFacility = async (id) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`http://localhost:4000/api/facility/${id}`, {
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

  return { getFacility, isLoading, error };
};

const FilterFacility = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const filter = async (checkinDate, checkoutdate) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      `http://localhost:4000/api/other-bookings/filter-rooms`,
      {
        method: "POST",
        body: {
          checkinDate,
          checkoutdate,
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

  return { filter, isLoading, error };
};

const CheckFacilityBooking = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const check = async (id, checkinDate, checkoutdate) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      `http://localhost:4000/api/other-bookings/check-booking`,
      {
        method: "POST",
        body: {
          id,
          checkinDate,
          checkoutdate,
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
      return json.response;
    }
  };

  return { check, isLoading, error };
};

const GetAllFacility = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const getAll = async () => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`http://localhost:4000/api/facility/`, {
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

  return { getAll, isLoading, error };
};

const GetMyFacilityBookings = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { user } = useAuthContext();

  const getmyFacilityBooking = async () => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      "http://localhost:4000/api/other-bookings/myotherbookings",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
      console.log("in facility error = ", error);
      return null;
    }

    const json = await response.json();
    if (response.ok) {
      console.log("in facility json -> ", json);
      setIsLoading(false);
      return json;
    }
  };

  return { getmyFacilityBooking, isLoading, error };
};

export {
  GetAllFacilityBookings,
  GetFacility,
  FilterFacility,
  CheckFacilityBooking,
  CreateFacility,
  GetAllFacility,
  GetMyFacilityBookings,
};
