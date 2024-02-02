import CardProductRent from "@/components/cards/product-rent/CardProductRent";


export default function HomeHotProductsSection() {
  return (
    <section className="mt-32 flex flex-col gap-2">
      <h2 className="text-2xl font-bold">Les équipements stars</h2>
      <div className="grid grid-cols-2 gap-5">
        <CardProductRent />
        <CardProductRent />
      </div>
    </section>
  );
}