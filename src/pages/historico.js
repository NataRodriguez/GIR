import React from 'react';
import Navbar from '../components/navbar'; 
import Footer from '../components/footer'; 
import Head from 'next/head';
import { useCallback } from 'react'; 
// import HistoricoReservas from '../components/HistoricoReservas'; -- comento esta linea porque al dejarla activa da error en las páginas

const scrollToTop = useCallback(() => {
  document.getElementById('Inicio').scrollIntoView({ behavior: 'smooth' });
}, []);

const Historico = () => {
  return (
    <div>
      <Head>
        <title>Historial de Reservas - GIR</title>
        <meta name="description" content="Historial de reservas de usuario en GIR" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Navbar /> {/* Incluye el Navbar */}
      <div className="container mx-auto px-4 py-8"> {/* Contenedor principal */}
        <h1 className="text-3xl font-bold mb-4">Historial de Reservas</h1>
        <div className="bg-white shadow-md rounded-lg p-6"> {/* Estilo del contenedor del componente */}
          <HistoricoReservas /> {/* Componente de historial de reservas */}
        </div>
      </div>
      
      <Footer /> {/* Incluye el Footer */}
      <button onClick={scrollToTop} className="fixed bottom-5 right-5 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full shadow-lg z-50">
        Ir al Inicio
      </button>
    </div>
  );
};

export default Historico;


