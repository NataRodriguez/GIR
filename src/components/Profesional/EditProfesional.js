import { useState } from 'react';
import Spinner from '../Spinner';

export default function DatosProfesional({ professional }) {
  const [loading, setLoading] = useState(false);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [region, setRegion] = useState('');
  const [comuna, setComuna] = useState('');
  const [servicios, setServicios] = useState('');
  const [valor, setValor] = useState('');
    
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const profesionalId = professional.profesionalId;
      const response = await fetch(`/api/profesionales/${profesionalId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, apellido, especialidad, region, comuna, servicios, valor }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar los datos del profesional');
      }else{
        setLoading(false);
      }

      // Mostrar mensaje de éxito u otra lógica de actualización necesaria
      console.log('Datos de profesional actualizados correctamente');
    } catch (error) {
      console.error('Error al actualizar los datos del profesional:', error);
    }
  };

  return (
    <div className="py-16 bg-gray-50 text-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-purple-700 mb-4">Datos del Profesional</h2>
        </div>
        { loading ? (
          <Spinner />
        ) : (
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white rounded-lg p-8 shadow">
            <div className="mb-6">
              <label htmlFor="profesionalId" className="block mb-2 text-sm font-medium text-gray-900">ID</label>
              <input type="text" id="nombre" name="nombre" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={professional.profesionalId} disabled/>
            </div>
            <div className="mb-6">
              <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900">Nombre</label>
              <input type="text" id="nombre" name="nombre" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={professional.nombre} onChange={(e) => setNombre(e.target.value)}/>
            </div>
            <div className="mb-6">
              <label htmlFor="apellido" className="block mb-2 text-sm font-medium text-gray-900">Apellido</label>
              <input type="text" id="nombre" name="nombre" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={professional.apellido} onChange={(e) => setApellido(e.target.value)}/>
            </div>
            <div className="mb-6">
              <label htmlFor="especialidad" className="block mb-2 text-sm font-medium text-gray-900">Especialidad</label>
              <input type="text" id="nombre" name="nombre" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={professional.especialidad} onChange={(e) => setEspecialidad(e.target.value)}/>
            </div>
            <div className="mb-6">
              <label htmlFor="region" className="block mb-2 text-sm font-medium text-gray-900">Region</label>
              <input type="text" id="nombre" name="nombre" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={professional.region} onChange={(e) => setRegion(e.target.value)}/>
            </div>
            <div className="mb-6">
              <label htmlFor="comuna" className="block mb-2 text-sm font-medium text-gray-900">Comuna</label>
              <input type="text" id="nombre" name="nombre" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={professional.comuna} onChange={(e) => setComuna(e.target.value)}/>
            </div>
            <div className="mb-6">
              <label htmlFor="servicios" className="block mb-2 text-sm font-medium text-gray-900">Servicios</label>
              <input type="text" id="nombre" name="nombre" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={professional.servicios.join(", ")} onChange={(e) => setServicios(e.target.value)}/>
            </div>
            <div className="mb-6">
              <label htmlFor="valor" className="block mb-2 text-sm font-medium text-gray-900">Valor</label>
              <input type="text" id="nombre" name="nombre" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={professional.valor} onChange={(e) => setValor(e.target.value)}/>
            </div>
            <button type="submit" className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5">Modificar Datos</button>
          </form>
        )}
      </div>
    </div>
  );
};