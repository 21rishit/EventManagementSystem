// /* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from "axios";

// Creating a user context
export const UserContext = createContext(null);

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    // Fetch user data only if not already set
    axios
      .get("auth/profile", { withCredentials: true })
      .then(({ data }) => {
        setUser(data);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      })
      .finally(() => {
        setLoading(false); // Mark loading as complete
      });
  }, []); // Runs only on component mount

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}
