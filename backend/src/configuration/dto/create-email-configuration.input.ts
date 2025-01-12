import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateEmailConfigurationInput {
  @Field()
  host: string;

  @Field()
  userName: string;

  @Field()
  port: number;

  @Field()
  password: string;

  @Field()
  email: string;
}
