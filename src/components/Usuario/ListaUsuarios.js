import { useState, useEffect, Suspense } from 'react';
import Usuario from './Usuario';

export default function ListaUsuarios() {
  const [usersData, setUsersData] = useState([]);
  useEffect(() => {
    const obtenerReservas = async () => {
      try {
        const apiUrl = `/api/usuarios`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Error al obtener la información de los usuarios');
        }
        const data = await response.json();
        setUsersData(data);
      } catch (error) {
        console.error('Error al obtener la información de los usuarios:', error);
      }
    };
    obtenerReservas();
  }, []);

  return (
    <section className="py-16 bg-gray-50 text-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-purple-700 mb-4">Usuarios</h2>
        </div>
        <Suspense>
          {usersData.map((res, index) => <Usuario key={index} usuario={res} />)}
        </Suspense>
      </div>
    </section>
  );
}