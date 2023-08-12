import { faker } from "@faker-js/faker";
import { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { Category } from "../entities/category.entity";
import { Comment } from "../entities/comment.entity";
import { Post } from "../entities/post.entity";

export class PostSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const categories = await em.find(Category, {});
    for (let i = 0; i < 10000; i++) {
      const post = em.create(Post, {
        title: faker.lorem.sentence(),
        category:
          categories[faker.number.int({ min: 0, max: categories.length - 1 })],
        body: faker.lorem.paragraph(),
        published: faker.datatype.boolean(),
      });

      const numberComments = faker.number.int({ min: 3, max: 8 });
      for (let k = 0; k <= numberComments; k++) {
        const comment = em.create(Comment, {
          body: faker.lorem.sentence(),
          post,
        });
        post.comments.add(comment);
      }

      em.persist(post);
    }

    await em.flush();
  }
}
