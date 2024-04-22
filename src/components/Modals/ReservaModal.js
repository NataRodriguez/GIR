import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Importar useRouter
import { useAuth } from '../../context/AuthContext';  // Ajusta la ruta según la ubicación real

// Suponiendo que tienes un archivo json o un endpoint API para regiones y comunas
import regionesYComunas from '../../utils/regionesYComunas.json';

function ReservaModal({ isOpen, onClose, onConfirm  }) {
  const [especialidades, setEspecialidades] = useState([]);
  const [selectedEspecialidad, setSelectedEspecialidad] = useState('');
  const [regiones, setRegiones] = useState(Object.keys(regionesYComunas.regiones));
  const [selectedRegion, setSelectedRegion] = useState('');
  const [comunas, setComunas] = useState([]);
  const [selectedComuna, setSelectedComuna] = useState(''); // Asegúrate de tener esto
  const [serviciosDisponibles, setServiciosDisponibles] = useState([]);
  const [selectedServicio, setSelectedServicio] = useState('');
  const [isLoading, setLoading] = useState(false);
  const router = useRouter(); // Usar useRouter para manejar la navegación
  const { updateReservaData } = useAuth();

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetch('/api/especialidades')
        .then((response) => response.json())
        .then((data) => {
          setEspecialidades(data.especialidades || []);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching especialidades:', error);
          setLoading(false);
        });
    }
  }, [isOpen]);
  
  const onCloseModal = () => {
    // Limpia todos los estados relacionados con los selects
    setSelectedEspecialidad('');
    setSelectedRegion('');
    setSelectedComuna('');
    setServiciosDisponibles([]);
    setSelectedServicio('');
  
    // Llama a cualquier otra lógica de cierre que puedas necesitar
    onClose(); // Suponiendo que onClose es una prop para manejar el cierre del modal
  };

  const fetchServicios = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/profesionalesPorComuna', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comuna: selectedComuna, especialidad: selectedEspecialidad })
      });
      const data = await response.json();
      console.log(data);
      if (data.servicios) {
        setServiciosDisponibles(data.servicios);
      }
    } catch (error) {
      console.error('Error fetching servicios:', error);
    }
    setLoading(false);
  };
  
  useEffect(() => {
    if (selectedComuna && selectedEspecialidad) {
      fetchServicios();
    }
  }, [selectedComuna, selectedEspecialidad]); // Dependencias para realizar la llamada
  
  const handleEspecialidadChange = (e) => {
    setSelectedEspecialidad(e.target.value);
  };

  const handleComunaChange = (e) => {
    setSelectedComuna(e.target.value);
  };

  useEffect(() => {
    if (selectedComuna && selectedEspecialidad) {
      fetchServicios();
    }
  }, [selectedComuna, selectedEspecialidad]);
  
  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
    setComunas(regionesYComunas.regiones[e.target.value]);
  };

  const handleConfirm = () => {
    if (selectedEspecialidad && selectedComuna && selectedServicio) {
        updateReservaData({
            especialidad: selectedEspecialidad,
            comuna: selectedComuna,
            servicio: selectedServicio
        });
        onClose(); // Cerrar el modal
        router.push('/reserva'); // Redirigir a la página de reserva
    } else {
        console.log("Faltan datos por seleccionar.");
    }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-2/5 h-3/5 overflow-auto  flex flex-col text-gray-800">
        {/* Header Modal */}
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 class="text-xl font-semibold text-gray-900 text-gray-800">
                Reserva tu Cita
            </h3>
            <button type="button" onClick={onCloseModal} class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="authentication-modal">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span class="sr-only">Cerrar</span>
            </button>
        </div>
        {/* Select para especialidades */}
        <div className="p-4 md:p-5">
          {isLoading ? (
            <p>Cargando especialidades...</p>
          ) : (
            <select onChange={handleEspecialidadChange} value={selectedEspecialidad} className="border p-2 w-full mb-4">
              <option value="">Seleccione Especialidad</option>
              {especialidades.map((especialidad) => (
                <option key={especialidad.especialidadId} value={especialidad.nombre}>
                  {especialidad.nombre}
                </option>
              ))}
            </select>
          )}
          {/* Select para regiones */}
          {selectedEspecialidad && (
            <select onChange={handleRegionChange} className="border p-2 w-full mb-4">
              <option value="">Seleccione Región</option>
              {regiones.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          )}
          {/* Select para comunas */}
          {selectedRegion && (
            <select onChange={handleComunaChange} className="border p-2 w-full mb-4">
            <option value="">Seleccione Comuna</option>
            {comunas.map((comuna, index) => (
              <option key={index} value={comuna}>
                {comuna}
              </option>
            ))}
          </select>
          )}
          {serviciosDisponibles.length > 0 && (
            <select onChange={e => setSelectedServicio(e.target.value)} className="border p-2 w-full mb-4">
              <option value="">Seleccione Servicio</option>
              {serviciosDisponibles.map((servicio, index) => (
                <option key={index} value={servicio}>
                  {servicio}
                </option>
              ))}
            </select>
          )}
        </div>
        {/* Footer Modal */}
        <div className="mt-auto flex justify-end">
          {/* Botón Cerrar */}
          <div class="p-4 md:p-5">
            <button type="submit" onClick={handleConfirm} class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Ver Horas disponibles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservaModal;
