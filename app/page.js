'use client'
import {get, ref} from "firebase/database"
import { useDebugValue, useEffect, useState } from "react";
import {database} from "./firebase.js"
import {Navbar} from "./components/navbar/Navbar.jsx"
import {InputSection} from "./components/input/InputSection.jsx"

export default function Home() {
  const [dorms, setDorms] = useState([]);

  useEffect(() => {
    const dormsRef = ref(database, 'UsersData');
    get(dormsRef).then((snapshot) => {
      if (snapshot.exists()) {
        const dormsArray = Object.entries(snapshot.val()).map(([id, data]) => ({
          id,
          ...data,
        }));
        setDorms(dormsArray);
        console.log(dormsArray)
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
        console.error(error);
    });
  }, []);

  return (
    <main className="flex flex-col min-h-screen bg-white">

      <Navbar />
      
      <div className="container mx-auto mt-24 px-12 py-4 bg-white">
        <h1 className='text-4x1 font-bold text-center my-10'>Firebase Demo</h1>
        <div className="grid grid-cols-3 gap-4">
          {dorms.map((dorm) => (
            <div key={dorm.id} className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-2x1 text-gray-900">Dorm: {dorm.Name}</h2>
              <p className="text-gray-600">Liters/min: {dorm.litPerMin}</p>
              <p className="text-gray-600">Timestamp: {dorm.timestamp}</p>
            </div>
          ))}
        </div>
      </div>

      <InputSection />
      
    </main>
  );
}
