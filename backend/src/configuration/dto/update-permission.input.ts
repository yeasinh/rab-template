import { Optional } from '@nestjs/common';
import { Field, InputType, Int } from '@nestjs/graphql';
import { Check } from 'src/prisma/check-type.enum';

@InputType()
export class UpdatePermissionInput {
  @Field((type) => Int)
  id: number;

  @Field((type) => Int)
  menuId: number;

  @Field(() => Check, { defaultValue: Check.YES })
  @Optional()
  viewPermission?: keyof typeof Check;

  @Field(() => Check, { defaultValue: Check.NO })
  @Optional()
  deletePermission?: keyof typeof Check;

  @Field(() => Check, { defaultValue: Check.NO })
  @Optional()
  editPermission?: keyof typeof Check;
}
