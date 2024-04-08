import Image from 'next/image';
import React from 'react';

const Banner = () => {
    return (
        <div className="relative bg-purple-200 h-screen flex items-center justify-start text-left p-10">
            <Image 
                src="/images/bg-front.webp" 
                alt="Fondo" 
                layout="fill" 
                objectFit="cover" 
                className="z-[0]" // Asegura que la imagen de fondo esté detrás del contenido
            />

            <div className="z-10 max-w-lg bg-gray-300	ml-20 bg-opacity-75 p-6 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-purple-700 mb-4">Reserva de Citas</h1>
            <p className="mb-6 text-purple-600">Encuentra el horario perfecto para tu próxima cita con facilidad y comodidad.</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Reservar
            </button>
            </div>
        </div>
    );
  };
  
  export default Banner;