import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const GetProfile = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();

  const getProfileInfo = async () => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:4000/api/users/profile", {
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

  return { getProfileInfo, isLoading, error };
};

const UpdateProfile = () => {
  const [updateError, setUpdateError] = useState(null);
  const [updating, setUpdating] = useState(null);
  const { user } = useAuthContext();

  const update = async (updatedUser) => {
    setUpdating(true);
    setUpdateError(null);

    const { nidNumber, phoneNumber, bankName, accountNumber, bkashNumber } =
      updatedUser;

    const response = await fetch("http://localhost:4000/api/users/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        nidNumber,
        phoneNumber,
        bankName,
        accountNumber,
        bkashNumber,
      }),
    });

    const json = await response.json();

    if (!response.ok) {
      setUpdating(false);
      setUpdateError(json.error);
      console.log("error = ", updateError);
      return false;
    }

    if (response.ok) {
      console.log("json -> ", json);
      setUpdating(false);
      return true;
    }
  };

  return { update, updating, updateError };
};

export { GetProfile, UpdateProfile };
