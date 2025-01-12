import { registerEnumType } from '@nestjs/graphql';

export enum EmailTemplateType {
  REPORTCRIME = 'REPORTCRIME',
  QUICKCONTACT = 'QUICKCONTACT',
  OPINION = 'OPINION',
  CHANGEPASSWORD = 'CHANGEPASSWORD',
}

registerEnumType(EmailTemplateType, {
  name: 'EmailTemplateType',
  description: undefined,
});
