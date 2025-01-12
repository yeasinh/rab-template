import { Field, InputType, Int } from '@nestjs/graphql';
import { Check } from 'src/prisma/check-type.enum';

@InputType()
export class CreatePermissionInput {
  @Field((type) => Int)
  menuId: number;

  @Field(() => Check, { defaultValue: Check.YES })
  viewPermission: keyof typeof Check;

  @Field(() => Check, { defaultValue: Check.NO })
  deletePermission: keyof typeof Check;

  @Field(() => Check, { defaultValue: Check.NO })
  editPermission: keyof typeof Check;
}
