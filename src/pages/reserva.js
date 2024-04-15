import React, { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Calendar from '../components/Calendario'; // Asegúrate de que Calendar esté importado si lo estás utilizando
import { useAuth } from '../context/AuthContext';  // Ajusta la ruta según la ubicación real
import Spinner from '../components/Spinner';

export default function Reserva() {
  const { reservaData } = useAuth();
  const [loading, setLoading] = useState(true);
  const [horarios, setHorarios] = useState([]);  // Estado para almacenar los horarios

  const [message, setMessage] = useState('Cargando...'); // Mensaje inicial de carga

  useEffect(() => {
      if (reservaData.especialidad && reservaData.comuna && reservaData.servicio) {
        setMessage(`Buscando tu hora con un/a ${reservaData.especialidad}, en ${reservaData.comuna} para tu ${reservaData.servicio}`);

          setTimeout(() => {
            setLoading(false);
            setMessage(`Selecciona tu hora con tu ${reservaData.especialidad}, en ${reservaData.comuna} para tu ${reservaData.servicio}`);
          }, 5000);
      }
  }, [reservaData]);

  useEffect(() => {
    const fetchHorarios = async (profesionalIds) => {
      try {
        const response = await fetch('/api/horarios', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ profesionalIds })
        });
        const data = await response.json();
        return data.horarios;
      } catch (error) {
        console.error('Error loading schedules:', error);
        return [];
      }
    };
  
    const fetchProfesionales = async () => {
      if (reservaData.especialidad && reservaData.comuna && reservaData.servicio) {
        setLoading(true);
        try {
          const response = await fetch('/api/profesionales', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              especialidad: reservaData.especialidad,
              comuna: reservaData.comuna,
              servicio: reservaData.servicio
            })
          });
          const data = await response.json();
          const profesionalIds = data.map(prof => prof.profesionalId.S);
          const horarios = await fetchHorarios(profesionalIds);
          setHorarios(horarios);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching professionals:', error);
          setLoading(false);
        }
      }
    };
  
    fetchProfesionales();
  }, [reservaData]);
  
  
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div>
      <Head>
        <title>GIR - Reserva</title>
        <meta name="description" content="GIR" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
      </Head>

      <Navbar />

      <main className="flex flex-col items-center justify-center h-screen">
        {loading ? (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{message}</h2>
            <Spinner />
          </div>
          
        ) : (
          <>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">{message}</h2>
            <Calendar horarios={horarios} />
          </>
        )}
      </main>

      <Footer />
      <button onClick={scrollToTop} className="fixed bottom-5 right-5 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full shadow-lg z-50">
        Ir al Inicio
      </button>
    </div>
  );
}
