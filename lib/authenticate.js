import { jwtDecode } from "jwt-decode";

// Set Token in Local Storage This ensures that the token is stored in the browser's local storage, 
// allowing it to persist across page refreshes and browser sessions.
export function setToken(token) {
  localStorage.setItem("access_token", token);
}

// Get Token from Local Storage This function retrieves the token from local storage, which can be used for making authenticated API requests.
export function getToken() {
  try {
    return localStorage.getItem("access_token");
  } catch (err) {
    return null;
  }
}

// Remove Token from Local Storage This function removes the token from local storage, effectively logging the user out.
export function removeToken() {
  localStorage.removeItem("access_token");
}

// Read and Decode Token This function reads the token from local storage and decodes it to extract user information.
export function readToken() {
  const token = getToken();
  return token ? jwtDecode(token) : null;
}

// Check if User is Authenticated This function checks if a valid token exists in local storage, which indicates that the user is authenticated.
export function isAuthenticated() {
  const token = readToken();
  if (token) return true;
  return false;
}

// Function to Login
// This function sends a POST request to the login endpoint of the API with the user's credentials.
// If the login is successful, it stores the received token in local storage and returns true.
// If the login fails, it throws an error with the message received from the API.
export async function authenticateUser(userName, password) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: "POST",
    body: JSON.stringify({ userName, password }),
    headers: {
      "content-type": "application/json",
    },
  });

  const data = await res.json();

  if (res.status === 200) {
    setToken(data.token);
    return true;
  } else {
    throw new Error(data.message);
  }
}

// Function to Register
// This function sends a POST request to the register endpoint of the API with the user's registration details.
// If the registration is successful, it returns true.
// If the registration fails, it throws an error with the message received from the API.
// We do NOT call setToken() here, meaning that after registration, the user will not be automatically logged in.
export async function registerUser(userName, password, password2) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
    method: "POST",
    body: JSON.stringify({ userName, password, password2 }),
    headers: {
      "content-type": "application/json",
    },
  });

  const data = await res.json();

  if (res.status === 200) {
    // We do NOT call setToken() here per instructions
    return true;
  } else {
    throw new Error(data.message);
  }
}
