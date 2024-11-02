import React from "react";

const Loading = () => {
  return (
    <div
      className="flex justify-center items-center h-screen bg-[#E6E6FA] overflow-hidden" // Soft Lavender background
    >
      <div className="text-center">
        <div className="flex justify-center items-end mb-5 space-x-2">
          {/* Modern Circles with Shadow */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-500 to-yellow-400 shadow-lg animate-bounce delay-100"></div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-500 to-yellow-400 shadow-lg animate-bounce delay-200"></div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-500 to-yellow-400 shadow-lg animate-bounce delay-300"></div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-500 to-yellow-400 shadow-lg animate-bounce delay-400"></div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-500 to-yellow-400 shadow-lg animate-bounce delay-500"></div>
        </div>
        <h1 className="text-5xl font-extrabold text-gray-800 animate-fade">
          Loading...
        </h1>
        <p className="text-lg text-gray-600 mt-2 animate-fade">
          Please wait a moment
        </p>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes fade {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .animate-bounce {
          animation: bounce 0.6s infinite alternate;
        }

        .animate-fade {
          animation: fade 1s ease-in-out infinite alternate;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }

        .delay-400 {
          animation-delay: 0.4s;
        }

        .delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  );
};

export default Loading;
