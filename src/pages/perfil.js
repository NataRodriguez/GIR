import { useState, useEffect } from 'react';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import ScrollToTop from '../components/Layout/ScrollToTop';
import SideMenu from '../components/Layout/SideMenu';
import DatosUsuario from '../components/Usuario/EditUsuario';
import ReservasHistorico from '../components/Reserva/ReservasHistorico';
import ListaReservasActivas from '../components/Reserva/ReservasActivas';
import Spinner from '../components/Spinner';

export default function Perfil() {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(0);
  const menuOptions = ['Mis Datos', 'Historico Reservas', 'Reservas Activas'];
  const menuSections = [<DatosUsuario user={user} />, <ReservasHistorico />, <ListaReservasActivas />]

  useEffect(() => {
    const userId = localStorage.getItem('ID');
    const fetchURL = `/api/usuarios/${userId}`;
    fetch(fetchURL)
      .then((res) => res.json())
      .then((user) => {
        setUser(user);
        setLoading(false);
      })
  }, []);
  const handleMenuClick = (opcion) => {
    setOpcionSeleccionada(opcion);
  };

  return (
    <>
      <Navbar />
      <main className=" bg-gray-100 text-gray-800">
        <div className="w-full max-w-6xl mx-auto p-4 text-center">
          <h1 className="text-3xl font-bold text-purple-700 mb-4">Usuario:</h1>
          <h2 className="text-2xl font-bold text-purple-700 mb-4">{user ? user.nombre : 'Cargando...'}</h2>
        </div>
        <div className="flex max-w-6xl mx-auto">  
          {isLoading && <Spinner />}
          <SideMenu menu={menuOptions} selected={opcionSeleccionada} onClick={handleMenuClick} />
          <section className="flex-1">
            {!user && <div>Error al cargar el usuario</div>}
            {user && menuSections[opcionSeleccionada]}
          </section>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
