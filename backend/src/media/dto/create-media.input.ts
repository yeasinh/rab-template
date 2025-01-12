import { InputType, Field } from '@nestjs/graphql';
import { IsAlpha, IsOptional, Length } from 'class-validator';
import { Upload } from 'src/scalars/upload.scalar';
import { Publish } from '../../prisma/publish-type.enum';
import { MediaType } from 'src/prisma/media-type.enum';

@InputType()
export class CreateMediaInput {
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
  subTitleBn: string;

  @Field()
  @IsAlpha()
  @Length(0, 255)
  subTitleEn: string;

  @Field(() => Publish, { defaultValue: Publish.NO })
  @IsOptional()
  isPublished?: keyof typeof Publish;

  @Field(() => MediaType, { defaultValue: MediaType.SLIDER })
  mediaType: keyof typeof MediaType;

  @Field(() => Upload, { description: 'Input for the media files.' })
  @IsAlpha()
  @Length(0, 255)
  mediaFilePath: Upload;
}
