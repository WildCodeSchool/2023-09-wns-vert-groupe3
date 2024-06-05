import { Category, Product } from "../src/entities";

export async function fillDatabaseIfEmpty() {
  // if no categories, create some categories
  const categories = await Category.find();
  if (categories.length === 0) {
    await Category.save([
      { name: "Ski" },
      { name: "Randonnée" },
      { name: "Camping" },
      { name: "Pêche" },
      { name: "Escalade" },
      { name: "Rafting" },
    ]);
  }

  // if no products, create some products
  const products = await Product.find();
  if (products.length === 0) {
    const categories = await Category.find();

    const snowboard = new Product();
    snowboard.category = categories[0];
    snowboard.name = "Snowboard";
    snowboard.description_short = "Super snowboard à louer !";
    snowboard.description_long = "Ceci est une description d'un snowboard à louer ! Il est super cool et vous permettra de glisser en toute sécurité !";
    snowboard.picture =
      "https://images.unsplash.com/photo-1498146831523-fbe41acdc5ad";
    snowboard.price_fixed = 199;
    snowboard.price_daily = 20;
    snowboard.quantity = 5;
    await snowboard.save();

    const tent = new Product();
    tent.category = categories[2];
    tent.name = "Tente";
    tent.description_short = "Superbe tente à louer !";
    tent.description_long = "Ceci est une description d'une tente à louer ! Elle est super cool et vous permettra de camper en toute sécurité !";
    tent.picture =
      "https://images.unsplash.com/photo-1624923686627-514dd5e57bae";
    tent.price_fixed = 149;
    tent.price_daily = 15;
    tent.quantity = 8;
    await tent.save();

    const climbing = new Product();
    climbing.category = categories[4];
    climbing.name = "Materiel d'escalade";
    climbing.description_short = "Super matériel d'escalade à louer !";
    climbing.description_long =
      "Ceci est une description du matériel d'escalade à louer ! Il est super cool et vous permettra de grimper en toute sécurité !";
    climbing.picture = "https://images.unsplash.com/photo-1630432328419-bee5f50d6390";
    climbing.price_fixed = 199;
    climbing.price_daily = 20;
    climbing.quantity = 3;
    await climbing.save();

    const backpack = new Product();
    backpack.category = categories[1];
    backpack.name = "Sac de voyage";
    backpack.description_short = "Super sac de voyage à louer !";
    backpack.description_long = "Ceci est une description d'un sac de voyage à louer ! Il est super cool et vous permettra de voyager en toute sécurité !";
    backpack.picture =
      "https://images.unsplash.com/photo-1509762774605-f07235a08f1f";
    backpack.price_fixed = 99;
    backpack.price_daily = 10;
    backpack.quantity = 11;
    await backpack.save();
  }
}
