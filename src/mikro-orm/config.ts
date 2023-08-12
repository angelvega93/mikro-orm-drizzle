import { LoadStrategy, defineConfig } from "@mikro-orm/core";
import config from "./../config";

export default defineConfig({
  type: "postgresql",
  host: config.host,
  port: config.port,
  user: config.user,
  password: config.password,
  dbName: config.dbName,
  entities: ["./dist/mikro-orm/entities/*.entity.js"],
  entitiesTs: ["./src/mikro-orm/entities/*.entity.ts"],
  loadStrategy: LoadStrategy.JOINED,
  debug: false,
  seeder: {
    path: "./dist/mikro-orm/seeds",
    pathTs: "./src/mikro-orm/seeds",
    defaultSeeder: "DatabaseSeeder",
  },
});
