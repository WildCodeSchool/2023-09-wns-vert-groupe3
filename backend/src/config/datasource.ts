import { DataSource } from "typeorm";

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
  synchronize: true,
  logging: ["error", "query"],
  migrations: [__dirname + "/migrations/*.{js, ts}"], // Déterminer à quel endroit on enregistre les fichiers de migrations afin de pouvoir les relire.
  migrationsRun: true // Assure l'application des migrations non encore appliquées à chaque connexion à la base de données.
});

export default dataSource;
