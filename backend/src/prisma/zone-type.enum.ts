import { registerEnumType } from '@nestjs/graphql';

export enum ZoneType {
  AREA = 'AREA',
  CAMP = 'CAMP',
  COMPANY = 'COMPANY',
}

registerEnumType(ZoneType, { name: 'ZoneType', description: undefined });
