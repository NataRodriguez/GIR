export default function SobreNosotros() {
  return (
    <section id="sobreNosotros" className="py-16 bg-gray-300 text-gray-800">
      <div className="flex flex-wrap items-center justify-around my-12">
        <div className="max-w-md p-5">
          <h2 className="text-3xl font-bold text-purple-700 mb-4">Nuestra Misión</h2>
          <p className="text-lg text-gray-700 mb-4">
            En el corazón de nuestra empresa palpita un compromiso inquebrantable con la innovación y la accesibilidad tecnológica. El Proyecto APT refleja nuestra pasión por diseñar y desarrollar software que transforme la eficiencia y organización en diversos entornos laborales.
          </p>
          <p className="text-lg text-gray-700">
            Como profesionales recién egresados, encaramos este desafío listos para aplicar conocimientos teóricos en un contexto real y significativo, contribuyendo a la optimización de procesos en múltiples sectores.
          </p>
        </div>
        <div className="max-w-md">
          <img src="/images/nosotros1.png" alt="Innovación" className="rounded-lg shadow-lg" />
        </div>
      </div>

      <div className="flex flex-wrap-reverse items-center justify-around my-12">
        <div className="max-w-md">
          <img src="/images/nosotros2.jpg" alt="Impacto Social" className="rounded-lg shadow-lg" />
        </div>
        <div className="max-w-md p-5">
          <h2 className="text-3xl font-bold text-purple-700 mb-4">Innovación e Impacto</h2>
          <p className="text-lg text-gray-700 mb-4">
            Nuestro enfoque se centra en la innovación tecnológica y el impacto social, desarrollando software que facilita la digitalización del país, ofreciendo herramientas de bajo costo y alta calidad.
          </p>
          <p className="text-lg text-gray-700">
            Este proyecto es una oportunidad invaluable para desarrollar y demostrar habilidades en programación, diseño UX/UI, gestión de proyectos y competencias interpersonales, preparándonos para sobresalir en el mundo laboral.
          </p>
        </div>
      </div>
    </section>
  );
}