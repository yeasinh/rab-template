import { registerEnumType } from '@nestjs/graphql';

export enum UserType {
  ADMIN = 'ADMIN',
  OTHER = 'OTHER',
}

registerEnumType(UserType, { name: 'UserType', description: undefined });
