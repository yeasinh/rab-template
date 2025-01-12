import { registerEnumType } from '@nestjs/graphql';

export enum OthersType {
  INNOVATION = 'INNOVATION',
  APA = 'APA',
}

registerEnumType(OthersType, { name: 'OthersType', description: undefined });
