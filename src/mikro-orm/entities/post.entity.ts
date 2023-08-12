import {
  Collection,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  OptionalProps,
  PrimaryKey,
  Property,
  Rel,
} from "@mikro-orm/core";
import { Category } from "./category.entity";
import { Comment } from "./comment.entity";

@Entity()
export class Post {
  [OptionalProps]?: "published" | "approved" | "createdAt";

  @PrimaryKey()
  id!: number;

  @Index({
    name: "post_category_idx",
    expression:
      "CREATE INDEX post_category_idx ON post (category_id) WHERE published = true;",
  })
  @ManyToOne(() => Category, { name: "category_id" })
  category!: Rel<Category>;

  @Property({ nullable: true })
  title?: string;

  @Property({ columnType: "text", nullable: true })
  body?: string;

  @Property()
  published: boolean = false;

  @Property({ defaultRaw: "now()" })
  createdAt: Date = new Date();

  @OneToMany(() => Comment, (b) => b.post, { orderBy: { id: "DESC" } })
  comments = new Collection<Comment>(this);
}
