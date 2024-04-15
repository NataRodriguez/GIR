import React, { useState } from 'react';

function Calendar({ horarios }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const daysOfWeek = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    let firstDay = new Date(year, month, 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1;
  };

  // Navegación de meses
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Utilizando horarios para determinar la disponibilidad
  const isDayAvailable = (date) => {
    const dayOfWeek = date.getDay();
    return (horarios ?? []).some(horario => parseInt(horario.diaSemana.N) === (dayOfWeek === 0 ? 7 : dayOfWeek));
  };
  

  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const days = Array(firstDayOfMonth).fill(null).concat([...Array(daysInMonth).keys()].map(i => i + 1));

    return (
      <div className="grid grid-cols-7 gap-4">
        {days.map((day, index) => {
          const date = new Date(year, month, day);
          date.setHours(0, 0, 0, 0);
          const isPast = date < today;
          const isSelected = selectedDate && date.getTime() === selectedDate.getTime();
          const isAvailable = day && !isPast && isDayAvailable(date);

          return (
            <button
              key={index}
              disabled={!isAvailable}
              onClick={() => isAvailable && setSelectedDate(date)}
              className={`w-28 h-28 flex items-center justify-center rounded-lg text-lg transition duration-200 ease-in-out ${!isAvailable ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : isSelected ? 'bg-blue-500 text-white' : 'bg-white hover:bg-blue-100 cursor-pointer'} `}
            >
              {day || ''}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center w-full mt-4 mb-4 " >
      <div className="flex justify-between items-center w-1/2 mb-4 ">
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
    </div>
  );
}

export default Calendar;
