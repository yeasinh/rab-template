import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateAdminMenuInput {
  @Field((type) => Int)
  id: number;

  @Field()
  menuName?: string;

  @Field()
  url?: string;
}
