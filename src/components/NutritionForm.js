import React, { useState } from "react";
import axios from "axios";

const NutritionForm = () => {
  const [dish, setDish] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult("");

    try {
      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "meta-llama/llama-4-scout-17b-16e-instruct",
          messages: [
            {
              role: "user",
              content: `Explain the nutritional value of the Indian dish: ${dish}`,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer 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",
          },
        }
      );

      const data = response.data;
      if (data.choices && data.choices.length > 0) {
        setResult(data.choices[0].message.content);
      } else {
        setResult("No data found.");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching nutritional information. Please try again later.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Indian Dish Nutrition Estimator</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={dish}
          onChange={(e) => setDish(e.target.value)}
          placeholder="Enter dish name"
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <button type="submit">Get Nutrition Info</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {result && (
        <pre style={{ background: "#f4f4f4", padding: "10px", whiteSpace: "pre-wrap" }}>
          {result}
        </pre>
      )}
    </div>
  );
};

export default NutritionForm;
