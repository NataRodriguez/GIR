import { useState, useEffect, Suspense } from 'react';
import Profesional from './Profesional';

export default function ListaProfesionales() {
  const [professionalsData, setProfessionalsData] = useState([]);
  useEffect(() => {
    const obtenerReservas = async () => {
      try {
        const apiUrl = `/api/profesionales`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Error al obtener la información de los profesionales');
        }
        const data = await response.json();
        setProfessionalsData(data);
      } catch (error) {
        console.error('Error al obtener la información de los profesionales:', error);
      }
    };
    obtenerReservas();
  }, []);

  return (
    <section className="py-16 bg-gray-50 text-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-purple-700 mb-4">Profesionales</h2>
        </div>
        <Suspense>
          {professionalsData.map((res, index) => <Profesional key={index} profesional={res} />)}
        </Suspense>
      </div>
    </section>
  );
}