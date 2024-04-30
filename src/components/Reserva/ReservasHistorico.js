import { useEffect, useState } from 'react';
import Spinner from '../Spinner';

export default function ReservasHistorico() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReservas = async () => {
      const usuarioId = localStorage.getItem('ID');
      if (!usuarioId) {
        setError('Usuario no identificado');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/reservasUsuario/${usuarioId}`);
        const data = await response.json();
        if (response.ok) {
          // Suponiendo que los datos vienen en un array y ya vienen ordenados del servidor
          setReservas(data.reservas);
        } else {
          throw new Error(data.message || "Error al obtener las reservas");
        }
      } catch (error) {
        console.error('Error fetching reservas:', error);
        setError(error.message);
      }
      setLoading(false);
    };

    fetchReservas();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Histórico de Reservas</h2>
      <div className="w-full max-w-3xl">
        {reservas.length ? (
          reservas.map(reserva => (
            <div key={reserva.reservaId} className="p-4 mb-2 shadow">
              <p>Especialidad: {reserva.especialidad}</p>
              <p>Fecha y hora: {reserva.fechaHora}</p>
              <p>Estado: {reserva.estado}</p>
            </div>
          ))
        ) : (
          <p>No hay reservas históricas para mostrar.</p>
        )}
      </div>
    </div>
  );
}