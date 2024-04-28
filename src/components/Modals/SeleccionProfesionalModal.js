import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useRouter } from 'next/router';

function SeleccionProfesionalModal({ isOpen, onClose, professionals, selectedDayOfWeek, reservaData, selectedDate }) {
  const [selectedProfessionalId, setSelectedProfessionalId] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [message, setMessage] = useState(null);
  const router = useRouter();
  const [ReservaDetails, setReservaDetails] = useState(null);

  const usuarioId = localStorage.getItem('ID');
  if (!usuarioId) {
    console.error('No user ID found');
    return;
  }

  // Resetear el estado cuando el modal se abre
  useEffect(() => {
    if (isOpen) {
      setSelectedProfessionalId(null);
      setSelectedTime(null);
    }
  }, [isOpen]); // Dependencia en 'isOpen' para resetear el estado cada vez que se abre

  const toggleProfessional = (professionalId) => {
    setSelectedProfessionalId(selectedProfessionalId === professionalId ? null : professionalId);
    setSelectedTime(null); // Reset selected time when changing professionals
  };

  const handleSelectTime = (time) => {
    

    setSelectedTime(time);
  };

  const handleSave = async () => {
    if (selectedProfessionalId && selectedTime) {
      const formattedDate = moment(selectedDate).format('D-M-YYYY');
      const tiempoEnviar = formattedDate + " " + selectedTime.split(" - ")[0];
  
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
        // Mostrar los detalles de la reserva y preparar el mensaje de éxito
        setMessage(`Hora reservada correctamente para el día ${formattedDate} a las ${selectedTime.split(" - ")[0]} con ${reservaData.especialidad} en ${reservaData.comuna}.`);
        setReservaDetails({
          profesional: reservaData.profesionalNombre, // Asegúrate de tener este dato disponible
          hora: selectedTime.split(" - ")[0],
          dia: formattedDate,
          region: reservaData.region, // Asegúrate de tener este dato disponible
          comuna: reservaData.comuna,
          additionalText: "Si desea cancelar la hora revise su cuenta, o llame al 123 123 1234"
        });
        setBookingConfirmed(true); // Confirm booking
      } else {
        console.error('Error saving reservation:', data.message || "Un error ocurrió al guardar la reserva.");
        setError(data.message || "Un error ocurrió al guardar la reserva.");
      }
    }
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-4 w-full max-w-md max-h-full">
      {bookingConfirmed ? (
        // Confirmation View
        <div className="modal">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Confirmación de Reserva
            </h3>
            <button type="button" onClick={() => { onClose(); setBookingConfirmed(false); router.push('/'); }} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
              <svg className="w-3 h-3" aria-hidden="true" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span className="sr-only">Cerrar</span>
            </button>
          </div>
          <div className="p-4 md:p-5">
            <p>{message}</p>
          </div>
        </div>
      ) : (
        // Professional Selection View
        <div className="modal">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Selecciona un Profesional
            </h3>
            <button type="button" onClick={onClose} className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
              <svg className="w-3 h-3" aria-hidden="true" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span className="sr-only">Cerrar</span>
            </button>
          </div>
          <div className="p-4 md:p-5">
            <ul className="space-y-2">
              {professionals.map(prof => (
                <li key={prof.profesionalId} className="border-b pb-2">
                  <button
                    onClick={() => toggleProfessional(prof.profesionalId)}
                    className="text-blue-500 hover:text-blue-700 flex justify-between w-full"
                  >
                    {prof.nombre} {prof.apellido} - {prof.especialidad}  |  {prof.direccion}
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
            <div className="mt-4 flex justify-end">
              <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Guardar</button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default SeleccionProfesionalModal;
