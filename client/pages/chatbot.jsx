import { useState, useEffect } from "react";
import showdown from "showdown";
import "../app/globals.css";
import getTextFromImage from "node-text-from-image";
import ChatNav from "../app/components/ChatNav";
import { VitalLoader } from "../app/components/icons/VitalLoader";
import Chat from "../app/components/Chat";

function ChatBot() {
  const [prompt, setPrompt] = useState("");
  const conv = new showdown.Converter();
  const [chats, setChats] = useState([]);


  const [loading, setLoading] = useState(false);
  

  const chat = async () => {
    setLoading(true);
    try {
      let res = await fetch('https://vitalwebapp.onrender.com/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: prompt })
      });

      if (!res.ok) {
        throw new Error('Network response was not ok ' + res.statusText);
      }

      let data = await res.text();
      setChats((prevChats) => [
        ...prevChats,
        <Chat key={prevChats.length + 1} isUser={false} message={conv.makeHtml(data)} loading={false} />
      ]);

    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  

  const ocrAnalyze = async (ocrText) => {
    setLoading(true);
    
    try {
      let res = await fetch('https://vitalwebapp.onrender.com/ocr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ocr_text: ocrText })
      });

      if (!res.ok) {
        throw new Error('Network response was not ok ' + res.statusText);
      }

      let data = await res.text();
      setChats((prevChats) => [
        ...prevChats,
        <Chat key={prevChats.length + 1} isUser={false} message={conv.makeHtml(data)} loading={false} />
      ]);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (prompt.trim() !== '') {
      setChats([...chats, <Chat key={chats.length} isUser={true} userPrompt={prompt} />]);
      chat(); 
      setPrompt(''); 
    }
    
  };

  const handleImageUpload = async (e) => {
    setChats([...chats, <Chat key={chats.length} isUser={true} userPrompt={'File Uploaded...'} />]);
    try {
      const text = await getTextFromImage(e.target.files[0]);
      console.log('OCR Text:', text);
      await ocrAnalyze(text); 
    } catch (err) {
      console.log(err);
    }
    
  };

  return (
  <>
    <ChatNav />
    
      <div className="h-[90vh] bg-black w-[100%] flex flex-col justify-center items-center text-white overflow-auto">
        <div id="customScrollBar" className=" flex flex-col justify-between h-[80vh] w-[100%] text-sm sm:text-md mb-5 rounded-md px-2 sm:px-[20vw] overflow-auto overflow-y-scroll">
          <div>
            {chats}
            {loading && <VitalLoader />}
          </div>
        </div>
        <div className="flex justify-center items-center bg-[#212020] px-4 py-3 mb-5 rounded-full w-[80vw] lg:w-[70vw]">
            <input
              type="file"
              id="imageInput"
              onChange={(e) => handleImageUpload(e)}
              accept="image/*"
              className="hidden"
            />

            <label
              htmlFor="imageInput"
              className=" text-xs font-semibold text-center pr-4  text-white cursor-pointer rounded-md  inline-flex items-center "
            >
              <span className="sm:inline hidden pr-4">Upload <br></br>Report</span>
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                <path fill="currentColor" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"/>
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"/>
              </svg>
            </label>
            <input
              type="text"
              value={prompt}
              onChange={(e) => handleChange(e)}
              onKeyDown={handleKeyDown}
              placeholder="Chat..."
              name="chat"
              id="chat"
              className="bg-[#212020] w-[80%] focus:outline-none"
            />
            <button
              id="btn"
              onClick={handleSubmit}
              className="py-2 px-2 "
            >
              <svg 
                className="w-5 h-5 rotate-90 rtl:-rotate-90" 
                aria-hidden="true" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="currentColor" 
                viewBox="0 0 18 20"
              >
                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"/>
              </svg>
            </button>
          </div>
      </div>
    </>
  );
}

export default ChatBot;
