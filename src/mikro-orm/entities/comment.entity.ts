import {
  Entity,
  ManyToOne,
  OptionalProps,
  PrimaryKey,
  Property,
  Rel,
} from "@mikro-orm/core";
import { Post } from "./post.entity";

@Entity()
export class Comment {
  [OptionalProps]?: "createdAt";

  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  body?: string;

  @ManyToOne(() => Post, { name: "post_id", index: true })
  post?: Rel<Post>;

  @Property({ defaultRaw: "now()" })
  createdAt: Date = new Date();
}
