'use client'
import { get, ref } from "firebase/database"
import { useEffect, useState } from "react";
import { database } from "./firebase.js"
import { Navbar } from "./components/navbar/Navbar.jsx"
import { InputSection } from "./components/input/InputSection.jsx"
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Home() {
  const [dorms, setDorms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await get(ref(database, 'Dorms'));
        const dormsData = snapshot.val();

        if (dormsData) {
          const dormsArray = Object.entries(dormsData).flatMap(([dormName, dormData]) =>
            Object.entries(dormData).map(([sensorId, sensorData]) => ({
              key: `${dormName}-${sensorId}`, // Unique key for each sensor
              dormName,
              sensorId,
              timestamp: sensorData.timestamp,
              litPerMin: sensorData.litPerMin,
            }))
          );

          setDorms(dormsArray);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: dorms.map((dorm) => dorm.timestamp),
    datasets: [
      {
        label: 'Liters/min',
        data: dorms.map((dorm) => dorm.litPerMin),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <main className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto mt-24 px-12 py-4 bg-white">
        <h1 className='text-4xl font-bold text-center my-10'>Firebase Demo</h1>
        <Line data={chartData} />
      </div>
      <InputSection />
    </main>
  );
}