import { PRODUCT_UNAVAILABLE_DATES } from "../../../data/fakeData";

import Link from "next/link";
import { useState } from "react";

import { ProductType } from "lib/graphql/queries";

import { convertToCurrency } from "utils/currency";
import { isDateRangeOverlap } from "utils/date";

import { useUserDatesResearch } from "contexts/UserDatesResearchContext";

import Image from "next/image";
import CardProductRentAvailabilityViewer from "../../../components/cards/product-rent/CardProductRentAvailabilityViewer";

const CardProductRent = ({
  id,
  name,
  description_short,
  picture,
  price_fixed,
  price_daily,
  category,
}: ProductType) => {
  const { dates: userRequestedRentDates } = useUserDatesResearch();

  const isUnavailable = isDateRangeOverlap(
    userRequestedRentDates,
    PRODUCT_UNAVAILABLE_DATES,
  );

  const getCategoryColor = (categoryName: string) => {
    switch (categoryName) {
      case "Ski":
        return "bg-gradient-to-br from-sky-500 via-sky-500 to-indigo-500";
      case "Plongée":
        return "bg-gradient-to-br from-blue-700 via-blue-700 to-indigo-500";
      case "Randonnée":
        return "bg-gradient-to-br from-green-600 via-green-600 to-indigo-500";
      case "Escalade":
        return "bg-gradient-to-br from-amber-800 via-amber-800 to-indigo-500";
      case "Camping":
        return "bg-gradient-to-br from-yellow-600 via-yellow-600 to-indigo-500";
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
      <Link className="flex gap-4" href={`/products/${id}`}>
        <section className="relative aspect-square h-80 w-80 overflow-hidden rounded-lg bg-zinc-300">
          <Image
            fill
            src={picture}
            alt="Product picture"
            className="h-full w-full object-cover object-center"
          />
        </section>
        <div className="flex grow flex-col gap-10 text-hightcontrast">
          <div className="flex flex-col gap-3">
            <section className="flex flex-col gap-3">
              {/* ITEM FIRST ICONS */}
              <div className="flex items-center justify-end gap-3">
                {isUnavailable ? (
                  <div className="flex w-max items-center justify-center rounded bg-danger px-3 py-1">
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
                  <Link
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    href={`/products/category/${category.id}`}
                    className={` w-max cursor-pointer rounded px-2 py-1 text-sm ${isHovered ? "bg-indigo-500" : getCategoryColor(category.name)}`}
                  >
                    {category.name}
                  </Link>
                )}
              </div>
            </section>

            <section className="flex h-10 flex-col gap-3">
              <p className="text-base font-medium opacity-70">
                {description_short || <em>NO DESCRIPTION...</em>}
              </p>
            </section>
          </div>
          <div className="flex grow basis-0 flex-col items-start justify-end">
            <section className="flex flex-col items-start justify-center">
              <p className="text-sm font-medium">
                {convertToCurrency(price_fixed).in("EUR").valueWithSymbol} (+
                {convertToCurrency(price_daily).in("EUR").valueWithSymbol} par
                jours)
              </p>
              <p className="text-sm opacity-70">+ Item info, item info</p>
            </section>
          </div>
        </div>
      </Link>
      <div className="inline-flex gap-3.5">
        <CardProductRentAvailabilityViewer />
      </div>
    </article>
  );
};

export default CardProductRent;
