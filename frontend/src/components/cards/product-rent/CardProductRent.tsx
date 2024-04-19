import {
  PRODUCT_UNAVAILABLE_DATES,
  USER_REQUESTED_RENT_DATES,
} from "../../../data/fakeData";

import { useState } from "react";
import { convertToCurrency } from "utils/currency";
import { isDateRangeOverlap } from "utils/date";
import CardProductRentAvailabilityViewer from "../../../components/cards/product-rent/CardProductRentAvailabilityViewer";

import Heart from "react-animated-heart";

export type CardProductRentProps = {
  id: number;
  name: string;
  description: string;
  picture: string;
  price: number;
  quantity: number;
  created_at: string;
  updated_at: string;
  category: {
    id: number;
    name: string;
  };
};

const CardProductRent = ({
  name,
  description,
  picture,
  price,
  category,
}: CardProductRentProps) => {
  const isUnavailable = isDateRangeOverlap(
    USER_REQUESTED_RENT_DATES,
    PRODUCT_UNAVAILABLE_DATES,
  );

  const [isClick, setClick] = useState(false);

  const getCategoryColor = (categoryName: string) => {
    switch (categoryName) {
      case "Ski":
        return "bg-sky-300";
      case "Plongée":
        return "bg-blue-700";
      case "Randonnée":
        return "bg-green-600";
      case "Escalade":
        return "bg-amber-950";
      case "Camping":
        return "bg-yellow-600";

      default:
        return "bg-slate-500";
    }
  };

  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <article className="relative flex flex-col gap-4 rounded-md bg-lowcontrast p-4">
      <div className="flex gap-4">
        <section className="aspect-square h-full w-2/3 overflow-hidden rounded-lg bg-zinc-300">
          <img
            className="h-full w-full object-cover"
            src={picture}
            alt={picture}
          />
        </section>

        <div className="flex grow flex-col gap-10 text-hightcontrast">
          <div className="flex flex-col gap-3">
            <section className="flex flex-col gap-3">
              {/* ITEM FIRST ICONS */}
              <div className="flex items-center justify-end gap-3">
                <Heart isClick={isClick} onClick={() => setClick(!isClick)} />
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
              {/* ITEM MAIN INFOS */}
              <div className="flex flex-col border-l-4 border-warning px-3 py-1">
                <h1 className="text-lg font-semibold text-hightcontrast">
                  {name || <em>NO TITLE...</em>}
                </h1>
                {category && (
                  <p
                    className={` w-max cursor-pointer rounded px-2 py-1 text-sm transition-all duration-200 ease-in ${getCategoryColor(category.name)} ${isHovered ? "bg-indigo-500" : ""}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {category.name}
                  </p>
                )}
              </div>
            </section>

            <section className="flex h-10 flex-col gap-3">
              <p className="text-base font-medium opacity-70">
                {description || <em>NO DESCRIPTION...</em>}
              </p>
            </section>
          </div>
          <div className="flex grow basis-0 flex-col items-start justify-end">
            <section className="flex flex-col items-start justify-center">
              <p className="text-sm font-medium">
                {convertToCurrency(price).in("EUR").valueWithSymbol} (+
                {convertToCurrency(2.5).in("EUR").valueWithSymbol} par jours)
              </p>
              <p className="text-sm opacity-70">+ Item info, item info</p>
            </section>
          </div>
        </div>
      </div>
      <div className="inline-flex gap-3.5">
        <CardProductRentAvailabilityViewer />
      </div>
    </article>
  );
};

export default CardProductRent;
