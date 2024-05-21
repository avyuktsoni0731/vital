import React from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import "../../app/globals.css";
import "./static/form.css";
import Male from "./static/male.png";
import Female from "./static/female.png";
import Others from "./static/others.png";

function App() {
  const router = useRouter();

  const handleButtonClick = async (gender) => {
    router.push(`/form/allergies`);
    try {
      const response = await axios.post(
        "https://vitalwebapp.onrender.com//form/choosegender",
        { gender }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl mb-8">Choose Gender</h1>
        <div className="flex justify-center items-center gap-4 text-2xl">
          <button
            onClick={() => handleButtonClick("male")}
            className="flex-col items-center justify-center bg-blue-500 text-white p-28 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <Image src={Male} className="mx-[30%] filter: invert w-8" />
            Male
          </button>
          <button
            onClick={() => handleButtonClick("female")}
            className="bg-pink-500 text-white p-28 rounded-lg shadow-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
          >
            <Image src={Female} className="mx-[35%] filter: invert w-8" />
            Female
          </button>
          <button
            onClick={() => handleButtonClick("others")}
            className="bg-gray-500 text-white p-28 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            <Image src={Others} className="mx-[35%] filter: invert w-6" />
            Others
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
