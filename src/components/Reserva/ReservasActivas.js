import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';  // Ajusta la ruta según la ubicación real
import Calendar from '../Calendario'; // Asegúrate de que Calendar esté importado si lo estás utilizando
import Spinner from './Spinner';
import ConfirmCancellationModal from './Modals/ConfirmCancellationModal'; // Asegúrate de importar el componente modal

function ReservasActivas() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReservaId, setSelectedReservaId] = useState(null);

  useEffect(() => {
    const fetchReservas = async () => {
      const usuarioId = localStorage.getItem('ID');
      if (!usuarioId) {
        setError('Usuario no identificado');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/reservas/reservasUsuario/${usuarioId}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Error al obtener las reservas");

        const reservasActivas = data.reservas.filter(reserva => reserva.estado === "Registrada");

        const reservasConDetalles = await Promise.all(
          reservasActivas.map(async (reserva) => {
            const resp = await fetch(`/api/reservas/informacionProfesional/${reserva.profesionalId}`);
            const profData = await resp.json();
            return { ...reserva, profesional: profData };
          })
        );

        setReservas(reservasConDetalles);
      } catch (error) {
        console.error('Error fetching reservas:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, []);

  const openModal = (reservaId) => {
    setSelectedReservaId(reservaId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedReservaId(null);
  };
  

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reservas Activas</h2>
      <div className="w-full max-w-3xl">
        {reservas.length ? (
          reservas.map(reserva => (
            <div key={reserva.reservaId} className="p-4 mb-2 shadow-lg rounded bg-white flex justify-between items-center">
              <div>
                <p><strong>Profesional:</strong> {reserva.profesional?.nombre} {reserva.profesional?.apellido}</p>
                <p><strong>Especialidad:</strong> {reserva.profesional?.especialidad}</p>
                <p><strong>Servicio:</strong> {reserva.especialidad}</p>
                <p><strong>Fecha y hora:</strong> {reserva.fechaHora}</p>
                <p><strong>Estado:</strong> {reserva.estado}</p>
              </div>
              <button onClick={() => openModal(reserva.reservaId)} className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Cancelar
              </button>
            </div>
          ))
        ) : (
          <p>No hay reservas activas para mostrar.</p>
        )}
      </div>
      
      <ConfirmCancellationModal
              isOpen={modalOpen}
              onClose={closeModal}
              onCancel={closeModal}
              reservaId={selectedReservaId}
            />
    </div>
    
  );
}

export default ReservasActivas;
