import { FaHeart } from "react-icons/fa6";

import {
  PRODUCT_INFORMATION,
  PRODUCT_UNAVAILABLE_DATES,
  USER_REQUESTED_RENT_DATES,
} from "@/data/fakeData";

import { convertToCurrency } from "@/utils/currency";
import { isDateRangeOverlap } from "@/utils/date";
import CardProductRentAvailabilityViewer from "@/components/cards/product-rent/CardProductRentAvailabilityViewer";


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
  }
}

const CardProductRent = ({
  name,
  description,
  picture,
  price,
}: CardProductRentProps) => {

  const isUnavailable = isDateRangeOverlap(USER_REQUESTED_RENT_DATES, PRODUCT_UNAVAILABLE_DATES);

  return (
    <article className="relative flex flex-col gap-4 rounded-md bg-lowcontrast p-4">
      <div className="flex gap-4">
        <section className="aspect-square h-full rounded-lg bg-zinc-300" />
        <div className="flex grow flex-col gap-10 text-hightcontrast">
          <div className="flex flex-col gap-3">
            <section className="flex flex-col gap-3">
              {/* ITEM FIRST ICONS */}
              <div className="flex items-center justify-end gap-3">
                <div className="flex aspect-square w-6 flex-col items-center justify-center rounded-full bg-zinc-100 text-danger">
                  <FaHeart />
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
              {/* ITEM MAIN INFOS */}
              <div className="flex flex-col border-l-4 border-warning px-3 py-1">
                <h1 className="text-lg font-semibold text-hightcontrast">
                  {name || <em>NO TITLE...</em>}
                </h1>
                {PRODUCT_INFORMATION?.tags && (
                  <ul className="flex gap-1">
                    {PRODUCT_INFORMATION.tags.map((tag, index) => (
                      <li
                        key={index}
                        className="rounded bg-neutral-200 px-3 py-1"
                      >
                        <p className="text-sm">{tag}</p>
                      </li>
                    ))}
                  </ul>
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
                {convertToCurrency(100).in("USD").valueWithSymbol} (+
                {convertToCurrency(1.5).in("USD").valueWithSymbol} par jours)
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
}


export default CardProductRent;