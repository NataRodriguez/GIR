import { useCallback } from 'react';

export default function ScrollToTop() {
  const scrollToTop = useCallback(() => {
    document.getElementById('inicio').scrollIntoView({ behavior: 'smooth' });
  }, []);
  return(
    <button onClick={scrollToTop} className="fixed bottom-5 right-5 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full shadow-lg z-50">
      Ir al Inicio
    </button>
  )
}
