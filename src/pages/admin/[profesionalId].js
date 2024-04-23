import { useState, useCallback, Suspense } from 'react';
import { useRouter } from 'next/router';
import dynamoDb from '../../utils/awsConfig';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';
import ScrollToTop from '../../components/Layout/ScrollToTop';
import DatosProfesional from '../../components/DatosProfesional';
import ReservasActivas from '../../components/ReservasActivas';
import ReservasHistorico from '../../components/ReservasHistorico';

export default function Profesional({ professional }){
  const router = useRouter();
  if (router.isFallback) {
    return <div>Cargando...</div>;
  }
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(1);
  const handleClick = useCallback((opcion) => {
    setOpcionSeleccionada(opcion);
  }, []);

  return (
    <div>
      <Navbar />
      <main className=" bg-gray-100 text-gray-800">
        <div className="w-full max-w-6xl mx-auto p-4 text-center">
          {router.isFallback ? '<div>Cargando...</div>' : <h1 className="text-3xl font-bold text-purple-700 mb-4">{professional.nombre}</h1>}
        </div>
        <div className="flex max-w-6xl mx-auto">
          <aside className="sticky w-64 bg-purple-800 text-white">
            <ul>
              <li
                className={`p-4 cursor-pointer ${opcionSeleccionada === 1 ? 'bg-purple-700' : 'hover:bg-purple-700'}`}
                onClick={() => handleClick(1)}
              >
                Reservas Activas
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
                Mis Datos
              </li>
            </ul>
          </aside>
          <section className="flex-1">
            {opcionSeleccionada === 1 && <ReservasActivas />}
            {opcionSeleccionada === 2 && <ReservasHistorico/>}
            {opcionSeleccionada === 3 && <Suspense><DatosProfesional professional={professional} /></Suspense>}
          </section>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
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