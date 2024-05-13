"use client";

import Button from "components/Button";
import Tabs, { TabItem } from "components/Tabs";
import Image from "next/image";

const ProductsIdPage = () => {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
      <article className="lg:col-span-2">
        <div className="grid min-h-96 grid-cols-3 gap-2 overflow-hidden rounded-xl">
          <div className="relative col-span-2">
            <Image
              fill
              src="https://via.placeholder.com/525"
              alt="product image"
              className="object-cover object-center"
            />
          </div>
          <div className="col-span-1 grid grid-rows-3 gap-2">
            <div className="relative">
              <Image
                fill
                src="https://via.placeholder.com/525"
                alt="product image"
                className="object-cover object-center"
              />
            </div>
            <div className="relative">
              <Image
                fill
                src="https://via.placeholder.com/525"
                alt="product image"
                className="object-cover object-center"
              />
            </div>
            <div className="relative">
              <Image
                fill
                src="https://via.placeholder.com/525"
                alt="product image"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">Product title</h1>
          <p className="opacity-70">Short descri text</p>
        </div>
        <section className="mt-8">
          <Tabs defaultValue="descri">
            <TabItem name="Description" keyId="descri">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere
                similique debitis obcaecati quidem officiis amet distinctio
                eveniet, tempora repudiandae animi hic, aperiam voluptatem
                incidunt ratione ipsa! Et veritatis quod consequatur minus
                distinctio eos enim, tempora mollitia beatae perferendis
                repellat assumenda quo sapiente, eaque illum. Eius dignissimos
                dolorem laboriosam blanditiis expedita non, reiciendis possimus
                vel magni soluta illum accusantium suscipit, ullam ut
                architecto, nostrum laborum et necessitatibus? Quis, expedita!
                Voluptas amet ad, a minima in unde vitae deleniti explicabo
                mollitia consectetur molestias dignissimos sed aspernatur itaque
                accusantium officiis sit omnis. Fugit rem nisi esse nemo
                asperiores molestiae. Temporibus consectetur autem excepturi?
              </p>
            </TabItem>
            <TabItem name="Features" keyId="features">
              <p>Features content</p>
            </TabItem>
          </Tabs>
        </section>
      </article>
      <aside
        role="complementary"
        className="-order-1 col-span-1 flex h-fit flex-col gap-5 rounded-xl border-2 border-hightcontrast border-opacity-5 p-5 lg:order-2"
      >
        <section className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">315€</h1>
            <p className="text-xs opacity-50">(+15€ / jours)</p>
          </div>
          <p className="rounded-full bg-primary px-4 py-1 text-sm text-white">
            20% off
          </p>
        </section>
        <hr className="border-t-2 border-hightcontrast border-opacity-5" />
        <section className="flex flex-col gap-2">
          <h2 className="font-bold opacity-50">Prix</h2>
          <ul className="flex flex-col gap-3 rounded-xl bg-hightcontrast bg-opacity-5 p-5">
            <li className="flex items-center justify-between">
              <span className="font-medium">5 jours</span>
              <span className="font-bold">305€</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="font-medium">Promo 20%</span>
              <span className="font-bold">-110€</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="font-medium">Protection accident</span>
              <span className="font-bold">30€</span>
            </li>
          </ul>
        </section>
        <section className="flex items-center justify-between gap-2">
          <h2 className="font-bold opacity-50">Total à payer</h2>
          <p className="font-bold">260€</p>
        </section>
        <section className="flex flex-col gap-5">
          <Button aria-label="Ajouter au pannier">Je veux réserver ça !</Button>
          <p className="text-center text-xs font-bold opacity-50">
            Vous ne serez pas débité pour le moment.
          </p>
        </section>
      </aside>
    </div>
  );
};

export default ProductsIdPage;
