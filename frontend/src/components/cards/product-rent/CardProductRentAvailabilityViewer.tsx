"use client";

import React, { useState } from "react";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { FaArrowLeft, FaArrowRight, FaEye } from "react-icons/fa6";

import { useUserDatesResearch } from "contexts/UserDatesResearchContext";

import {
  daysInMonth,
  getMonthsBetweenDates,
  getPrevAndNextDates,
  isProductUnavailableAtDates,
  normalizeDate,
} from "utils/date";

import Tooltip from "components/ui/Tooltip";
import { cn } from "lib/utils";

// Function to get the month view for the rent availability viewer
function getRentMonthView(dateRange: { start?: Date; end?: Date }) {
  if (dateRange.start && dateRange.end) {
    const monthsBetweenDates = getMonthsBetweenDates(
      dateRange.start,
      dateRange.end,
    );
    return monthsBetweenDates[0];
  }

  return new Date();
}

export default function CardProductRentAvailabilityViewer({
  stock,
  allActiveRentsDates,
}: {
  stock: number;
  allActiveRentsDates?: {
    quantity: number;
    from: Date;
    to: Date;
  }[];
}) {
  const { dates: userRequestedRentDates } = useUserDatesResearch();

  const [monthView, setMonthView] = useState<Date>(
    getRentMonthView(userRequestedRentDates),
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
  };

  return (
    <>
      <div className="flex w-full gap-2">
        <div className="flex grow flex-col gap-2">
          <div className="flex gap-1">
            <button
              className="flex aspect-square w-8 items-center justify-center rounded bg-neutral-200 text-hightcontrast transition-opacity hover:opacity-50"
              onClick={() => handlePrevMonth()}
            >
              <FaArrowLeft />
            </button>
            <div className="relative flex grow">
              {monthView.toLocaleDateString("fr-FR", {
                month: "long",
                year: "numeric",
              }) ===
                getRentMonthView(userRequestedRentDates).toLocaleDateString(
                  "fr-FR",
                  { month: "long", year: "numeric" },
                ) && (
                <div
                  className="pointer-events-none absolute left-0 top-0 grid h-full w-full gap-1"
                  style={{
                    zIndex: 1,
                    gridTemplateColumns: `repeat(${daysInActiveMonth}, minmax(0, 1fr))`,
                  }}
                >
                  <div
                    className="-mx-0.5 rounded-md border border-solid border-blue-500 bg-blue-500 bg-opacity-20"
                    style={{
                      gridColumnStart:
                        userRequestedRentDates.start?.getDate() - 1,
                      gridColumnEnd: userRequestedRentDates.end?.getDate() + 1,
                    }}
                  />
                </div>
              )}
              <ul className="flex min-h-12 grow items-center justify-start gap-1 py-1.5">
                <TooltipProvider delayDuration={100} skipDelayDuration={100}>
                  {Array.from(
                    { length: daysInActiveMonth },
                    (_, i) => i + 1,
                  ).map((day, index) => {
                    const date = new Date(
                      monthView.getFullYear(),
                      monthView.getMonth(),
                      day,
                    ); // Months are 0 indexed

                    const normalizedDate = normalizeDate(date);

                    // Check if at this date, the product stock is exceeded
                    let totalRentedQuantity = 0;
                    if (allActiveRentsDates) {
                      allActiveRentsDates.forEach((rentDate) => {
                        const fromDate = normalizeDate(rentDate.from);
                        const toDate = normalizeDate(rentDate.to);

                        // Check if the current date is within the rent date range
                        if (
                          normalizedDate >= fromDate &&
                          normalizedDate <= toDate
                        ) {
                          totalRentedQuantity += rentDate.quantity;
                        }
                      });
                    }
                    const isUnavailable = totalRentedQuantity >= stock;

                    // Check if the date is in the user requested rent dates
                    const isRequested =
                      userRequestedRentDates.start && userRequestedRentDates.end
                        ? normalizedDate >= userRequestedRentDates.start &&
                          normalizedDate <= userRequestedRentDates.end
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
                          className={cn(
                            "h-full grow rounded-sm",
                            isUnavailable ? "bg-danger" : "bg-neutral-100",
                          )}
                          aria-label={`${isUnavailable ? "Indisponible" : "Disponible"} le ${day} ${monthView.toLocaleDateString("fr-FR", { month: "long" })} ${monthView.getFullYear()}`}
                        ></li>
                      </Tooltip>
                    );
                  })}
                </TooltipProvider>
              </ul>
            </div>
            <button
              className="flex aspect-square w-8 items-center justify-center rounded bg-neutral-200 text-hightcontrast transition-opacity hover:opacity-50"
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
            {userRequestedRentDates && (
              <div className="flex grow items-center justify-center">
                {monthView.toLocaleDateString("fr-FR", {
                  month: "long",
                  year: "numeric",
                }) !=
                  getRentMonthView(userRequestedRentDates).toLocaleDateString(
                    "fr-FR",
                    { month: "long", year: "numeric" },
                  ) && (
                  <div className="flex items-center justify-center gap-1 opacity-50 transition-opacity hover:opacity-20">
                    <FaEye />
                    <button
                      className="text-xs"
                      onClick={() =>
                        goToASpecificMonth(
                          getRentMonthView(userRequestedRentDates),
                        )
                      }
                    >
                      Re-centrer
                    </button>
                  </div>
                )}
              </div>
            )}
            <p className="basis-40 border-r-2 border-hightcontrast px-2 py-1 text-right text-xs font-semibold capitalize text-hightcontrast opacity-70">
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
