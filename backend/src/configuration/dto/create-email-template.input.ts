import { Field, InputType } from '@nestjs/graphql';
import { EmailTemplateType } from 'src/prisma/email-template-type.enum';

@InputType()
export class CreateEmailTemplateInput {
  @Field()
  subject: string;

  @Field()
  body: string;

  @Field(() => EmailTemplateType, { nullable: true })
  templateType?: keyof typeof EmailTemplateType;
}
