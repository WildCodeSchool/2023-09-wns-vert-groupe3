"use client";

import React from "react";
import { useState } from "react";

import { TooltipProvider } from "@radix-ui/react-tooltip";
import { FaArrowLeft, FaArrowRight, FaEye } from "react-icons/fa6";

import {
  daysInMonth,
  getMonthsBetweenDates,
  getPrevAndNextDates,
} from "@/utils/date";
import {
  PRODUCT_UNAVAILABLE_DATES,
  USER_REQUESTED_RENT_DATES,
} from "@/data/fakeData";

import Tooltip from "@/components/ui/Tooltip";

// Function to get the month view for the rent availability viewer
function getRentMonthView(dateRange?: { start: Date; end: Date }) {
  if (!dateRange?.start || !dateRange?.end) return new Date();
  const monthsBetweenDates = getMonthsBetweenDates(dateRange);

  return monthsBetweenDates[0];
}

export default function CardProductRentAvailabilityViewer() {
  const [monthView, setMonthView] = useState<Date>(
    getRentMonthView(USER_REQUESTED_RENT_DATES),
  );

  const daysInActiveMonth: number = daysInMonth(
    (monthView.getMonth() + 1) as NumberOfMonths,
    monthView.getFullYear(),
  ); // Months are 0 indexed

  const handleNextMonth = () => {
    setMonthView(getPrevAndNextDates(monthView).next);
  };

  const handlePrevMonth = () => {
    setMonthView(getPrevAndNextDates(monthView).prev);
  };

  const goToASpecificMonth = (date: Date) => {
    setMonthView(date);
  }

  return (
    <>
      <div className="flex w-full gap-2">
        <div className="flex grow flex-col gap-2">
          <div className="flex gap-1">
            <button
              className="flex aspect-square w-8 items-center justify-center rounded bg-neutral-200 text-hightcontrast hover:opacity-50 transition-opacity"
              onClick={() => handlePrevMonth()}
            >
              <FaArrowLeft />
            </button>
            <ul className="grow flex min-h-9 items-center justify-start gap-1">
              <TooltipProvider delayDuration={100} skipDelayDuration={100}>
                {Array.from({ length: daysInActiveMonth }, (_, i) => i + 1).map(
                  (day, index) => {
                    console.log(
                      monthView.toLocaleDateString("fr-FR", {
                        month: "long",
                      }),
                    );

                    const date = new Date(
                      monthView.getFullYear(),
                      monthView.getMonth(),
                      day,
                    ); // Months are 0 indexed

                    // Check if the date is in the unavailable dates
                    const isUnavailable = PRODUCT_UNAVAILABLE_DATES.some(
                      (unavailableDate) => {
                        return (
                          date.toDateString() === unavailableDate.toDateString()
                        );
                      },
                    );

                    // Check if the date is in the user requested rent dates
                    const isRequested = USER_REQUESTED_RENT_DATES
                      ? date >= USER_REQUESTED_RENT_DATES.start &&
                        date <= USER_REQUESTED_RENT_DATES.end
                      : false;

                    return (
                      <Tooltip
                        key={index}
                        content={
                          <div className="flex flex-col items-center gap-2">
                            <div className="flex flex-col gap-1">
                              <p>
                                {day}{" "}
                                {monthView.toLocaleDateString("fr-FR", {
                                  month: "long",
                                })}{" "}
                                {monthView.getFullYear()}
                              </p>
                              {isRequested && (
                                <p className="text-primary">(Jour demandé)</p>
                              )}
                            </div>
                            {isUnavailable ? (
                              <div className="flex items-center justify-center rounded bg-danger px-3 py-1">
                                <p className="text-sm font-semibold text-white">
                                  Indisponible
                                </p>
                              </div>
                            ) : (
                              <div className="flex items-center justify-center rounded bg-success px-3 py-1">
                                <p className="text-sm font-semibold text-white">
                                  Disponible
                                </p>
                              </div>
                            )}
                          </div>
                        }
                      >
                        <li
                          className={`h-full grow rounded-sm ${isUnavailable ? "bg-danger" : "bg-neutral-100"} ${isRequested ? "border-[1.5px] border-primary" : ""}`}
                          aria-label={`${isUnavailable ? "Indisponible" : "Disponible"} le ${day} ${monthView.toLocaleDateString("fr-FR", { month: "long" })} ${monthView.getFullYear()}`}
                        ></li>
                      </Tooltip>
                    );
                  },
                )}
              </TooltipProvider>
            </ul>
            <button
              className="flex aspect-square w-8 items-center justify-center rounded bg-neutral-200 text-hightcontrast hover:opacity-50 transition-opacity"
              onClick={() => handleNextMonth()}
            >
              <FaArrowRight />
            </button>
          </div>
          <div className="flex items-center">
            <p className="basis-40 border-l-2 border-hightcontrast px-2 py-1 text-xs font-semibold capitalize text-hightcontrast opacity-70">
              {monthView.toLocaleDateString("fr-FR", {
                month: "long",
              })}{" "}
              {monthView.toLocaleDateString("fr-FR", {
                year: "numeric",
              })}
            </p>
            <div className="grow flex justify-center items-center">
              {monthView.toLocaleDateString("fr-FR", { month: "long", year: "numeric" }) != getRentMonthView(USER_REQUESTED_RENT_DATES).toLocaleDateString("fr-FR", { month: "long", year: "numeric" }) && (
                <div className="flex justify-center items-center gap-1 opacity-50 hover:opacity-20 transition-opacity">
                  <FaEye />
                  <button className="text-xs" onClick={() => goToASpecificMonth(getRentMonthView(USER_REQUESTED_RENT_DATES))}>Re-centrer</button>
                </div>
              )}
            </div>
            <p className="basis-40 border-r-2 border-hightcontrast px-2 py-1 text-xs font-semibold capitalize text-hightcontrast text-right opacity-70">
              {getPrevAndNextDates(monthView).next.toLocaleDateString("fr-FR", {
                month: "long",
              })}{" "}
              {getPrevAndNextDates(monthView).next.toLocaleDateString("fr-FR", {
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
