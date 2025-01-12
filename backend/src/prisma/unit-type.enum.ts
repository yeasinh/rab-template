import { registerEnumType } from '@nestjs/graphql';

export enum Unit {
  DGOFFICE = 'DGOFFICE',
  HQ = 'HQ',
  BATTALION = 'BATTALION',
}

registerEnumType(Unit, { name: 'Unit', description: undefined });
