import { useState, useEffect } from 'react';
import { obtenerReservasPorUsuario } from '../../../pages/api/historico';
import { useAuth } from '../../context/AuthContext'; // Importa el contexto de autenticación

export default function HistoricoReservas(){
  const [reservas, setReservas] = useState([]); 
  const { usuario } = useAuth(); // Obtén el objeto de usuario autenticado del contexto de autenticación

  useEffect(() => {
    const obtenerHistorialReservas = async (usuarioId) => { // Define la función dentro del efecto
      try {
        if (usuario) { // Verifica si el usuario está autenticado
          let historial = await obtenerReservasPorUsuario(usuario.id);
          historial.sort((a, b) => new Date(b.fechaHora) - new Date(a.fechaHora)); // Ordena el historial de reservas por fecha y hora, de la más nueva a la más antigua
          setReservas(historial); 
        }
      } catch (error) {
        console.error('Error al obtener el historial de reservas:', error);
      }
    };

    obtenerHistorialReservas(); // Llama a la función directamente en el efecto sin depender de [usuario]

  }, [usuario]); // Ejecuta este efecto cada vez que el usuario cambie

  return (
    <div>
      <h1>Historial de Reservas</h1>
      <ul>
        {reservas.map((reserva) => ( 
          <li key={reserva.reservaId}>
            <p><strong>ID de reserva:</strong> {reserva.reservaId}</p>
            <p><strong>Fecha y hora:</strong> {reserva.fechaHora}</p>
            <p><strong>Especialidad:</strong> {reserva.especialidad}</p>
            <p><strong>Estado:</strong> {reserva.estado}</p>
            <p><strong>ID del profesional:</strong> {reserva.profesionalId}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};