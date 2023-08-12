import { faker } from "@faker-js/faker";
import { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { Category } from "../entities/category.entity";

export class CategorySeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    for (let i = 0; i < 10; i++) {
      const category = em.create(Category, {
        name: faker.lorem.sentence(),
      });

      em.persist(category);
    }

    await em.flush();
  }
}
