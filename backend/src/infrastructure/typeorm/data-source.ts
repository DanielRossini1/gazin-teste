import { DataSource } from "typeorm";
import { Nivel } from "../../domain/models/Nivel";

export const appDataSource = new DataSource({
  type: "postgres",
  host: "postgres",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "gazin",
  synchronize: true,
  logging: true,
  entities: [Nivel],
  subscribers: [],
  migrations: [],
});