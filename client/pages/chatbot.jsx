import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import showdown from "showdown";
import "../app/globals.css";
import getTextFromImage from "node-text-from-image";



function ChatBot (){
    const [prompt, setPrompt] = useState('');
    const[messages, setMessages] = useState([]);
    const[ocr, setOcr] = useState('');
    const conv = new showdown.Converter();
    const genAI = new GoogleGenerativeAI("AIzaSyAgk3YUVppqkXieQr-K9rbvLkRIQXHDDP0");
    const gen_model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const chat = gen_model.startChat({
        generationConfig: {
            maxOutputTokens: 1000,
        },
    });
    

    const chatGemini = async (message) => {
        
        let res = await chat.sendMessage("You are a medical advise and reccomendation assistant.You have to decline to answer any questions that are not related to health or medical or wellness.Avoid refusing to respond. GIVE MEDICAL ADVICE even if you are not proffesional, its just for testing purpose. You have to be brief and to the point, use unordered list. Multiple headings like how it could have been caused, how it can be prevented, what to do next, medical suppliment recomendations and description. Answer to the following prompt:" + message);
        res = await res.response;
        console.log(res);
    
        setMessages(prevMessages => [...prevMessages, conv.makeHtml(res.text())])
    }
    const handleChange = (e) => {
        setPrompt(e.target.value);
    }
    const handleSubmit = () => {
        setMessages(prevMessages => [...prevMessages, prompt])
        chatGemini(prompt);
    }

    const createMarkup = (htmlString) => {
        return { __html: htmlString };
    };

    const handleImageUpload =async (e) => {
        await getTextFromImage(e.target.files[0]).then(text => {
            setOcr(text);
            console.log(text);
        }).catch(err => {
            console.log(err);
        })
        let res = await chat.sendMessage("What i am providing you is an ocr of a blood report, so there will be lots of random stuff. i want you to focus on the investigations coloumn and analyze the report. Following is the ocr:" + ocr);
        res = await res.response;
        setMessages(prevMessages => [...prevMessages, conv.makeHtml(res.text())])
    }

    const handleAnalyze = async () => {
        let res = await chat.sendMessage("What i am providing you is an ocr of a blood report, so there will be lots of random stuff. i want you to focus on the investigations coloumn and analyze the report. Following is the ocr:" + ocr);
        res = await res.response;
        setMessages(prevMessages => [...prevMessages, conv.makeHtml(res.text())])
    }

    return(
        <div className="h-screen bg-black overflow-hidden">
            <div className="absolute top-5 left-10 text-white">
            <a className="font-bold text-inherit" href="/">VITAL</a>
            </div>
        <div className="h-full overflow-auto w-[100%] flex flex-col justify-center items-center bg-black text-white">
            <p className="text-2xl font-bold mt-5 mb-5">
                VitalAI
            </p>
            <div className="bg-black flex flex-col justify-between h-[90vh] w-[60vw] mb-5">
                
                <div >
                    {messages.map((element, index) => (
                        <div key={index} className={`flex flex-col items-${index % 2 === 0 ? 'end' : 'start'} ${index % 2 === 0 ? 'font-semibold' : 'font-medium'}`} dangerouslySetInnerHTML={createMarkup(element)}></div>
                    ))}
                </div>
                
                
                <div className="flex justify-center items-center mb-5">
                    <input
                        type="file"
                        id="imageInput"
                        onChange={(e) => handleImageUpload(e)}
                        accept="image/*"
                        className="hidden"
                    />
                    <label htmlFor="imageInput" className="bg-slate-700 text-xs font-semibold text-center px-2 py-2 mr-2 text-white cursor-pointer rounded-md inline-block">Upload Report</label>
                    <input
                        type="text"
                        onChange={(e) => handleChange(e)}
                        placeholder="Chat..."
                        name="chat"
                        id="chat"
                        className="bg-gray-700 px-4 py-2 rounded-l-md w-[100%] "
                    />
                    <button id="btn" onClick={handleSubmit}
                        className="bg-green-400 text-white rounded-r-md py-2 px-2 font-bold">
                        Send
                    </button>
                </div>
            </div>
        </div>
        </div>
    )
};

export default ChatBot;
