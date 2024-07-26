import { useUserDatesResearch } from "contexts/UserDatesResearchContext";

import { ProductType } from "lib/graphql/queries";

import { daysBetweenDates, isProductUnavailableAtDates } from "utils/date";
import { RentBill, convertToCurrency } from "utils/currency";

import Button from "components/Button";

const ProductDtsPriceSidebar = ({ product }: { product: ProductType }) => {
  const { dates: userRequestedRentDates } = useUserDatesResearch();

  const totalRentDays = daysBetweenDates(
    userRequestedRentDates.start,
    userRequestedRentDates.end,
  );

  const rentBill = new RentBill(product.price_fixed);
  // Add the daily price for the total rent days
  rentBill.addDailyPrice(product.price_daily, totalRentDays);
  // Add discount if available
  rentBill.addDiscount(20);
  // Add accident protection
  rentBill.addVariant("Protection accident", 30);

  const allActiveRentsDates = product.rents?.map((item) => {
    return {
      quantity: item.quantity,
      from: new Date(item.rent.from),
      to: new Date(item.rent.to),
    };
  });

  console.log("allActiveRentsDates", product);

  const isUnavailable = isProductUnavailableAtDates(
    product.stock,
    userRequestedRentDates,
    allActiveRentsDates?.map((item) => {
      return {
        quantity: item.quantity,
        from: item.from,
        to: item.to,
      };
    }),
  );

  console.log("isUnavailable", isUnavailable);

  return (
    <aside
      role="complementary"
      className="-order-1 col-span-1 flex h-fit flex-col gap-5 rounded-xl border-2 border-hightcontrast border-opacity-5 p-5 lg:order-2"
    >
      <section className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">
            {convertToCurrency(product.price_fixed).in("EUR").valueWithSymbol}
          </h1>
          <p className="text-xs opacity-50">
            (+{convertToCurrency(product.price_daily).in("EUR").valueWithSymbol}{" "}
            / jours)
          </p>
        </div>
        <p className="rounded-full bg-primary px-4 py-1 text-sm text-white">
          20% off
        </p>
      </section>
      <hr className="border-t-2 border-hightcontrast border-opacity-5" />
      <section className="flex flex-col gap-2">
        <h2 className="font-bold opacity-50">Prix</h2>
        <ul className="flex flex-col gap-3 rounded-xl bg-hightcontrast bg-opacity-5 p-5">
          {rentBill.getTotalDetails().map((variant, index) => (
            <li key={index} className="flex justify-between">
              <p>{variant.name}</p>
              <p>
                {convertToCurrency(variant.price).in("EUR").valueWithSymbol}
              </p>
            </li>
          ))}
        </ul>
      </section>
      <section className="flex items-center justify-between gap-2">
        <h2 className="font-bold opacity-50">Total à payer</h2>
        <p className="font-bold">
          {convertToCurrency(rentBill.getTotal()).in("EUR").valueWithSymbol}
        </p>
      </section>
      <section className="flex flex-col gap-5">
        <Button aria-label="Ajouter au pannier" disabled={isUnavailable}>
          Je veux réserver ça !
        </Button>
        {!isUnavailable ? (
          <p className="text-center text-xs font-bold opacity-50">
            Vous ne serez pas débité pour le moment.
          </p>
        ) : (
          <p className="text-center text-xs font-bold text-danger">
            Désolé, ce produit n&apos;est pas disponible à ces dates. Veuillez
            choisir d&apos;autres dates.
          </p>
        )}
      </section>
    </aside>
  );
};

export default ProductDtsPriceSidebar;
