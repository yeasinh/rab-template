import { Field, InputType } from '@nestjs/graphql';
import { Upload } from 'src/scalars/upload.scalar';

@InputType()
export class CreateEmailLogInput {
  @Field()
  subject: string;

  @Field()
  toEmail: string[];

  @Field()
  body: string;

  @Field(() => Upload, { description: 'Input for the attachments.' })
  attachments?: Upload;
}
