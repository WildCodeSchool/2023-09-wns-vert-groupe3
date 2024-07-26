import Link from "next/link";
import { useState } from "react";

import { ProductType } from "lib/graphql/queries";

import { convertToCurrency } from "utils/currency";
import { isProductUnavailableAtDates } from "utils/date";

import { useCart } from "contexts/CartContext";
import { useUserDatesResearch } from "contexts/UserDatesResearchContext";

import { FaCartArrowDown } from "react-icons/fa6";

import CategoryLink from "components/CategoryLink";
import CardProductRentAvailabilityViewer from "../../../components/cards/product-rent/CardProductRentAvailabilityViewer";

const CardProductRent = ({
  id,
  name,
  stock,
  picture,
  price_fixed,
  price_daily,
  description_short,
  rents,
  category,
  quantity,
}: ProductType) => {
  const { dates: userRequestedRentDates } = useUserDatesResearch();

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const productToAdd = {
      id: Number(id),
      name,
      price_fixed,
      quantity: 1,
      picture,
    };
    addToCart(productToAdd);
  };

  // Compute all the unavailable dates for the product
  const allActiveRentsDates = rents?.map((item) => {
    return {
      quantity: item.quantity,
      from: new Date(item.rent.from),
      to: new Date(item.rent.to),
    };
  });

  const isUnavailable = isProductUnavailableAtDates(
    stock,
    userRequestedRentDates,
    allActiveRentsDates
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
        <section className="relative aspect-square h-80 w-80 overflow-hidden rounded-lg">
          <img
            src={picture[0]}
            alt={"Image de " + name}
            className="h-full w-full object-cover object-center"
          />
        </section>
        <div className="flex grow flex-col gap-10 text-hightcontrast">
          <div className="flex h-full flex-col gap-3">
            <section className="flex flex-col gap-3">
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
              <div className="flex flex-col border-l-4 border-warning px-3 py-1">
                <h1 className="text-lg font-semibold text-hightcontrast">
                  {name}
                </h1>
                {category && <CategoryLink category={category} />}
              </div>
            </section>

            <section className="flex flex-col gap-3">
              <p className="text-base font-medium opacity-70">
                {description_short}
              </p>
            </section>
          </div>
          <div className="flex grow basis-0 flex-col items-start justify-end">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleAddToCart();
              }}
              className="mb-2 flex w-fit items-center justify-center rounded bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600	"
            >
              Ajouter au panier <FaCartArrowDown className="ml-2" />
            </button>

            <section className="flex flex-col items-start justify-center">
              <p className="text-sm font-medium">
                {convertToCurrency(price_fixed).in("EUR").valueWithSymbol} (+{" "}
                {convertToCurrency(price_daily).in("EUR").valueWithSymbol} par
                jours)
              </p>
              <p className="text-sm opacity-70">
                Quantité restante : {quantity}
              </p>
            </section>
          </div>
        </div>
      </Link>
      <div className="inline-flex gap-3.5">
        <CardProductRentAvailabilityViewer
          stock={stock}
          allActiveRentsDates={allActiveRentsDates}
        />
      </div>
    </article>
  );
};

export default CardProductRent;
