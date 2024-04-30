import Contacto from '../Home/Contacto';

export default function ContactModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="relative bg-gray-50 rounded-lg shadow p-2 w-full max-w-lg max-h-full">
        <div className="modal">
          {/*Header Modal*/}
          <div className="flex items-center justify-between p-2 md:p-2 border-b rounded-t">
            <button type="button" onClick={onClose} className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Cerrar</span>
            </button>
          </div>
          {/*Body Modal*/}
          <div className="p-2 md:p-2">
            <Contacto />
          </div>
        </div>
      </div>
    </div>
  );
};