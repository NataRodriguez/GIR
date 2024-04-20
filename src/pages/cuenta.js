import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/navbar'; // Asegúrate de que la ruta sea correcta
import Footer from '../components/footer'; // Asegúrate de que la ruta sea correcta
import DatosUsuario from '../components/DatosUsuario'; // Importa el componente DatosUsuario
import { useCallback } from 'react';

export default function Home() {
    const [mostrarDatosUsuario, setMostrarDatosUsuario] = useState(false); // Estado para controlar la visibilidad del formulario
    const [opcionSeleccionada, setOpcionSeleccionada] = useState(1); // Estado para la opción seleccionada
  
    const handleClick = useCallback((opcion) => {
      setMostrarDatosUsuario(opcion === 1); // Mostrar formulario si la opción seleccionada es 1
      setOpcionSeleccionada(opcion); // Establecer la opción seleccionada
    }, []);
  
    const scrollToTop = useCallback(() => {
      document.getElementById('Inicio').scrollIntoView({ behavior: 'smooth' });
    }, []);
  
    return (
      <div className=''>
        <Head>
          <title>GIR - Home</title>
          <meta name="description" content="GIR" />
          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
            rel="stylesheet"
          />
        </Head>
  
        <Navbar /> {/* Uso del componente Navbar */}
  
        <main className="max-w-6xl mx-auto">
          <div className="flex">
            <div className="sticky w-64 bg-gray-800 text-white">
              <ul >
                <li 
                  className={`p-4 cursor-pointer ${opcionSeleccionada === 1 ? 'bg-gray-700' : 'hover:bg-gray-700'}`} 
                  onClick={() => handleClick(1)}
                >
                  Opción 1
                </li>
                <li 
                  className={`p-4 cursor-pointer ${opcionSeleccionada === 2 ? 'bg-gray-700' : 'hover:bg-gray-700'}`} 
                  onClick={() => handleClick(2)}
                >
                  Opción 2
                </li>
                <li 
                  className={`p-4 cursor-pointer ${opcionSeleccionada === 3 ? 'bg-gray-700' : 'hover:bg-gray-700'}`} 
                  onClick={() => handleClick(3)}
                >
                  Opción 3
                </li>
              </ul>
            </div>
            <div className="flex-1">
              {/* Mostrar el formulario si mostrarDatosUsuario es verdadero */}
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