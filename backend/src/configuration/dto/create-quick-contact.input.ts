import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional } from 'class-validator';

@InputType()
export class CreateQuickContactInput {
  @Field({ nullable: true })
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  mobileNo?: string;

  @Field({ nullable: true })
  @IsOptional()
  nid?: string;

  @Field()
  message: string;
}
