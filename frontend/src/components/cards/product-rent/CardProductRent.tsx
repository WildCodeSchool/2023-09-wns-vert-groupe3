import { LikeButton, Provider } from "@lyket/react";

import {
  PRODUCT_UNAVAILABLE_DATES,
  USER_REQUESTED_RENT_DATES,
} from "@/data/fakeData";

import CardProductRentAvailabilityViewer from "@/components/cards/product-rent/CardProductRentAvailabilityViewer";
import { convertToCurrency } from "@/utils/currency";
import { isDateRangeOverlap } from "@/utils/date";

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

  return (
    <article className="relative flex flex-col gap-4 rounded-md bg-lowcontrast p-4">
      <div className="flex gap-4">
        <section className="aspect-square h-full rounded-lg bg-zinc-300" />
        <div className="flex grow flex-col gap-10 text-hightcontrast">
          <div className="flex flex-col gap-3">
            <section className="flex flex-col gap-3">
              {/* ITEM FIRST ICONS */}
              <div className="flex items-center justify-end gap-3">
                <Provider apiKey="pt_d4c8b1b99dc99af8a7f81085b52c3c">
                  <LikeButton
                    namespace="testing-react"
                    id="everybody-like-now"
                    component={LikeButton.templates.Twitter}
                  />
                </Provider>
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
                <p className="w-max rounded bg-blue-200 px-2 py-1 text-sm">
                  {category.name}
                </p>
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
