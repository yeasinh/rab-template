import { Field, InputType, Int } from '@nestjs/graphql';
import { IsAlpha, IsOptional, Length } from 'class-validator';
import { Upload } from '../../scalars/upload.scalar';
import { Check } from 'src/prisma/check-type.enum';
import { Publish } from 'src/prisma/publish-type.enum';

@InputType()
export class UpdatePublicationInput {
  @Field((type) => Int)
  id: number;

  @Field()
  @IsAlpha()
  @Length(0, 255)
  titleBn: string;

  @Field()
  @IsAlpha()
  @Length(0, 255)
  titleEn: string;

  @Field()
  @IsAlpha()
  @Length(0, 255)
  authorNameBn: string;

  @Field()
  @IsAlpha()
  @Length(0, 255)
  authorNameEn: string;

  @Field()
  @IsAlpha()
  @Length(0, 255)
  publisherBn: string;

  @Field()
  @IsAlpha()
  @Length(0, 255)
  publisherEn: string;

  @Field()
  publicationYear: string;

  @Field(() => Upload, { description: 'Input for the Noc image files.' })
  publicationFilePath: Upload;

  @Field(() => Check, { defaultValue: Check.NO })
  isPreviewButton?: keyof typeof Check;

  @Field(() => Check, { defaultValue: Check.NO })
  isDownloadButton?: keyof typeof Check;

  @Field(() => Publish, { defaultValue: Publish.NO })
  @IsOptional()
  isPublished?: keyof typeof Publish;
}
