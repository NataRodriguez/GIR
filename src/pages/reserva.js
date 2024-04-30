import React, { useEffect, useState } from 'react';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import ScrollToTop from '../components/Layout/ScrollToTop';
import Calendar from '../components/Calendario';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';

export default function Reserva() {
  const { reservaData } = useAuth();
  const [loading, setLoading] = useState(true);
  const [horarios, setHorarios] = useState([]);
  const [message, setMessage] = useState('Cargando...');

  useEffect(() => {
      if (reservaData.especialidad && reservaData.comuna && reservaData.servicio) {
        setMessage(`Buscando tu hora con un/a ${reservaData.especialidad}, en ${reservaData.comuna} para tu ${reservaData.servicio}`);

        setTimeout(() => {
          setLoading(false);
          setMessage(`Selecciona tu hora con tu ${reservaData.especialidad}, en ${reservaData.comuna} para tu ${reservaData.servicio}`);
        }, 5000);
      }
  }, [reservaData]);

  useEffect(() => {
    const fetchProfesionalesYHorarios = async () => {
      if (reservaData.especialidad && reservaData.comuna && reservaData.servicio) {
        setLoading(true);
        try {
          const responseProfesionales = await fetch('/api/profesionalesFiltered', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              especialidad: reservaData.especialidad,
              comuna: reservaData.comuna,
              servicio: reservaData.servicio
            })
          });
          const profesionalesData = await responseProfesionales.json();
  
          if (profesionalesData && Array.isArray(profesionalesData)) {
            const profesionalIds = profesionalesData.map(prof => String(prof.profesionalId));
  
            const responseHorarios = await fetch('/api/horarios', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ profesionalIds })
            });
            const horariosData = await responseHorarios.json();
  
            if (horariosData && Array.isArray(horariosData.horarios)) {
              const horariosMerged = profesionalesData.map(prof => ({
                ...prof,
                horarios: horariosData.horarios.filter(h => String(h.profesionalId) === String(prof.profesionalId))
              }));
  
              console.log("Horarios Merged:", horariosMerged); // Debugging: Verifica el resultado final del merge
  
              setHorarios(horariosMerged);
            } else {
              console.log("La data de horarios no es un array o está vacía:", horariosData);
              setHorarios([]);  // Asegura limpiar los horarios si no hay datos adecuados
            }
          } else {
            console.log("Sin datos o formato incorrecto de profesionales:", profesionalesData);
          }
          setLoading(false);
        } catch (error) {
          console.error('Error al traer los profesionales y horarios:', error);
          setLoading(false);
        }
      }
    };
  
    fetchProfesionalesYHorarios();
  }, [reservaData]);
  
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center h-screen bg-white text-grey-800">
        {loading ? (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{message}</h2>
            <Spinner />
          </div>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">{message}</h2>
            <Calendar horarios={horarios} reservaData={reservaData}/>
          </>
        )}
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
