export async function getAIInsight(emotion, journalText) {
  // Send a POST request to our deployed backend's
  const response = await fetch(
    "https://emotracker-backend.onrender.com/api/insight",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // convert our JS object into a JSON string to send in the request body
      body: JSON.stringify({ emotion, journalText }),
    },
  );

  // if (!response.ok) {
  //   throw new Error("Backend request failed");
  // }

  if (!response.ok) {
    const errorData = await response.json();

    console.error("Backend Error:", errorData);

    throw new Error(errorData.error || "Backend request failed");
  }

  // parse the JSON response body into a real JS object
  const data = await response.json();

  return data;
}
