import React, { useEffect, useState, useCallback } from 'react';
import Calendar from './Calendario'; // Asegúrate de que Calendar esté importado si lo estás utilizando
import { useAuth } from '../context/AuthContext';  // Ajusta la ruta según la ubicación real
import Spinner from './Spinner';

export default function ReservasActivas() {
  const { reservaData } = useAuth();
  const [loading, setLoading] = useState(true);
  const [horarios, setHorarios] = useState([]);  // Estado para almacenar los horarios
  const [message, setMessage] = useState('Cargando...'); // Mensaje inicial de carga

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
    const fetchHorarios = async (profesionalIds) => {
      try {
        const response = await fetch('/api/horarios', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ profesionalIds })
        });
        const data = await response.json();
        console.log(data);
        return data.horarios;
      } catch (error) {
        console.error('Error loading schedules:', error);
        return [];
      }
    };
  
    const fetchProfesionales = async () => {
      if (reservaData.especialidad && reservaData.comuna && reservaData.servicio) {
        setLoading(true);
        try {
          const response = await fetch('/api/profesionales', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              especialidad: reservaData.especialidad,
              comuna: reservaData.comuna,
              servicio: reservaData.servicio
            })
          });
          const data = await response.json();
          if (data && Array.isArray(data)) {
            const profesionalIds = data.map(prof => prof.profesionalId); // Asumiendo que profesionalId es un string o número directo
            const horarios = await fetchHorarios(profesionalIds);
            setHorarios(horarios);
          } else {
            console.log("Sin Datos o formato incorrecto:", data);
          }
          setLoading(false);
        } catch (error) {
          console.error('Error al traer los profesionales:', error);
          setLoading(false);
        }
      }
    };  
    fetchProfesionales();
  }, [reservaData]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {loading ? (
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{message}</h2>
          <Spinner />
        </div>
      ) : (
        <>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">{message}</h2>
          <Calendar horarios={horarios} />
        </>
      )}
    </div>
  );
}
