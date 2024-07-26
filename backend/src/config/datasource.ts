import { DataSource } from "typeorm";
// import { Migration1721926264177 } from "../database/migrations/1721926264177-migration";
// import path from 'path';

const dataSource = new DataSource({
  type: "postgres",
  //   url: "postgres://postgres:wildrent@db:5432/postgres",
  host: "db",
  //   host: "localhost",
  port: 5432,
  //   port: 5434,
  username: "postgres",
  password: "wildrent",
  database: "postgres",
  entities: ["src/entities/*.ts"],
  synchronize: false,
  logging: ["error", "query"],
  migrations: ["src/database/migrations/*.ts"], // Déterminer à quel endroit on enregistre les fichiers de migrations afin de pouvoir les relire.
  //   migrations: [path.join(__dirname, '../database/migrations/*.ts')],
  //   migrations: [Migration1721926264177],
  migrationsRun: true // Assure l'application des migrations non encore appliquées à chaque connexion à la base de données.
});

export default dataSource;
