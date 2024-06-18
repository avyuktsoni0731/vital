'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function AllergiesPage() {
  const router = useRouter();
//   const { gender } = router.query;
  const [allergies, setAllergies] = useState("");
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setAllergies(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://vitalwebapp.onrender.com/form/allergies",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ allergies }),
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
    <div className="h-[90vh] flex flex-col items-center justify-center ">
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
          className="bg-custom-gradient font-semibold font-space text-black mt-10 px-4 py-3 rounded-lg sm:text-xl text-md shadow-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AllergiesPage;
