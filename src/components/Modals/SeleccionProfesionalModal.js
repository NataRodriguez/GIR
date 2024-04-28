import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useRouter } from 'next/router';

function SeleccionProfesionalModal({ isOpen, onClose, professionals, selectedDayOfWeek, reservaData, selectedDate }) {
  const [selectedProfessionalId, setSelectedProfessionalId] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const router = useRouter();
  const [mensaje, setMensaje] = useState(null);

  const usuarioId = localStorage.getItem('ID');
  if (!usuarioId) {
    console.error('No user ID found');
    return;
  }

  useEffect(() => {
    if (isOpen) {
      resetModal();
    }
  }, [isOpen]);

  const toggleProfessional = (professionalId) => {
    setSelectedProfessionalId(selectedProfessionalId === professionalId ? null : professionalId);
    setSelectedTime(null);
    setBookingDetails(null);
    setConfirmationVisible(false);
  };

  const handleSelectTime = (time) => {
    setSelectedTime(time);
    const professional = professionals.find(p => p.profesionalId === selectedProfessionalId);
    const formattedDate = moment(selectedDate).format('D-M-YYYY');
    const startTime = time.split(" - ")[0];

    setBookingDetails({
      profesional: `${professional.nombre} ${professional.apellido}`,
      hora: startTime,
      dia: formattedDate,
      especialidad: reservaData.especialidad,
      comuna: reservaData.comuna,
      additionalText: "Si desea cancelar la hora revise su cuenta, o llame al 123 123 1234"
    });
    setConfirmationVisible(true);
    setMensaje('Datos Reserva');
  };
  const resetModal = () => {
    setSelectedProfessionalId(null);
    setSelectedTime(null);
    setBookingDetails(null);
    setConfirmationVisible(false);
  };

  const getAvailableTimes = (horaInicio, horaFin, duracion) => {
    const times = [];
    const startTime = moment(horaInicio, "HH:mm");
    const endTime = moment(horaFin, "HH:mm");

    while (startTime.isBefore(endTime)) {
      const endSlotTime = moment(startTime).add(duracion, 'minutes');
      if (endSlotTime.isSameOrBefore(endTime)) {
        times.push(`${startTime.format("HH:mm")} - ${endSlotTime.format("HH:mm")}`);
      }
      startTime.add(duracion, 'minutes');
    }

    return times;
  };

  const handleReserve = async () => {
    if (bookingDetails) {
      const tiempoEnviar = `${bookingDetails.dia} ${bookingDetails.hora}`;
      const response = await fetch('/api/reserva', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fechaHora: tiempoEnviar,
          profesionalId: selectedProfessionalId,
          usuarioId: usuarioId,
          especialidad: reservaData.servicio,
          estado: "Registrada"
        })
      });
      const data = await response.json();

      if (response.ok) {
        setMensaje('Reserva Exitosa');
        setTimeout(() => {
          onClose();
          router.push('/'); 
        }, 5000); 
      } else {
        console.error('Error saving reservation:', data.message || "An error occurred while saving the reservation.");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-4 w-full max-w-lg max-h-full">
        <div className="modal p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">{mensaje}</h3>
          </div>
          {bookingDetails ? (
            <div className="text-sm bg-gray-100 p-4 rounded-lg">
              <p><strong>Profesional:</strong> {bookingDetails.profesional}</p>
              <p><strong>Fecha y hora:</strong> {bookingDetails.dia} a las {bookingDetails.hora}</p>
              <p><strong>Especialidad:</strong> {bookingDetails.especialidad}</p>
              <p><strong>Comuna:</strong> {bookingDetails.comuna}</p>
              <p className="text-red-600">{bookingDetails.additionalText}</p>
              <div className="mt-4 flex justify-between">
                <button onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">Cancelar</button>
                <button onClick={handleReserve} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Reservar</button>
              </div>
            </div>
          ) : (
            <div>
              {/* Professional Selection View */}
              <ul className="space-y-2">
                {professionals.map(prof => (
                  <li key={prof.profesionalId} className="border-b pb-2">
                    <button
                      onClick={() => toggleProfessional(prof.profesionalId)}
                      className="text-blue-500 hover:text-blue-700 flex justify-between w-full"
                    >
                      {prof.nombre} {prof.apellido} - {prof.especialidad}
                      <svg className={`w-4 h-4 transform ${selectedProfessionalId === prof.profesionalId ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    {selectedProfessionalId === prof.profesionalId && (
                      <ul className="mt-2">
                        {prof.horarios
                          .filter(horario => horario.diaSemana === selectedDayOfWeek)
                          .sort((a, b) => moment(a.horaInicioDia, "HH:mm").diff(moment(b.horaInicioDia, "HH:mm")))
                          .map(horario => {
                            const times = getAvailableTimes(horario.horaInicioDia, horario.horaFinDia, horario.duracionCita);
                            return times.map((time, index) => (
                              <li key={index} className={`text-gray-600 pl-4 my-1 text-lg cursor-pointer ${selectedTime === time ? 'bg-gray-200' : 'hover:bg-gray-100'}`} onClick={() => handleSelectTime(time)}>
                                {time}
                              </li>
                            ));
                          })}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SeleccionProfesionalModal;
