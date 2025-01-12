import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Check } from 'src/prisma/check-type.enum';

@ObjectType()
export class Permission {
  @Field((type) => Int)
  id: number;

  @Field((type) => Int)
  menuId: number;

  @Field(() => Check, { defaultValue: Check.YES })
  viewPermission: keyof typeof Check;

  @Field(() => Check, { defaultValue: Check.NO })
  deletePermission: keyof typeof Check;

  @Field(() => Check, { defaultValue: Check.NO })
  editPermission: keyof typeof Check;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updateAt?: Date;
}
