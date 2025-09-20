"use client";

import { cn } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus} from "@fortawesome/free-solid-svg-icons";

const Accordion = ({ title, type, children, isOpened, handleAccordion }) => {
  return (
    <div className="border-b border-slate-300 last:border-0">
      <button
        type="button"
        onClick={() => handleAccordion(type)}
        aria-expanded={!!isOpened}
        aria-controls={`panel-${type}`}
        className="w-full flex items-center justify-between py-4"
      >
        <span className="text-base cursor-pointer font-semibold text-slate-900">{title}</span>
        <span
          className={cn("text-lg cursor-pointer text-slate-900 transition-transform duration-200")}
          aria-hidden="true"
        >
          <FontAwesomeIcon icon={isOpened ? faMinus : faPlus} />
        </span>
      </button>

      <div
        id={`panel-${type}`}
        className={cn(
          "overflow-hidden transition-[max-height] duration-300 ease-in-out",
          isOpened ? "max-h-96 pb-4" : "max-h-0"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
