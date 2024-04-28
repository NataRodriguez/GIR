
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'          

export default function Reserva({ reserva }) {
  return (
    <div className="py-16 bg-gray-50 text-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex mb-12 border-solid border-2 border-grey p-4 rounded bg-gray-100 items-center">
          <div className="pr-4 items-center text-center">
            <FontAwesomeIcon icon={faCalendar} className="text-4xl text-purple-700" />
            <h2 className="text-2xl text-center font-bold text-purple-700">Reserva</h2>
            <p className='text-sm'><strong>Estado:</strong> {reserva.estado}</p>
          </div>
          <div className="flex-1">
            <p><strong>Especialidad:</strong> {reserva.especialidad}</p>
            <p><strong>FechaHora:</strong> {reserva.fechaHora}</p>
          </div>
          <div className="flex-1 text-xs">
            <p><strong>id:</strong> {reserva.reservaId}</p>
            <p><strong>ProfesionalId:</strong> {reserva.profesionalId}</p>
            <p><strong>UsuarioId:</strong> {reserva.usuarioId}</p>
          </div>
        </div>
      </div>
    </div>
  );
}