'use client'
import {get, ref} from "firebase/database"
import { useDebugValue, useEffect, useState } from "react";
import {database} from "./firebase.js"
import Chart from 'chart.js/auto';


export default function Home() {
  const [dorms, setDorms] = useState([]);

  // useEffect(() => {
  //   const dormsRef = ref(database, 'Dorms');
  //   get(dormsRef).then((snapshot) => {
  //     if (snapshot.exists()) {
  //       const dormsArray = Object.entries(snapshot.val()).map(([id, data]) => ({
  //         id,
  //         ...data,

  //       }));
  //       setDorms(dormsArray);
  //     } else {
  //       console.log("No data available");
  //     }
  //   }).catch((error) => {
  //       console.error(error);
  //   });
  // }, []);

  useEffect(() => {
    const dormsRef = ref(database, 'Dorms');
    get(dormsRef).then((snapshot) => {
        if (snapshot.exists()) {
            const dormsArray = Object.entries(snapshot.val()).map(([id, data]) => ({
                id,
                ...data,
            }));
            setDorms(dormsArray);

            const dormNames = dormsArray.map(dorm => dorm.Name);
            const litPerMinData = dormsArray.map(dorm => dorm.litPerMin);

            const ctx = document.getElementById('myChart');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: dormNames,
                    datasets: [{
                        label: 'Liters/min',
                        data: litPerMinData,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}, []);

  return (
    <main className="container mx-auto4">
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
      <canvas id="myChart" width="400" height="400"></canvas>
    </main>
  );
}
