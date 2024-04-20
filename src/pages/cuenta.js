import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import DatosUsuario from '../components/DatosUsuario';
import { useCallback } from 'react';

export default function Cuenta() {
  const [mostrarDatosUsuario, setMostrarDatosUsuario] = useState(false);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(1);

  const handleClick = useCallback((opcion) => {
    setMostrarDatosUsuario(opcion === 1);
    setOpcionSeleccionada(opcion);
  }, []);

  const scrollToTop = useCallback(() => {
    document.getElementById('Inicio').scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className=''>
      <Head>
        <title>GIR - Cuenta</title>
        <meta name="description" content="GIR" />
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
            {mostrarDatosUsuario && <DatosUsuario />}
          </div>
        </div>
      </main>

      <Footer />
      <button onClick={scrollToTop} className="fixed bottom-5 right-5 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full shadow-lg z-50">
        Ir al Inicio
      </button>
    </div>
  );
}
