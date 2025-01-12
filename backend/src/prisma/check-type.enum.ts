import { registerEnumType } from '@nestjs/graphql';

export enum Check {
  YES = 'YES',
  NO = 'NO',
}

registerEnumType(Check, { name: 'Check', description: undefined });
