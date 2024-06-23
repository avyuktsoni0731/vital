import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export const useAuth = () => {
  const { data: session, status } = useSession();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      setIsSignedIn(false);

      fetch("https://vitalwebapp.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionStatus: status,
        }),
      });
    }
    if (status === "authenticated") {
      setIsSignedIn(true);
      setProfilePicture(session.user.image);
      setUserName(session.user.name);

      fetch("https://vitalwebapp.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          googleUserId: session.user.email,
          sessionStatus: status,
        }),
      });
    }
  }, [status, session]);

  const login = async () => {
    signIn("google");
  };

  const logout = async () => {
    signOut();
  };

  return {
    isSignedIn,
    profilePicture,
    userName,
    login,
    logout,
  };
};
