// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";
import "../app/globals.css";
import AuthNavbar from "../app/components/AuthNavbar";

// function DashboardPage() {
//   const router = useRouter();
//   const [userQueries, setUserQueries] = useState([]);
//   const { email } = router.query;

//   useEffect(() => {
//     const fetchUserQueries = async () => {
//       try {
//         const response = await fetch(
//           `http://127.0.0.1:5000/dashboard?email=${email}`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch user queries");
//         }
//         const data = await response.json();
//         setUserQueries(data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     if (email) {
//       fetchUserQueries();
//     }
//   }, [email]);

//   return (
//     <>
//       <AuthNavbar />
//       <div className="flex flex-col items-center justify-center min-h-screen">
//         <h1 className="text-4xl mb-8">Dashboard</h1>
//         <div className="grid grid-cols-1 gap-4">
//           {userQueries.map((query, index) => (
//             <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
//               <h2 className="text-lg font-semibold mb-2">{query.prompt}</h2>
//               <p className="text-gray-600">{query.response}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default DashboardPage;

// DashboardPage.jsx
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

function DashboardPage() {
  const router = useRouter();
  const [userQueries, setUserQueries] = useState([]);

  useEffect(() => {
    const fetchUserQueries = async () => {
      try {
        const email = router.query.email;
        const response = await fetch(
          //   `http://127.0.0.1:5000/dashboard`
          `http://127.0.0.1:5000/dashboard?email=${email}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user queries");
        }
        const data = await response.json();
        setUserQueries(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (router.query.email) {
      fetchUserQueries();
    }
  }, [router.query.email]);

  return (
    <>
      <AuthNavbar />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 gap-4">
          {userQueries.map((query, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-2">{query.prompt}</h2>
              <p className="text-gray-600">{query.response}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
