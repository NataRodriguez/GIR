import { useState, useEffect } from 'react';
import Spinner from './Spinner';
import Reserva from './Reserva';

export default function ListaReservas({ active = null, profesionalId = null, userId = null }) {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    const obtenerReservas = async () => {
      let apiUrl;
      try {
        console.log("profesionalId", profesionalId)
        if (profesionalId) {
          apiUrl = `/api/reservas/profesional/${profesionalId}`;
        } else if (userId) {
          apiUrl = `/api/reservas/user/${userId}`;
        }
        if(active){
          apiUrl += `?active=${active}`;
        }
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error('Error al obtener la información de las reservas');
        }

        const data = await response.json();
        setUserInfo(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener la información de las reservas:', error);
      }
    };
    obtenerReservas();
  }, []);

  return (
    <section className="py-16 bg-gray-50 text-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-purple-700 mb-4">Reservas</h2>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          !userInfo.length ? (
            <div className="text-center mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">No se encontraron reservas { active ? 'activas': ''}</h2>
            </div>
          ) : (
          userInfo.map((res, index) => <Reserva key={index} reserva={res} />)
        ))}
      </div>
    </section>
  );
}