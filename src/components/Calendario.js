import React, { useState } from 'react';

function Calendar({ horarios }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const daysOfWeek = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Ajustar para que la semana comience en lunes
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
    const dayOfWeek = day.getDay(); // Domingo = 0, Sábado = 6
    const adjustedDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek; // Ajustar para que el domingo sea 7
    return horarios.some(horario => horario.diaSemana === adjustedDayOfWeek);
  };

  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    const days = Array(firstDayOfMonth).fill(null);
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return (
      <div className="grid grid-cols-7 gap-4">
        {days.map((day, index) => {
          const isPast = day && day < new Date(new Date().setHours(0, 0, 0, 0));
          const isEnabled = day && isDayEnabled(day);
          const isSelected = day && selectedDate && day.getTime() === selectedDate.getTime();

          return (
            <button
              key={index}
              disabled={!isEnabled || isPast}
              onClick={() => isEnabled && !isPast && setSelectedDate(day)}
              className={`w-28 h-28 flex items-center justify-center rounded-lg text-lg transition duration-200 ease-in-out ${isPast || !isEnabled ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : isSelected ? 'bg-blue-500 text-white' : 'bg-white hover:bg-blue-100 cursor-pointer'} `}
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
    </div>
  );
}

export default Calendar;
