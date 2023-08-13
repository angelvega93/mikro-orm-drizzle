import { MikroORM } from "@mikro-orm/postgresql";
import { desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import client from "./drizzle/client";
import * as schema from "./drizzle/schema";
import MikroORMConfig from "./mikro-orm/config";
import { Post } from "./mikro-orm/entities/post.entity";

const main = async () => {
  const db = drizzle(client, { schema, logger: false });
  const orm = await MikroORM.init(MikroORMConfig);
  const em = orm.em.fork();

  console.time("MIKROORM");
  for (let i = 0; i <= 100; i++) {
    await em.find(
      Post,
      { published: true },
      { populate: ["category", "comments"], limit: 20 }
    );
  }
  console.timeEnd("MIKROORM");

  console.time("DRIZZLE");
  for (let i = 0; i <= 100; i++) {
    await db.query.post.findMany({
      with: { comments: { orderBy: desc(schema.comment.id) }, category: true },
      limit: 20,
    });
  }
  console.timeEnd("DRIZZLE");
  process.exit();
};

main();
