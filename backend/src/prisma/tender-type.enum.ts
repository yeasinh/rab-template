import { registerEnumType } from '@nestjs/graphql';

export enum TenderType {
  RECENT = 'RECENT',
  ARCHIEVE = 'ARCHIEVE',
}

registerEnumType(TenderType, { name: 'TenderType', description: undefined });
