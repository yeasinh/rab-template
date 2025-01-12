import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateAdminPortalPersmissionInput {
  @Field((type) => Int)
  userId: number;

  @Field((type) => [Int])
  permissionId: number[];
}
