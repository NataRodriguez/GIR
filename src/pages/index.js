import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import ScrollToTop from '../components/Layout/ScrollToTop';
import Banner from '../components/Home/Banner';
import Servicios from '../components/Home/Servicios';
import SobreNosotros from '../components/Home/SobreNosotros';
import Contacto from '../components/Home/Contacto';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Banner />
        <Servicios />
        <SobreNosotros />
        <Contacto />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
