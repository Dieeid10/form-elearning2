import React from "react";
import { createPortal } from "react-dom";

export const SavingDataElement = () => {
  if (typeof window === "undefined") return null; // Previene errores en SSR

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex flex-col justify-center items-center pointer-events-auto">
      <div className="w-2/3 h-2/3 flex flex-col items-center justify-center bg-slate-200 rounded-lg shadow-lg shadow-[0_2px_8px_rgba(255,255,255,0.1)] gap-10">
        <span className="text-2xl">Cargando datos</span>
        <div className="flex items-end justify-center space-x-2 h-10">
            <span className="w-10 h-10 bg-blue-500 rounded-full animate-bounce [animation-delay:0s]" />
            <span className="w-10 h-10 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]" />
            <span className="w-10 h-10 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]" />
        </div>
      </div>
    </div>,
    document.body
  );
};