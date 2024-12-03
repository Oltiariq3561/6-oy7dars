import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [rate, setRate] = useState();
  const [field, setField] = useState();
  const [res, setRes] = useState();
  const API_KEY = '12280882fa-619378b92b-sntusg';

  useEffect(() => {
    axios
      .get(`https://api.fastforex.io/fetch-one?from=USD&to=EUR&api_key=${API_KEY}`)
      .then((response) => {
        if (response.status === 200) {
          setRate(response.data.result.EUR);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleClick(e) {
    e.preventDefault();
    setRes((field * rate).toFixed(2));
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <form className="bg-white p-6 rounded-lg shadow-md space-y-4 w-80">
        <input
          value={field}
          onChange={(e) => {
            setField(e.target.value);
          }}
          type="number"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter amount in USD"
        />
        <button
          onClick={handleClick}
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Convert
        </button>
      </form>

      <h1 className="mt-6 text-2xl font-bold text-gray-700">
        {res }
      </h1>
    </div>
  );
}

export default App;

// import axios from "axios";
// import React, { useState } from "react";

// function App() {
//   const [username, setUsername] = useState("");
//   const [data, setData] = useState([]);

//   function handleClick(e) {
//     e.preventDefault();
//     if (username) {
//       axios
//         .get(`https://api.github.com/users/${username}/repos`)
//         .then((response) => {
//           if (response.status === 200) {
//             setData(response.data);
//           }
//         })
//         .catch((err) => {
//           console.error("Error fetching data:", err);
//         });
//     } else {
//       alert("Please enter a GitHub username");
//     }
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
//       <form className="bg-white p-6 rounded-lg shadow-md space-y-4 w-full max-w-md">
//         <input
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           type="text"
//           className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="Enter GitHub username"
//         />
//         <button
//           onClick={handleClick}
//           className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-colors"
//         >
//           Goo
//         </button>
//       </form>

//       <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl">
//         {data.length > 0 &&
//           data.map((value) => (
//             <div
//               key={value.id}
//               className="bg-white rounded-lg shadow-lg p-4 flex flex-col"
//             >
//               <h3 className="font-semibold text-lg text-gray-800">
//                 {value.name}
//               </h3>
//               <p className="text-gray-600 text-sm mt-2">
//                 {value.description || "No description provided."}
//               </p>
//               <a
//                 href={value.html_url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="mt-auto text-blue-500 hover:underline"
//               >
//                 View Repository
//               </a>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// }

// export default App;


// import React, { useState } from "react";
// import axios from "axios";

// function App() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [books, setBooks] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const fetchBooks = () => {
//     if (!searchTerm) {
//       alert("Please enter a value!");
//       return;
//     }

//     setIsLoading(true);
//     axios
//       .get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`)
//       .then((response) => {
//         if (response.status === 200) {
//           setBooks(response.data.items || []);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching books:", error);
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
//       <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
//         <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
//           Book Library
//         </h1>
//         <div className="flex space-x-4">
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter value..."
//           />
//           <button
//             onClick={fetchBooks}
//             className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition"
//           >
//             Search
//           </button>
//         </div>
//       </div>

//       <div className="mt-6 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {isLoading ? (
//           <p className="text-gray-500 text-center w-full">Loading...</p>
//         ) : (
//           books.length > 0 &&
//           books.map((value) => {
//             const info = value.volumeInfo;
//             return (
//               <div
//                 key={value.id}
//                 className="bg-white p-4 shadow-md rounded-lg flex flex-col"
//               >
//                 <img
//                   src={
//                     info.imageLinks?.thumbnail ||
//                     "https://via.placeholder.com/150"
//                   }
//                   alt={info.title}
//                   className="h-48 w-full object-cover mb-4 rounded"
//                 />
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   {info.title || "No Title Available"}
//                 </h3>
//                 <p className="text-gray-600">
//                   {info.authors ? info.authors.join(", ") : "Unknown Author"}
//                 </p>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;

