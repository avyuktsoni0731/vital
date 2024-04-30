import React, { useState, useEffect } from "react";
import { VitalLoader } from "../app/components/icons/VitalLoader";
import "../app/globals.css";
import AuthNavbar from "@/app/components/AuthNavbar";

const Prompt = () => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/prompt");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.text();
      setText(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  let newText = text;

  newText = newText.replace(/- (.*?)(?=\s*-|$)/g, "<br><li>$1</li>");
  newText = newText.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
  newText = newText.replace(/\* /g, "<br>");
  newText = newText.replace(/\d+/g, "<br>$&");

  return (
    <>
      <AuthNavbar />
      <div className="p-8">
        {isLoading ? (
          <>
            <div className="flex flex-col items-center justify-center min-h-[80vh]">
              <VitalLoader />
            </div>
          </>
        ) : (
          <p dangerouslySetInnerHTML={{ __html: newText }} className=""></p>
        )}
      </div>
    </>
  );
};

export default Prompt;
