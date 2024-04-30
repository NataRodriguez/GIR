import { useState, useEffect } from 'react';
import SeleccionProfesionalModal from '../components/Modals/SeleccionProfesionalModal';

export default function Calendario({ horarios, reservaData }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfesionales, setSelectedProfesionales] = useState([]);
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState(null);

  const daysOfWeek = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

  useEffect(() => {
    // Esto garantiza que cuando el mes cambia, se renderiza el nuevo calendario.
    renderCalendarDays();
  }, [currentDate]); // Dependencia en currentDate para recalcular cuando cambia

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    let firstDay = new Date(year, month, 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1;
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const isDayEnabled = (day) => {
    const dayOfWeek = day.getDay();
    const adjustedDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    return horarios.some(prof => prof.horarios.some(horario => horario.diaSemana === adjustedDayOfWeek));
  };

  const handleDayClick = (day) => {
    const dayOfWeek = day.getDay();
    const adjustedDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    const profesionalesForDay = horarios.filter(prof =>
      prof.horarios && Array.isArray(prof.horarios) && prof.horarios.some(horario => horario.diaSemana === adjustedDayOfWeek)
    );
    setSelectedDayOfWeek(adjustedDayOfWeek);
    setSelectedProfesionales(profesionalesForDay);
    setSelectedDate(day);
    setIsModalOpen(true);
  };

  const closeProfessionalModal = () => {
    setIsModalOpen(false);
  };
  const onSelectProfessional = (professional) => {
    closeProfessionalModal();
    // Aquí puedes pasar a otra página o estado con las horas del profesional seleccionado
  };

  const dayIsPast = (day) => {
    return day < new Date(new Date().setHours(0, 0, 0, 0));
  };

  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    const days = Array(firstDayOfMonth).fill(null).concat([...Array(daysInMonth).keys()].map(day => new Date(year, month, day + 1)));

    return (
      <div className="grid grid-cols-7 gap-4">
        {days.map((day, index) => {
          const isPast = day && day < new Date(new Date().setHours(0, 0, 0, 0));
          const isEnabled = day && isDayEnabled(day) && !isPast;
          const isSelected = day && selectedDate && day.getTime() === selectedDate.getTime();

          const styles = {
            base: 'w-28 h-28 flex items-center justify-center rounded-lg text-lg transition duration-200 ease-in-out border-2',
            initial: 'bg-blue-100 hover:bg-blue-200 border-blue-200 hover:border-blue-300 border-solid cursor-pointer',
            disabled: 'hover:bg-gray-100 text-gray-300 border-dashed border-gray-200 cursor-not-allowed',
            selected: 'bg-blue-800 hover:bg-blue-700 border-blue-900 text-white',
          };

          const styleStatus = !day ? 'hover:bg-white border-dashed border-gray-100 cursor-default' : 
                           !isEnabled ? styles.disabled : 
                           isSelected ? styles.selected : styles.initial;

          return (
            <button
              key={index}
              disabled={!isEnabled || isPast}
              onClick={() => isEnabled && !isPast && handleDayClick(day)}
              className={`${styles.base} ${styleStatus}`}
            >
              {day ? day.getDate() : ''}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center w-full mt-4 mb-4">
      <div className="flex justify-between items-center w-1/2 mb-4">
        <button onClick={goToPreviousMonth} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
          &lt;
        </button>

        <span className="text-lg font-bold">{currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}</span>

        <button onClick={goToNextMonth} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
          &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 gap-4 mb-4">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="text-center font-bold w-28">
            {day}
          </div>
        ))}
      </div>

      {renderCalendarDays()}
      <SeleccionProfesionalModal
        isOpen={isModalOpen}
        onClose={closeProfessionalModal}
        professionals={selectedProfesionales}
        onSelectProfessional={onSelectProfessional}
        selectedDayOfWeek={selectedDayOfWeek}
        selectedDate={selectedDate}
        reservaData={reservaData}
      />
    </div>
  );
}