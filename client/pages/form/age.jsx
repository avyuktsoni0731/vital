import React, { useState } from "react";
import { useRouter } from "next/router";
import "../../app/globals.css";
import "./static/form.css";
import AgeField from "../../app/components/AgeField";
import { Input } from "@nextui-org/react";

function AgePage() {
  const router = useRouter();
  const { gender } = router.query;
  const [age, setAge] = useState("");
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setAge(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/form/age", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gender, age }),
      });
      if (!response.ok) {
        throw new Error("Failed to submit age");
      }
      // Redirect to the gender page
      router.push(`/form/choosegender`);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl mb-8">Enter Your Age</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          {/* <input
            type="number"
            value={age}
            onChange={handleInputChange}
            placeholder="Enter your age"
            className="w-96 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          /> */}
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              value={age}
              onChange={handleInputChange}
              isRequired
              type="number"
              label="Enter your age"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-8 py-4 rounded-lg text-xl shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default AgePage;
