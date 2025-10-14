import { jwtDecode } from "jwt-decode";

export const getAuthToken = () => {
  const token = localStorage.getItem("accessToken");
  try {
    if (token) {
      const decoded = jwtDecode(token);
      const expirationTime = decoded.exp ? decoded.exp * 1000 : null; // Convert to milliseconds
      if (!expirationTime) {
        localStorage.removeItem("accessToken");
        return null;
      }
      const isExpired = Date.now() >= expirationTime;
      if (isExpired) {
        localStorage.removeItem("accessToken");
        return null;
      }
      return token;
    }
    return null;
  } catch (error) {
    console.error("Invalid token format", error);
    localStorage.removeItem("accessToken");
    return null;
  }
};

export const setAuthToken = (token: string) => {
  localStorage.setItem("accessToken", token);
};

export const removeAuthToken = () => {
  localStorage.removeItem("accessToken");
};
