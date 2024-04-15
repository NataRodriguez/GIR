// src/pages/index.js
import Head from 'next/head';
import Navbar from '../components/navbar'; // Asegúrate de que la ruta sea correcta
import Footer from '../components/footer'; // Asegúrate de que la ruta sea correcta
import Banner from '../components/mainBanner';
import Servicios from '../components/servicios';
import SobreNosotros from '../components/SobreNosotros';
import Contacto from '../components/Contacto';
import { useCallback } from 'react';

//import Carrousel from '../components/carrousel'; // Asegúrate de que la ruta sea correcta

export default function Home() {
  const scrollToTop = useCallback(() => {
    document.getElementById('Inicio').scrollIntoView({ behavior: 'smooth' });
  }, []);

  
  return (
    <div>
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

      <main >
        <Banner />
        <section id="servicios">
            <Servicios />
        </section>
        <section id="sobreNosotros">
            <SobreNosotros />
        </section>
        <section id="contacto">
            <Contacto />
        </section>
      </main>

      <Footer />
      <button onClick={scrollToTop} className="fixed bottom-5 right-5 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full shadow-lg z-50">
        Ir al Inicio
      </button>
    </div>
  );
}
