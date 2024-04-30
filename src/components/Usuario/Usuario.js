import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'          

export default function Usuario({ usuario }) {
  const linkUrl = `/admin/usuario/${usuario.usuarioId}`;
  return (
    <a href={linkUrl} className="flex w-full mx-auto px-4 bg-gray-50 hover:bg-gray-200 text-gray-800 mb-4 border-solid border-2 border-grey p-4 rounded bg-gray-100 items-center">
      <div className="flex-initial w-40 pr-4 items-center text-center">
        <FontAwesomeIcon icon={faUser} className="text-4xl text-purple-700" />
        <h2 className="text-xl text-center font-bold text-purple-700">{usuario.nombre}</h2>
        {usuario.admin && (<p className='text-sm'><strong>Admin</strong></p>)}
      </div>
      <div className="flex-1 text-xs">
        <p><strong>ID:</strong> {usuario.usuarioId}</p>
        <p><strong>Correo:</strong> {usuario.email}</p>
        <p><strong>Telefono:</strong> {usuario.telefono}</p>
        <p><strong>Dirección:</strong> {usuario.direccion}</p>
      </div>
    </a>
  );
}