import "dotenv/config";

export default {
  host: process.env.host ?? "127.0.0.1",
  port: process.env.port ? parseInt(process.env.port) : 5432,
  user: process.env.user ?? "postgres",
  password: process.env.password,
  dbName: process.env.dbName ?? "postgres",
};
