import postgres from "postgres";
import config from "./../config";

export default postgres({
  hostname: config.host,
  port: config.port,
  user: config.user,
  password: config.password,
  database: config.dbName,
});
