export default function Contacto() {
  return (
    <section id="contacto" className="py-16 bg-gray-50 text-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-purple-700 mb-4">Integra GIR en tu Negocio</h2>
          <p className="text-lg text-gray-700">¿Listo para llevar tu gestión a otro nivel? Contáctanos para saber cómo GIR puede transformar tu operación.</p>
        </div>

        <form className="max-w-lg mx-auto bg-white rounded-lg p-8 shadow">
          <div className="mb-6">
            <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900">Nombre</label>
            <input type="text" id="nombre" name="nombre" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Juan Pérez" />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Correo Electrónico</label>
            <input type="email" id="email" name="email" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="juan@example.com" />
          </div>

          <div className="mb-6">
            <label htmlFor="mensaje" className="block mb-2 text-sm font-medium text-gray-900">Mensaje</label>
            <textarea id="mensaje" name="mensaje" rows="4" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Escribe tu mensaje aquí..."></textarea>
          </div>

          <button type="submit" className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Enviar Mensaje</button>
        </form>
      </div>
    </section>
  );
}