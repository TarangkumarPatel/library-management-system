import { getToken } from "./authenticate";

// Helper function to handle the fetch logic and reduce repetition
async function sendRequest(url, method) {
  const res = await fetch(url, {
    method: method,
    headers: {
      Authorization: `JWT ${getToken()}`,
      "Content-Type": "application/json",
    },
  });

  if (res.status === 200) {
    return await res.json();
  } else {
    return [];
  }
}

export async function addToFavourites(id) {
  return await sendRequest(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, "PUT");
}

export async function removeFromFavourites(id) {
  return await sendRequest(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, "DELETE");
}

export async function getFavourites() {
  return await sendRequest(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, "GET");
}
