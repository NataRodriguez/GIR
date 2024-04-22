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
          const isEnabled = day && isDayEnabled(day) && !isPast;
          const isEmpty = !day;
          const isSelected = day && selectedDate && day.getTime() === selectedDate.getTime();

          const styles = {
            base: 'w-28 h-28 flex items-center justify-center rounded-lg text-lg transition duration-200 ease-in-out border-2',
            initial: 'bg-blue-100 hover:bg-blue-200 border-blue-200 hover:border-blue-300 border-solid cursor-pointer',
            empty: 'hover:bg-white border-dashed border-gray-100 cursor-default',
            disabled: 'hover:bg-gray-100 text-gray-300 border-dashed border-gray-200 cursor-not-allowed',
            selected: 'bg-blue-800 hover:bg-blue-700 border-blue-900 text-white',
          };

          const styleStatus = isEmpty ? styles.empty : !isEnabled ? styles.disabled : isSelected ? styles.selected : styles.initial;

          return (
            <button
              key={index}
              disabled={!isEnabled}
              onClick={() => isEnabled ? setSelectedDate(day) : null}
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
    <div className="flex flex-col items-center w-full mt-4 mb-4 text-gray-600">
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
