import { registerEnumType } from '@nestjs/graphql';

export enum EmailType {
  QUICKCONTACT = 'QUICKCONTACT',
  OPINION = 'OPINION',
}

registerEnumType(EmailType, { name: 'EmailType', description: undefined });
