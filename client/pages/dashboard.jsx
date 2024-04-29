import React, { useState, useEffect } from "react";
import "../app/globals.css";
import AuthNavbar from "../app/components/AuthNavbar";
import { useRouter } from "next/router";

function DashboardPage() {
  const [promptsAndResponses, setPromptsAndResponses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://127.0.0.1:5000/dashboard");
      const data = await response.json();
      setPromptsAndResponses(data);
    };
    fetchData();
  }, []);

  function formattedResponse(response) {
    // Replace single asterisks with bullet points
    let formattedResponse = response.replace(/\*/g, "•");

    // Wrap text between double asterisks with bold HTML tags
    formattedResponse = formattedResponse.replace(
      /\*\*(.*?)\*\*/g,
      "<b>$1</b>"
    );

    // Replace newline characters with HTML line breaks
    formattedResponse = formattedResponse.replace(/\n/g, "<br>");
    // let formattedResponse = response;

    // // Replace text between ** with bold text and add newline before **
    // formattedResponse = formattedResponse.replace(
    //   /- (.*?)(?=\s*-|$)/g,
    //   "<br><li>$1</li>"
    // );
    // formattedResponse = formattedResponse.replace(
    //   /\*\*(.*?)\*\*/g,
    //   "<b>$1</b>"
    // );
    // formattedResponse = formattedResponse.replace(/\* /g, "<br>");
    // formattedResponse = formattedResponse.replace(/\d+/g, "<br>$&");

    return <div dangerouslySetInnerHTML={{ __html: formattedResponse }} />;
  }

  return (
    <>
      <AuthNavbar />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 gap-4">
          {promptsAndResponses.map((item, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-2">
                Prompt: {item.prompt}
              </h2>
              <p className="text-gray-600">
                Response: {formattedResponse(item.response)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
