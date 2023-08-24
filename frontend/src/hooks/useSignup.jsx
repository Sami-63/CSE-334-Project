import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (
    name,
    email,
    password,
    nidNumber,
    phoneNumber,
    bankName,
    accountNumber,
    bkashNumber
  ) => {
    console.log("[signup] name -> ", name);
    console.log("[signup] email -> ", email);
    console.log("[signup] password -> ", password);
    console.log("[signup] nidNumber -> ", nidNumber);
    console.log("[signup] phoneNumber -> ", phoneNumber);
    console.log("[signup] bankName -> ", bankName);
    console.log("[signup] accountNumber -> ", accountNumber);
    console.log("[signup] bkashNumber -> ", bkashNumber);
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:4000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
        nidNumber,
        phoneNumber,
        bankName,
        accountNumber,
        bkashNumber,
      }),
    });
    console.log("response => ", response);
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      console.log("error => ", error);
      setIsLoading(false);
      return false;
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });

      // update loading state
      setIsLoading(false);
      return true;
    }
  };

  return { signup, isLoading, error };
};

export default useSignup;
