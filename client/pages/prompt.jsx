import React, { useState, useEffect } from "react";
import { Montserrat } from "next/font/google";
import "../app/globals.css";
import AuthNavbar from "@/app/components/AuthNavbar";

const monts = Montserrat({ subsets: ["latin"] });

const Prompt = () => {
  const [text, setText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/prompt");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.text();
      setText(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Sample text output
  let newText = text;

  // Replace text between ** with bold text and add newline before **
  newText = newText.replace(/- (.*?)(?=\s*-|$)/g, "<br><li>$1</li>");
  newText = newText.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
  newText = newText.replace(/\* /g, "<br>");
  newText = newText.replace(/\d+/g, "<br>$&");

  return (
    <>
      <AuthNavbar />
      <div>
        <p dangerouslySetInnerHTML={{ __html: newText }} className=""></p>
      </div>
    </>
  );
};

export default Prompt;
