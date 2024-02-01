import { DataSource } from "typeorm";

export default new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "postgres",
  password: "wildrent",
  database: "postgres",
  entities: ["src/entities/*.ts"],
  synchronize: true,
  logging: ["query", "error"],
});