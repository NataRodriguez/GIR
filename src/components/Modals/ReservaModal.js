import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import regionesYComunas from '../../utils/regionesYComunas.json';
import Spinner from '../Spinner'; // Asegúrate de tener este componente

function ReservaModal({ isOpen, onClose, onConfirm }) {
  const [especialidades, setEspecialidades] = useState([]);
  const [selectedEspecialidad, setSelectedEspecialidad] = useState('');
  const [regiones, setRegiones] = useState(Object.keys(regionesYComunas.regiones));
  const [selectedRegion, setSelectedRegion] = useState('');
  const [comunas, setComunas] = useState([]);
  const [selectedComuna, setSelectedComuna] = useState('');
  const [serviciosDisponibles, setServiciosDisponibles] = useState([]);
  const [selectedServicio, setSelectedServicio] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { updateReservaData } = useAuth();

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetch('/api/especialidades')
        .then(response => response.json())
        .then(data => {
          setEspecialidades(data.especialidades || []);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching especialidades:', error);
          setError('Error al cargar especialidades.');
          setLoading(false);
        });
    }else{
      setSelectedEspecialidad('');
      setSelectedRegion('');
      setSelectedComuna('');
      setServiciosDisponibles([]);
      setSelectedServicio('');
      setLoading(false);
      setError('');
    }
  }, [isOpen]);

  const fetchServicios = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/profesionalesPorComuna', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comuna: selectedComuna, especialidad: selectedEspecialidad })
      });
      const data = await response.json();
      if (data.servicios && data.servicios.length > 0) {
        setServiciosDisponibles(data.servicios);
      } else {
        setSelectedServicio(false);
        setError('No existen servicios u horas disponibles.');
        setServiciosDisponibles([]);
      }
    } catch (error) {
      setSelectedServicio(false);
      console.error('Error fetching servicios:', error);
      setError('Error al cargar servicios.');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (selectedComuna && selectedEspecialidad) {
      fetchServicios();
    }
  }, [selectedComuna, selectedEspecialidad]);

  const handleEspecialidadChange = (e) => {
    const newEspecialidad = e.target.value;
    setSelectedEspecialidad(newEspecialidad);
    setSelectedRegion('');
    setSelectedComuna('');
    setServiciosDisponibles([]);
  };

  const handleRegionChange = (e) => {
    const newRegion = e.target.value;
    setSelectedRegion(newRegion);
    setComunas(regionesYComunas.regiones[newRegion] || []);
    setSelectedComuna(''); // Reset comuna when region changes
    setServiciosDisponibles([]);
  };

  const handleComunaChange = (e) => {
    setSelectedComuna(e.target.value);
  };

  const handleConfirm = () => {
    if (selectedEspecialidad && selectedComuna && selectedServicio) {
      updateReservaData({
        especialidad: selectedEspecialidad,
        comuna: selectedComuna,
        servicio: selectedServicio
      });
      onClose();
      router.push('/reserva');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-2/5 h-3/5 overflow-auto flex flex-col text-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
          <h3 className="text-xl font-semibold text-gray-900">Reserva tu Cita</h3>
          <button onClick={onClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            <span className="sr-only">Cerrar</span>
          </button>
        </div>
        {/* Body */}
        <div className="flex-auto p-4 md:p-5">
          {isLoading ? <Spinner /> : (
            <>
              <select onChange={handleEspecialidadChange} value={selectedEspecialidad} className="border p-2 w-full mb-4">
                <option value="">Seleccione Especialidad</option>
                {especialidades.map(especialidad => (
                  <option key={especialidad.especialidadId} value={especialidad.nombre}>{especialidad.nombre}</option>
                ))}
              </select>
              <select onChange={handleRegionChange} value={selectedRegion} className="border p-2 w-full mb-4">
                <option value="">Seleccione Región</option>
                {regiones.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
              <select onChange={handleComunaChange} value={selectedComuna} className="border p-2 w-full mb-4">
                <option value="">Seleccione Comuna</option>
                {comunas.map(comuna => (
                  <option key={comuna} value={comuna}>{comuna}</option>
                ))}
              </select>
              {serviciosDisponibles.length > 0 ? (
                <select onChange={e => setSelectedServicio(e.target.value)} className="border p-2 w-full mb-4">
                  <option value="">Seleccione Servicio</option>
                  {serviciosDisponibles.map((servicio, index) => (
                    <option key={index} value={servicio}>{servicio}</option>
                  ))}
                </select>
              ) : error && <p className="text-red-500">{error}</p>}
            </>
          )}
        </div>
        {/* Footer */}
        <div className="mt-auto p-4 md:p-5">
          <button onClick={handleConfirm} disabled={!selectedServicio} className={`w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${!selectedServicio ? 'opacity-50 cursor-not-allowed' : ''}`}>
            Ver Horas disponibles
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReservaModal;
