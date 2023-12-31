import { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { CategorySeeder } from "./category.seeder";
import { PostSeeder } from "./post.seeder";

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    return this.call(em, [CategorySeeder, PostSeeder]);
  }
}
