'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/react";

function AgePage() {
  const router = useRouter();
//   const { gender } = router.query;
  const [age, setAge] = useState("");
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setAge(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://vitalwebapp.onrender.com/form/age",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ age }),
        }
      );
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
      <div className="dark h-[90vh] w-[100%] flex flex-col items-center justify-center font-space bg-black text-white">
        <h1 className="text-4xl mb-8 font-space">Enter Your Age</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
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
            className="bg-custom-gradient font-semibold font-space text-black mt-10 px-4 py-3 rounded-lg sm:text-xl text-md shadow-md"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default AgePage;
