import React, { useState } from 'react';

const ConfirmCancellationModal = ({ isOpen, onClose, onCancel, reservaId }) => {
  const [isCancelled, setIsCancelled] = useState(false);

  const handleCancel = async () => {
    try {
      const response = await fetch(`/api/reservas/cancelar/${reservaId}`, { method: 'DELETE' });
      const data = await response.json();
      if (response.ok) {
        setIsCancelled(true);
      } else {
        throw new Error(data.message || 'Error al cancelar la reserva');
      }
    } catch (error) {
      console.error('Cancel error:', error);
    }
  };

  return (
    isOpen ? (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex justify-center items-center">
        <div className="bg-white p-4 rounded-lg max-w-sm mx-auto">
          {!isCancelled ? (
            <>
              <h2 className="text-lg font-semibold">Confirmar Cancelación</h2>
              <p>¿Estás seguro de que deseas cancelar esta reserva?</p>
              <div className="flex justify-end space-x-2 mt-4">
                <button onClick={onClose} className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400">Cerrar</button>
                <button onClick={handleCancel} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Cancelar Reserva</button>
              </div>
            </>
          ) : (
            <>
              <p>La reserva ha sido cancelada exitosamente.</p>
              <div className="flex justify-end mt-4">
                <button onClick={onClose} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Cerrar</button>
              </div>
            </>
          )}
        </div>
      </div>
    ) : null
  );
};

export default ConfirmCancellationModal;
