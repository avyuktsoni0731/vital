
function FirstPage() {


    return(
        <>
        <div className="w-[100%] h-[90vh] flex flex-col justify-center items-center ">
            <h1 className="text-6xl font-bold mb-[100px]">Smart Health Recomendations.</h1>
            <a
                href={`/form/age`}
                className="bg-blue-500 text-white px-8 py-4 rounded-lg text-xl shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-4">
                Start
            </a>
        </div>
        </>
    )
};

export default FirstPage;