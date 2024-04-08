// components/Footer.js
import React from 'react';

// components/Footer.js

const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          
          {/* Columna 1 */}
          <div className="w-4/12">
            <ul>
              <li><a href="#" className="hover:text-gray-300">Inicio</a></li>
              <li><a href="#" className="hover:text-gray-300">Acerca de</a></li>
              <li><a href="#" className="hover:text-gray-300">Servicios</a></li>
              <li><a href="#" className="hover:text-gray-300">Contacto</a></li>
            </ul>
          </div>
          
          {/* Columna 2 */}
          <div className="w-8/12 h-64 flex items-center justify-center">
            {/* Cuadrado de otro color con texto "Mapa de Google" */}
            <div className="bg-white text-black text-center p-8 rounded-lg">
              <p className="text-xl">Mapa de Google</p>
            </div>
          </div>
          
        </div>
      </footer>
    );
  };
  
  export default Footer;
  