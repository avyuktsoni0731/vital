import { GoogleGenerativeAI } from "@google/generative-ai";
const conv = new showdown.Converter();

const key = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(key);
const gen_model = genAI.getGenerativeModel({ model: "gemini-pro" });
const chat = gen_model.startChat({
	generationConfig: {
		maxOutputTokens: 1000,
	},
});

const chatGemini = async (message) => {
	addMessage(message, "end");
	let res = await chat.sendMessage(message);
	res = await res.response;
	console.log(res);
	let html = conv.makeHtml(res.text());
	addMessage(html, "start");
}
const addMessage = (msg, direction) => {
	const messageHolder = document.getElementById("messageHolder");
	const message = document.createElement("div");
	const colour = direction !== "start" ? "blue" : "green";
	message.innerHTML = `
	<div class="flex flex-col items-${direction}">
			<div class="bg-${colour}-500 px-4 py-2 rounded-md text-white w-fit 
			max-w-4xl mb-1">${msg}</div>
		</div>
	`
	messageHolder.appendChild(message);
}

const messageInput = document.getElementById("chat");
const sendBtn = document.getElementById("btn");

sendBtn.addEventListener("click", function () {
	const message = messageInput.value;
	chatGemini(message);
	messageInput.value = "";
});
