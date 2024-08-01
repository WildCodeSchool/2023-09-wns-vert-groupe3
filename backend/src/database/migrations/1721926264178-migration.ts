import { MigrationInterface, QueryRunner } from "typeorm";
import argon2 from "argon2";

export class Migration1721926264178 implements MigrationInterface {
   name = 'Migration1721926264178'

   public async up(queryRunner: QueryRunner): Promise<void> {


      // Insérer les données si la base de données est vide
      const adminUser = await queryRunner.query(`SELECT * FROM "user" WHERE role = 'admin'`);
      if (adminUser.length === 0) {
         await queryRunner.query(`
                         INSERT INTO "user" ("username", "email", "hashedPassword", "role") VALUES 
                         ('admin', 'admin@admin.com', '${await argon2.hash("admin")}', 'admin'),
                         ('admin1', 'admin1@admin.com', '${await argon2.hash("Wildrent!1")}', 'admin');
                     `);
      }

      const user1 = await queryRunner.query(`SELECT * FROM "user" WHERE role = 'user'`);
      if (user1.length === 0) {
         await queryRunner.query(`
                         INSERT INTO "user" ("username", "email", "hashedPassword", "role") VALUES 
                         ('user1', 'user1@user.com', '${await argon2.hash("Wildrent!1")}', 'user');
                     `);
      }

      const categories = await queryRunner.query(`SELECT * FROM "category"`);
      if (categories.length === 0) {
         await queryRunner.query(`
                         INSERT INTO "category" ("name") VALUES 
                         ('Ski'), 
                         ('Randonnée'), 
                         ('Camping'), 
                         ('Pêche'), 
                         ('Escalade'), 
                         ('Rafting');
                     `);
      }

      const products = await queryRunner.query(`SELECT * FROM "product"`);
      if (products.length === 0) {
         const categories = await queryRunner.query(`SELECT * FROM "category"`);

         const snowboardCategoryId = categories.find((cat: any) => cat.name === 'Ski').id;
         const tentCategoryId = categories.find((cat: any) => cat.name === 'Camping').id;
         const climbingCategoryId = categories.find((cat: any) => cat.name === 'Escalade').id;
         const backpackCategoryId = categories.find((cat: any) => cat.name === 'Randonnée').id;

         await queryRunner.query(`
            INSERT INTO "product" ("name", "description_short", "description_long", "picture", "price_fixed", "price_daily", "quantity", "categoryId") VALUES 
            ('Snowboard', 'Super snowboard à louer !', 'Ceci est une description d''un snowboard à louer ! Il est super cool et vous permettra de glisser en toute sécurité !', '{"https://images.unsplash.com/photo-1614358536373-1ce27819009e","https://images.unsplash.com/photo-1498146831523-fbe41acdc5ad"}', 199, 20, 5, ${snowboardCategoryId}),
            ('Tente', 'Superbe tente à louer !', 'Ceci est une description d''une tente à louer ! Elle est super cool et vous permettra de camper en toute sécurité !', '{"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4","https://images.unsplash.com/photo-1624923686627-514dd5e57bae"}', 149, 15, 8, ${tentCategoryId}),
            ('Materiel d''escalade', 'Super matériel d''escalade à louer !', 'Ceci est une description du matériel d''escalade à louer ! Il est super cool et vous permettra de grimper en toute sécurité !', '{"https://images.unsplash.com/photo-1586685256769-4e869a64f1eb","https://images.unsplash.com/photo-1630432328419-bee5f50d6390"}', 199, 20, 3, ${climbingCategoryId}),
            ('Sac de voyage', 'Super sac de voyage à louer !', 'Ceci est une description d''un sac de voyage à louer ! Il est super cool et vous permettra de voyager en toute sécurité !', '{"https://images.unsplash.com/photo-1622260614153-03223fb72052","https://images.unsplash.com/photo-1509762774605-f07235a08f1f"}', 99, 10, 11, ${backpackCategoryId});
        `);
      }
   }

   public async down(_queryRunner: QueryRunner): Promise<void> {

   }

}
