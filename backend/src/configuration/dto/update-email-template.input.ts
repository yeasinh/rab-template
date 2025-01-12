import { Field, InputType, Int } from '@nestjs/graphql';
import { EmailTemplateType } from 'src/prisma/email-template-type.enum';

@InputType()
export class UpdateEmailTemplateInput {
  @Field((type) => Int)
  id: number;

  @Field()
  subject: string;

  @Field()
  body: string;

  @Field(() => EmailTemplateType, { nullable: true })
  templateType?: keyof typeof EmailTemplateType;
}
