import React from 'react';

function DatosUsuario() {
  return (
    <div id="Contacto" className="py-16 bg-gray-50 text-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-purple-700 mb-4">Datos de Usuario</h2>
          <p className="text-lg text-gray-700">Por favor, ingresa tus datos para registrarte:</p>
        </div>
        
        <form className="max-w-lg mx-auto bg-white rounded-lg p-8 shadow">
          <div className="mb-6">
            <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900">Nombre</label>
            <input type="text" id="nombre" name="nombre" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Juan Pérez" />
          </div>
          
          <div className="mb-6">
            <label htmlFor="direccion" className="block mb-2 text-sm font-medium text-gray-900">Dirección</label>
            <input type="text" id="direccion" name="direccion" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Calle 123, Ciudad, País" />
          </div>
          
          <div className="mb-6">
            <label htmlFor="telefono" className="block mb-2 text-sm font-medium text-gray-900">Teléfono</label>
            <input type="tel" id="telefono" name="telefono" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="123456789" />
          </div>

          <div className="mb-6">
            <label htmlFor="telefonoEmergencia" className="block mb-2 text-sm font-medium text-gray-900">Teléfono de Emergencia</label>
            <input type="tel" id="telefonoEmergencia" name="telefonoEmergencia" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="987654321" />
          </div>
          
          <button type="submit" className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Enviar Datos</button>
        </form>
      </div>
    </div>
  );
}

export default DatosUsuario;
