import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAdminMenuInput {
  @Field()
  menuName: string;

  @Field()
  url?: string;
}
