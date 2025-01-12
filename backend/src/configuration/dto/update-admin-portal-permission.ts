import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateAdminPortalPersmissionInput {
  @Field((type) => Int)
  id: number;

  @Field((type) => Int)
  userId: number;

  @Field((type) => [Int])
  permissionId?: number[];
}
