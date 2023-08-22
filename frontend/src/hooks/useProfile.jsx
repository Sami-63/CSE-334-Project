import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const useProfile = () => {
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

export default useProfile;
