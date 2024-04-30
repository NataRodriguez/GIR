import { useState } from 'react';
import { useRouter } from 'next/router';
import dynamoDb from '../../../utils/awsConfig';
import Navbar from '../../../components/Layout/Navbar';
import Footer from '../../../components/Layout/Footer';
import ScrollToTop from '../../../components/Layout/ScrollToTop';
import SideMenu from '../../../components/Layout/SideMenu';
import DatosUsuario from '../../../components/Usuario/EditUsuario';
import ReservasHistorico from '../../../components/Reserva/ReservasHistorico';
import ListaReservasActivas from '../../../components/Reserva/ReservasActivas';

export default function Usuario({ user }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Cargando...</div>;
  }
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(0);
  const menuOptions = ['Mis Datos', 'Historico Reservas', 'Reservas Activas'];
  const menuSections = [<DatosUsuario user={user} />, <ReservasHistorico />, <ListaReservasActivas />]
  const handleMenuClick = (opcion) => {
    setOpcionSeleccionada(opcion);
  };

  return (
    <>
      <Navbar />
      <main className=" bg-gray-100 text-gray-800">
        <div className="w-full max-w-6xl mx-auto p-4 text-center">
          <h1 className="text-3xl font-bold text-purple-700 mb-4">Usuario:</h1>
          <h2 className="text-2xl font-bold text-purple-700 mb-4">{user.nombre}</h2>
        </div>
        <div className="flex max-w-6xl mx-auto">
          <SideMenu menu={menuOptions} selected={opcionSeleccionada} onClick={handleMenuClick} />
          <section className="flex-1">
            {menuSections[opcionSeleccionada]}
          </section>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { userId } = params;
  const queryParams = {
    TableName: "Usuarios",
    Key: {
      usuarioId: userId,
    }
  };
  try {
    const data = await dynamoDb.get(queryParams).promise();
    const user = JSON.parse(JSON.stringify(data.Item));
    return {
      props: {
        user
      }
    };
  } catch (error) {
    console.error("Error al buscar al Usuario:", error);
    return {
      props: {
        user: null
      }
    };
  }
}