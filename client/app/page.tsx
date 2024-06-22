export default function Home() {
  return (
    <>
      <div className="w-[100%] h-[90vh] flex flex-col justify-center items-center">
        <h3 className="md:text-[1.2vw] sm:text-[2vw] text-[3vw] font-normal font-space text-center leading-[1.5] tracking-wide md:px-[25vw] sm:px-[10vw] px-[2vw] text-slate-300">
          Clear all your medical doubts
        </h3>
        <h1 className="md:text-[6vw] sm:text-[8vw] text-[9vw] font-space font-bold leading-[1] tracking-widest">
          Examine the
        </h1>
        <h1 className="md:text-[6vw] sm:text-[8vw] text-[9vw] font-space font-bold leading-[1] tracking-widest">
          Potential of Vital&apos;s
        </h1>
        <h1 className="md:text-[6vw] sm:text-[8vw] text-[9vw] font-space font-bold leading-[1] tracking-widest gradient-text">
          AI Chatbot
        </h1>
        <p className="md:text-[1.2vw] sm:text-[2vw] text-[3vw] font-normal font-space text-center leading-[1.5] tracking-wide mb-[50px] mt-[50px] md:px-[25vw] sm:px-[10vw] px-[2vw] text-slate-300">
          At Vital, we believe in the power of artificial intelligence to transform healthcare. Our platform offers a suite of advanced AI tools designed to revolutionize how you screen and address your medical concerns.
        </p>
        <div className="flex items-center gap-10">
          <a
            href={`/form/age`}
            className="bg-custom-gradient font-semibold font-space text-black px-4 py-3 rounded-lg sm:text-xl text-md shadow-md"
          >
            Get Started
          </a>
        </div>
      </div>
    </>
  );
}
