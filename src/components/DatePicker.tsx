import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface DatePickerProps {
  onClose: () => void;
  onSelectDates: (checkIn: Date, checkOut: Date) => void;
}

export function DatePicker({ onClose, onSelectDates }: DatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const handleDateClick = (day: number) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(selectedDate);
      setCheckOut(null);
    } else if (selectedDate > checkIn) {
      setCheckOut(selectedDate);
    } else {
      setCheckIn(selectedDate);
      setCheckOut(null);
    }
  };

  const handleConfirm = () => {
    if (checkIn && checkOut) {
      onSelectDates(checkIn, checkOut);
      onClose();
    }
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const isDateInRange = (day: number) => {
    if (!checkIn || !checkOut) return false;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date > checkIn && date < checkOut;
  };

  const isDateSelected = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return (
      (checkIn && date.getTime() === checkIn.getTime()) ||
      (checkOut && date.getTime() === checkOut.getTime())
    );
  };

  const renderMonth = (monthOffset: number = 0) => {
    const displayMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset);
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(displayMonth);

    return (
      <div className="flex-1 min-w-[280px]">
        <div className="text-center mb-6">
          <h3 className="text-gray-900">
            {months[displayMonth.getMonth()]} {displayMonth.getFullYear()}
          </h3>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
            <div key={day} className="text-center text-xs text-gray-600 py-2">
              {day}
            </div>
          ))}

          {Array.from({ length: startingDayOfWeek }).map((_, index) => (
            <div key={`empty-${index}`} />
          ))}

          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const isSelected = isDateSelected(day);
            const inRange = isDateInRange(day);

            return (
              <motion.button
                key={day}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDateClick(day)}
                className={`aspect-square flex items-center justify-center rounded-full transition-colors ${
                  isSelected
                    ? 'bg-gray-900 text-white'
                    : inRange
                    ? 'bg-gray-100'
                    : 'hover:bg-gray-100'
                }`}
              >
                {day}
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl p-8 max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-gray-900 mb-2">Select dates</h2>
            <p className="text-sm text-gray-600">
              {checkIn && checkOut
                ? `${checkIn.toLocaleDateString()} - ${checkOut.toLocaleDateString()}`
                : 'Add your travel dates for exact pricing'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={previousMonth}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex gap-8 mb-8 overflow-x-auto">
          {renderMonth(0)}
          {renderMonth(1)}
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <button
            onClick={() => {
              setCheckIn(null);
              setCheckOut(null);
            }}
            className="text-gray-700 underline hover:text-gray-900"
          >
            Clear dates
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:border-gray-900 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={!checkIn || !checkOut}
              className="px-6 py-3 bg-[#FF385C] text-white rounded-lg hover:bg-[#E31C5F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
