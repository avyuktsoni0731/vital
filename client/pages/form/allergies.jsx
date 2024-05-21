import React, { useState } from "react";
import { useRouter } from "next/router";
import "../../app/globals.css";
import "./static/form.css";

function AllergiesPage() {
  const router = useRouter();
  const { gender } = router.query;
  const [allergies, setAllergies] = useState("");
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setAllergies(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://vitalwebapp.onrender.com//form/allergies",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ gender, allergies }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to submit allergies");
      }
      // Redirect back to the gender selection page
      router.push("/form/problems");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl mb-8">Enter Your Allergies</h1>
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <input
          type="text"
          value={allergies}
          onChange={handleInputChange}
          placeholder="Enter your allergies (comma-separated)"
          className="w-96 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-8 py-4 rounded-lg text-xl shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AllergiesPage;
