import Head from 'next/head';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import ScrollToTop from '../components/Layout/ScrollToTop';
import Banner from '../components/Home/Banner';
import Servicios from '../components/Home/Servicios';
import SobreNosotros from '../components/Home/SobreNosotros';
import Contacto from '../components/Contacto';
//import Carrousel from '../components/carrousel'; // Asegúrate de que la ruta sea correcta

export default function Home() {
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
      <Navbar />
      <main>
        <Banner />
        <Servicios />
        <SobreNosotros />
        <Contacto />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
