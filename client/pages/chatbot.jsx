import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import showdown from "showdown";

function ChatBot() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const conv = new showdown.Converter();
  const genAI = new GoogleGenerativeAI(
    "AIzaSyAgk3YUVppqkXieQr-K9rbvLkRIQXHDDP0"
  );
  const gen_model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const chat = gen_model.startChat({
    generationConfig: {
      maxOutputTokens: 1000,
    },
  });

  const chatGemini = async (message) => {
    let res = await chat.sendMessage(message);
    res = await res.response;
    console.log(res);

    setMessages((prevMessages) => [...prevMessages, res.text()]);
  };
  const handleChange = (e) => {
    setPrompt(e.target.value);
  };
  const handleSubmit = () => {
    setMessages((prevMessages) => [...prevMessages, prompt]);
    chatGemini(prompt);
  };

  return (
    <>
      <div>
        <p className="text-2xl font-bold">Vital ChatBot</p>
        <div className="">
          <div className="">
            {messages.map((element, index) => (
              <h1 key={index}>{element}</h1>
            ))}
          </div>
        </div>

        <div>
          <input
            type="text"
            onChange={(e) => handleChange(e)}
            placeholder="Chat..."
            name="chat"
            id="chat"
          />
          <button id="btn" onClick={handleSubmit}>
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default ChatBot;
