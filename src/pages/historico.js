import React, { useState, useCallback } from 'react';
import Navbar from '../components/navbar'; 
import Footer from '../components/footer'; 
import Head from 'next/head';
// import HistoricoReservas from '../components/HistoricoReservas'; -- comento esta linea porque al dejarla activa da error en las páginas

const Historico = () => {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(2); // Por defecto, mostrar Historico Reservas

  const handleClick = (opcion) => {
    setOpcionSeleccionada(opcion);
  };

  const scrollToTop = useCallback(() => {
    document.getElementById('Inicio').scrollIntoView({ behavior: 'smooth' });
  }, []);

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

      <Navbar />

      <main className="max-w-6xl mx-auto">
        <div className="flex">
          <div className="sticky w-64 bg-purple-800 text-white">
            <ul>
              <li
                className={`p-4 cursor-pointer ${opcionSeleccionada === 1 ? 'bg-purple-700' : 'hover:bg-purple-700'}`}
                onClick={() => handleClick(1)}
              >
                Mis Datos
              </li>
              <li
                className={`p-4 cursor-pointer ${opcionSeleccionada === 2 ? 'bg-purple-700' : 'hover:bg-purple-700'}`}
                onClick={() => handleClick(2)}
              >
                Historico Reservas
              </li>
              <li
                className={`p-4 cursor-pointer ${opcionSeleccionada === 3 ? 'bg-purple-700' : 'hover:bg-purple-700'}`}
                onClick={() => handleClick(3)}
              >
                Reservas Activas
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <HistoricoReservas /> {/* Mostrar HistoricoReservas sin importar la opción seleccionada */}
          </div>
        </div>
      </main>

      <Footer />
      <button onClick={scrollToTop} className="fixed bottom-5 right-5 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full shadow-lg z-50">
        Ir al Inicio
      </button>
    </div>
  );
};

export default Historico;
