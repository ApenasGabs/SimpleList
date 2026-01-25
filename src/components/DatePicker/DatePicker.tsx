import { useRef } from "react";
import { DayPicker } from "react-day-picker";
import type { ReactElement } from "react";

import "react-day-picker/style.css";
import "./DatePicker.css";

interface DatePickerProps {
  value?: number;
  onChange: (date: number | undefined) => void;
  disabled?: boolean;
}

/**
 * Date picker component com daisyUI styling
 *
 * @param value - Timestamp em ms (undefined = sem data)
 * @param onChange - Callback quando data é selecionada
 * @param disabled - Desabilitar input
 */
export const DatePicker = ({
  value,
  onChange,
  disabled = false,
}: DatePickerProps): ReactElement => {
  const inputRef = useRef<HTMLInputElement>(null);
  const selectedDate = value ? new Date(value) : undefined;

  const handleDayClick = (date: Date): void => {
    // Limpar hora para ter apenas data
    date.setHours(0, 0, 0, 0);
    onChange(date.getTime());
    if (inputRef.current?.checked) {
      inputRef.current.checked = false;
    }
  };

  const handleClear = (): void => {
    onChange(undefined);
    if (inputRef.current?.checked) {
      inputRef.current.checked = false;
    }
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="dropdown">
      <input ref={inputRef} type="checkbox" className="hidden" disabled={disabled} />
      <button
        type="button"
        className="btn btn-sm btn-ghost gap-2"
        onClick={() => {
          if (inputRef.current) {
            inputRef.current.checked = !inputRef.current.checked;
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        {selectedDate ? formatDate(selectedDate) : "Data"}
      </button>

      <div className="dropdown-content bg-base-100 rounded-box shadow-lg p-4 border border-base-300 z-50 w-fit">
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={(date) => {
            if (date) handleDayClick(date);
          }}
          disabled={disabled}
          defaultMonth={selectedDate || new Date()}
        />

        {selectedDate && (
          <div className="mt-3 flex gap-2 justify-end pt-3 border-t border-base-300">
            <button
              type="button"
              className="btn btn-xs btn-ghost"
              onClick={() => {
                if (inputRef.current) {
                  inputRef.current.checked = false;
                }
              }}
            >
              Fechar
            </button>
            <button type="button" className="btn btn-xs btn-error" onClick={handleClear}>
              Limpar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
