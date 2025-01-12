import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Check } from 'src/prisma/check-type.enum';

@ObjectType()
export class AdminPortalPermission {
  @Field((type) => Int)
  id: number;

  @Field((type) => Int)
  userId: number;

  @Field((type) => [Int])
  permissionId?: number[];

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updateAt?: Date;
}
