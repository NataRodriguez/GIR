import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext.js';
import LoginModal from '../Modals/LoginModal.js';
import RegisterModal from '../Modals/RegisterModal.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const {user, logout} = useAuth();
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);

  const pathname = usePathname();
  const scrollToSection = (event) => {
    event.preventDefault();
    const sectionId = event.currentTarget.getAttribute("href").slice(1);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <nav id="inicio" className="bg-white shadow-lg text-white">
      <div className="max-w-6xl mx-auto px-4 border-b border-black">
        <div className="flex justify-between items-center py-4">
          {/* Logo y nombre de la empresa */}
          <a href="/" className="flex items-center">
            <img src="/images/logo.jpg" alt="Logo GIR" className="h-40 mr-2"/> {/* Asegúrate de tener este logo */}
            <span className="font-semibold text-xl">GIR</span>
          </a>

          {/* Menú primario */}
          {pathname === '/' && (
            <div className="hidden md:flex items-center space-x-5">
              <a href="#servicios" onClick={scrollToSection} className="text-black font-semibold hover:text-purple-800 cursor-pointer">Servicios</a>
              <a href="#sobreNosotros" onClick={scrollToSection} className="text-black font-semibold hover:text-purple-800 cursor-pointer">Sobre Nosotros</a>
              <a href="#contacto" onClick={scrollToSection} className="text-black font-semibold hover:text-purple-800 cursor-pointer">Contacto</a>
            </div>
          )}

          {/* Menú secundario */}
          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <div className='text-black'> 
                  <span>Bienvenido, {user.nombre}</span>
                </div>                
                <button onClick={() => window.location.href = '/cuenta'} className="bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded transition duration-300">
                  <FontAwesomeIcon icon={faCog} />
                </button>
                <button onClick={logout} className="bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded transition duration-300">
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setLoginOpen(true)} className="bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded transition duration-300">
                  Iniciar Sesión
                </button>
                <button onClick={() => setRegisterOpen(true)} className="bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded transition duration-300">
                  Registrarse
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <LoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} />
      <RegisterModal isOpen={isRegisterOpen} onClose={() => setRegisterOpen(false)} />
    </nav>
  );
}
