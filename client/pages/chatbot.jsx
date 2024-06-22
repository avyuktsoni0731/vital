import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { signIn, signOut, useSession } from "next-auth/react";
import showdown from "showdown";
import "../app/globals.css";
import { Image, User } from "@nextui-org/react";
import getTextFromImage from "node-text-from-image";

function ChatBot() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [ocr, setOcr] = useState("");
  const conv = new showdown.Converter();

  const session = useSession();

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (session.status === "unauthenticated") {
      setIsSignedIn(false);

      fetch("https://vitalwebapp.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionStatus: session.status,
        }),
      });
    }
    if (session.status === "authenticated") {
      setIsSignedIn(true);
      const profilePicture = session.data.user.image;
      const userName = session.data.user.name;
      const emailId = session.data.user.email;
      setProfilePicture(profilePicture);
      setUserName(userName);

      fetch("https://vitalwebapp.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          googleUserId: emailId,
          sessionStatus: session.status,
        }),
      });
    }
  }, [session.status]);

  const chat = async () => {
    setLoading(true);
    try {
      let res = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: {prompt} })
      });

      if (!res.ok) {
        throw new Error('Network response was not ok ' + res.statusText);
      }

      let data = await res.text();
      setMessages((prevMessages) => [...prevMessages, conv.makeHtml(data)]);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const ocrAnalyze = async (ocrText) => {
    setLoading(true);
    
    try {
      let res = await fetch('http://localhost:5000/ocr', {
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
      setMessages((prevMessages) => [...prevMessages, conv.makeHtml(data)]);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };
  const handleSubmit = () => {

    setMessages((prevMessages) => [...prevMessages, prompt]);
    chat();
    // chatGemini(prompt);
  };

  const createMarkup = (htmlString) => {
    return { __html: htmlString };
  };

  const handleImageUpload = async (e) => {
    setMessages((prevMessages) => [...prevMessages, "Analyzing the report"]);
    try {
      const text = await getTextFromImage(e.target.files[0]);
      setOcr(text);
      console.log('OCR Text:', text);
      await ocrAnalyze(text); 
    } catch (err) {
      console.log(err);
    }
    // let res = await chat.sendMessage(
    //   "What i am providing you is an ocr of a blood report, so there will be lots of random stuff. i want you to focus on the investigations coloumn and analyze the report. Following is the ocr:" +
    //     ocr
    // );
    // res = await res.response;
    // setMessages((prevMessages) => [...prevMessages, conv.makeHtml(res.text())]);
  };

  return (
    <div className="h-screen bg-black overflow-hidden">
      {/* <div className="absolute top-5 left-10 text-white">
        <a className="font-bold text-inherit" href="/">
          VITAL
        </a>
      </div> */}
      <div className="h-full overflow-auto w-[100%] flex flex-col justify-center items-center text-white ">
        <div id="customScrollBar" className=" flex flex-col justify-between h-[80vh] w-[100%] mb-5 rounded-md px-[20vw] overflow-y-scroll">
          <div>
            {messages.map((element, index) =>
              index % 2 === 0 ? (
                <div key={index} className="flex justify-end items-center gap-5">
                  <span className="font-semibold align-center text-center">
                    {element}
                  </span>
                  <Image
                    src={profilePicture}
                    className="max-w-[35px] rounded-full max-h-[35px] m-4"
                    alt="user-profile-image"
                  />
                </div>
              ) : (
                <div
                  key={index}
                  className="flex items-start justify-start gap-5"
                >
                  <span className="text-white font-bold">
                    VitalAI 
                  </span>
                  <div
                    className="flex flex-col items-start"
                    dangerouslySetInnerHTML={createMarkup(element)}
                  ></div>
                </div>
              )
            )}
          </div>
        </div>
        <div className="flex justify-center items-center bg-[#212020] px-4 py-3 rounded-full w-[50vw]">
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
              <span>Upload Report</span>
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                <path fill="currentColor" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"/>
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"/>
              </svg>
            </label>
            <input
              type="text"
              onChange={(e) => handleChange(e)}
              placeholder="Chat..."
              name="chat"
              id="chat"
              className="bg-[#212020] w-[80%]  focus:outline-none"
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
    </div>
  );
}

export default ChatBot;
