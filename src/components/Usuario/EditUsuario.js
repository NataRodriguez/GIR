import { useState } from 'react';
import Spinner from '../Spinner';


export default function DatosUsuario({ user }){
  const [loading, setLoading] = useState(false); // Estado para controlar la carga
  const [nombre, setNombre] = useState(''); // Estado para el nombre
  const [direccion, setDireccion] = useState(''); // Estado para la dirección
  const [telefono, setTelefono] = useState(''); // Estado para el teléfono
  const [telefonoEmergencia, setTelefonoEmergencia] = useState(''); // Estado para el teléfono de emergencia

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const userId = user.usuarioId;
      const response = await fetch(`/api/usuarios/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, direccion, telefono, telefonoEmergencia }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar los datos del usuario');
      }else{
        setLoading(false);
      }

      // Mostrar mensaje de éxito u otra lógica de actualización necesaria
      console.log('Datos de usuario actualizados correctamente');
    } catch (error) {
      console.error('Error al actualizar los datos del usuario:', error);
    }
  };

  return (
    <div className="py-16 bg-gray-50 text-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-purple-700 mb-4">Datos de Usuario</h2>
        </div>
        { loading ? (
          <Spinner /> // Mostrar el spinner mientras se carga la información
        ) : (
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white rounded-lg p-8 shadow">
            <div className="mb-6">
              <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900">ID</label>
              <input type="text" id="id" name="id" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="1"
              value={user.usuarioId} disabled />
            </div>
            <div className="mb-6">
              <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900">Nombre</label>
              <input type="text" id="nombre" name="nombre" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Juan Pérez"
              value={user.nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>
            <div className="mb-6">
              <label htmlFor="direccion" className="block mb-2 text-sm font-medium text-gray-900">Dirección</label>
              <input type="text" id="direccion" name="direccion" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Calle 123, Ciudad, País"
              value={user.direccion} onChange={(e) => setDireccion(e.target.value)} />
            </div>
            <div className="mb-6">
              <label htmlFor="telefono" className="block mb-2 text-sm font-medium text-gray-900">Teléfono</label>
              <input type="tel" id="telefono" name="telefono" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="123456789"
              value={user.telefono} onChange={(e) => setTelefono(e.target.value)} />
            </div>
            <button type="submit" className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5">Modificar Datos</button>
          </form>
        )}
      </div>
    </div>
  );
};