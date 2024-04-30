import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserDoctor } from '@fortawesome/free-solid-svg-icons'

export default function Profesional({ profesional }) {
  const linkUrl = `/admin/profesional/${profesional.profesionalId}`;
  return (
    <a href={linkUrl} className="flex w-full mx-auto px-4 bg-gray-50 hover:bg-gray-200 text-gray-800 mb-4 border-solid border-2 border-grey p-4 rounded bg-gray-100 items-center">
      <div className="flex-initial w-40 pr-4 items-center text-center">
        <FontAwesomeIcon icon={faUserDoctor} className="text-4xl text-purple-700" />
        <h2 className="text-xl text-center font-bold text-purple-700">{profesional.nombre} {profesional.apellido}</h2>
      </div>
      <div className="flex-1 text-xs">
        <p><strong>ID:</strong> {profesional.profesionalId}</p>
        <p><strong>Especialidad:</strong> {profesional.especialidad}</p>
        <p><strong>Servicios:</strong></p>
        <ul>
          {profesional.servicios.map((servicio, index) => (
            <li className='inline-block mr-1 text-center rounded px-2 py-1 bg-purple-700 text-white' key={index}>{servicio}</li>
          ))}
        </ul>
        <p><strong>Valor:</strong> ${profesional.valor}</p>
        <p><strong>Región:</strong> {profesional.region}</p>
        <p><strong>Comuna:</strong> {profesional.comuna}</p>
        <p><strong>Dirección:</strong> {profesional.direccion}</p>
      </div>
    </a>
  );
}