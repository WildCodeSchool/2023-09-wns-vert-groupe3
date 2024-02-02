import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import { daysInMonth } from "@/utils/date";
import { PRODUCT_UNAVAILABLE_DATES, USER_REQUESTED_RENT_DATES } from "@/data/fakeData";



export default function CardProductRentAvailabilityViewer() {  
  // const monthView = getRentMonth(); //TODO: get month from context
  const monthDays: number = daysInMonth(2, 2024); //TODO: get month from context

  return (
    <div className="w-full flex gap-2">
      <button className="flex aspect-square w-8 items-center justify-center rounded bg-neutral-200 text-hightcontrast">
        <FaArrowLeft />
      </button>
      <div className="grow flex flex-col gap-2">
        <ul className="grow flex items-center justify-start gap-1 min-h-9">
          {Array.from({ length: monthDays }, (_, i) => i + 1).map((day) => {
            const date = new Date(2024, 2, day);
            const isUnavailable = PRODUCT_UNAVAILABLE_DATES.some((d) => d.getDate() === date.getDate());
            const isRequested = date.getDate() >= USER_REQUESTED_RENT_DATES.start.getDate() && date.getDate() <= USER_REQUESTED_RENT_DATES.end.getDate();
            return (
              <li
                key={day}
                aria-label={`${isUnavailable ? "Indisponible" : isRequested ? "Demandé" : "Disponible"} le ${day} février 2024`}
                className={`grow h-full rounded-sm ${isUnavailable ? "bg-danger" : isRequested ? "bg-warning" : "bg-neutral-100"}`}
              >
                <p className="text-neutral-900 text-xs font-semibold">{day}</p>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center justify-between">
          <p className="text-hightcontrast text-xs font-semibold border-l-2 border-hightcontrast px-2 py-1 opacity-70">Janvier 2024</p>
          <p className="text-hightcontrast text-xs font-semibold border-r-2 border-hightcontrast px-2 py-1 opacity-70">Février 2024</p>
        </div>
      </div>
      <button className="flex aspect-square w-8 items-center justify-center rounded bg-neutral-200 text-hightcontrast">
        <FaArrowRight />
      </button>
    </div>
  );
}
