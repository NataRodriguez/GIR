import { useState, useCallback } from 'react';
import Head from 'next/head';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import DatosUsuario from '../components/DatosUsuario';
import ReservasHistorico from '../components/ReservasHistorico';
import ListaReservasActivas from '../components/ReservasActivas';

export default function Cuenta() {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(1);
  const handleClick = useCallback((opcion) => {
    console.log("Opción seleccionada:", opcion); // Para debuggear
    setOpcionSeleccionada(opcion);
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
      <main className=" bg-gray-100 text-gray-800">
        <div className="flex max-w-6xl mx-auto">
          <aside className="sticky w-64 bg-purple-800 text-white">
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
          </aside>
          <section className="flex-1">
            {opcionSeleccionada === 1 && <DatosUsuario />}
            {opcionSeleccionada === 2 && <ReservasHistorico/> }
            {opcionSeleccionada === 3 && <ListaReservasActivas />}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
