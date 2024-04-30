
function FirstPage() {


    return(
        <>
        <div className="w-[100%] h-[90vh] flex flex-col justify-center items-center">
            <h1 className="text-6xl font-bold ">Smart Health Recomendations.</h1>
            <h3 className="text-3xl font-medium mb-[100px]">Medical Artificial Intelligence</h3>
            <div className="flex items-center gap-10">
                <a
                    href={`/form/age`}
                    className="bg-blue-500 text-white px-8 py-4 rounded-lg text-xl shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Get Started
                </a>
                <span className="text-xl font-thin">OR</span>
                <a
                    href={`/chatbot`}
                    className="bg-gray-500 text-white px-8 py-4 rounded-lg text-xl shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
                    Ask VitalAI
                </a>
            </div>
        </div>
        </>
    )
};

export default FirstPage;