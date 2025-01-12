import { registerEnumType } from '@nestjs/graphql';

export enum DGType {
  FORMERDG = 'FORMERDG',
  MARTYRDG = 'MARTYRDG',
}

registerEnumType(DGType, { name: 'DGType', description: undefined });
