import { DataSource } from "typeorm";
import { Nivel } from "../../domain/models/Nivel";
import { Developer } from "../../domain/models/Developer";

export const appDataSource = new DataSource({
  type: "postgres",
  host: "postgres",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "gazin",
  synchronize: true,
  logging: true,
  entities: [Nivel, Developer],
  subscribers: [],
  migrations: [],
});