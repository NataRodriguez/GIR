import { useState } from 'react';
import { useRouter } from 'next/router';
import dynamoDb from '../../../utils/awsConfig';
import Navbar from '../../../components/Layout/Navbar';
import Footer from '../../../components/Layout/Footer';
import ScrollToTop from '../../../components/Layout/ScrollToTop';
import SideMenu from '../../../components/Layout/SideMenu';
import DatosProfesional from '../../../components/Profesional/EditProfesional';
import ReservasHistorico from '../../../components/Reserva/ReservasHistorico';
import ListaReservasActivas from '../../../components/Reserva/ReservasActivas';

export default function Profesional({ professional }){
  const router = useRouter();
  if (router.isFallback) {
    return <div>Cargando...</div>;
  }
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(0);
  const menuOptions = ['Reservas Activas','Historico Reservas','Datos del Profesional'];
  const menuSections = [<ListaReservasActivas />,<ReservasHistorico />,<DatosProfesional professional={professional} />]
  const handleMenuClick = (opcion) => {
    setOpcionSeleccionada(opcion);
  };

  return (
    <>
      <Navbar />
      <main className=" bg-gray-100 text-gray-800">
        <div className="w-full max-w-6xl mx-auto p-4 text-center">
          <h1 className="text-3xl font-bold text-purple-700 mb-4">Profesional:</h1>
          <h2 className="text-2xl font-bold text-purple-700 mb-4">{professional.nombre} {professional.apellido}</h2>
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
  )
};

export async function getServerSideProps({ params }) {
  const { profesionalId } = params;
  const queryParams = {
    TableName: "Profesionales",
    KeyConditionExpression: "profesionalId = :profesionalId",
    ExpressionAttributeValues: {
      ":profesionalId": Number(profesionalId)
    }
  };
  try {
    const data = await dynamoDb.query(queryParams).promise();
    const professional = JSON.parse(JSON.stringify(data.Items[0]));
    return {
      props: {
        professional
      }
    };
  } catch (error) {
    console.error("Error al buscar al Profesional:", error);
    return {
      props: {
        professional: null
      }
    };
  }
}