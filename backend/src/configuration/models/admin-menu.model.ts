import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AdminMenu {
  @Field((type) => Int)
  id: number;

  @Field()
  menuName: string;

  @Field()
  url?: string;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updateAt?: Date;
}
