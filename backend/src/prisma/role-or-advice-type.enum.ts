import { registerEnumType } from '@nestjs/graphql';

export enum RoleAndAdvice {
  ROLE = 'ROLE',
  ADVICE = 'ADVICE',
  MISSION = 'MISSION',
  VISSION = 'VISSION',
}

registerEnumType(RoleAndAdvice, {
  name: 'RoleAndAdvice',
  description: undefined,
});
