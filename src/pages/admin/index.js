import { Suspense } from 'react';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';
import ListaProfesionales from '../../components/Profesional/ListaProfesionales';
import ListaUsuarios from '../../components/Usuario/ListaUsuarios';

export default function Admin() {
  return (
    <>
      <Navbar />
      <main className=" bg-gray-100 text-gray-800">
        <div className="flex max-w-6xl mx-auto">
          <section className="flex-1">
            <Suspense><ListaProfesionales/></Suspense>
          </section>
          <section className="flex-1">
            <Suspense><ListaUsuarios/></Suspense>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}