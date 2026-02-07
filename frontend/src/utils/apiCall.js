export async function apiCall(endpoint, method = "GET", data = null) {

  const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  const url = endpoint.startsWith("http") ? endpoint : `${BASE_URL}${endpoint}`;

  const token = localStorage.getItem("token");

  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { 'Authorization': `Bearer ${token}` })
    }
  };

  // Attach body only for methods that send data
  if (data && ["POST", "PUT", "PATCH"].includes(method.toUpperCase())) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      let errorMessage = `HTTP Error: ${response.status}`;
      try {
        const errorData = await response.json();
        // Backend returns { message: "..." }
        if (errorData?.message) {
          errorMessage = errorData.message;
        }
      } catch (e) {
        // Response wasn't JSON, keep default status message
      }
      throw new Error(errorMessage);
    }

    // If no content (DELETE often returns 204)
    if (response.status === 204) {
      return { message: "Success" };
    }

    return await response.json();
  } catch (error) {
    console.error("API Call Failed:", error.message);
    throw error;
  }
}
