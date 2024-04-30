import Image from 'next/image';
import React, { useState } from 'react';
import ReservaModal from '../Modals/ReservaModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'

export default function Banner() {
    const [isModalOpen, setModalOpen] = useState(false); // Estado para controlar la visibilidad del modal

    return (
        <div className="relative bg-purple-200 h-screen flex items-center justify-start text-left p-10 w-full">
            <Image
                src="/images/bg-front.webp"
                alt="Fondo"
                width='1237'
                height='727'
                className="absolute inset-0 h-full w-full object-cover z-[0]" // Asegura que la imagen de fondo esté detrás del contenido
                priority={true}
            />

            <div className="z-10 max-w-lg bg-gray-300 ml-20 bg-opacity-75 p-6 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-purple-700 mb-4">Reserva de Citas</h1>
                <p className="mb-6 text-purple-600">Encuentra el horario perfecto para tu próxima cita con facilidad y comodidad.</p>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setModalOpen(true)}  // Abre el modal al hacer clic
                >
                    <FontAwesomeIcon icon={faCalendar} /> Reservar
                </button>
            </div>

            <ReservaModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />  // Componente Modal
        </div>
    );
};
