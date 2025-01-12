import { ObjectType, Field, Int } from '@nestjs/graphql';
import { pathFinderMiddleware } from 'src/middleware/pathFinderMiddleware';
import { Check } from 'src/prisma/check-type.enum';
import { Publish } from 'src/prisma/publish-type.enum';

@ObjectType()
export class Publication {
  @Field((type) => Int)
  id: number;

  @Field()
  titleBn: string;

  @Field()
  titleEn: string;

  @Field()
  authorNameBn: string;

  @Field()
  authorNameEn: string;

  @Field()
  publisherBn: string;

  @Field()
  publisherEn: string;

  @Field()
  publicationYear: Date;

  @Field({
    description: 'publication File',
    middleware: [pathFinderMiddleware],
    nullable: true,
  })
  publicationFilePath?: string;

  @Field(() => Check, { defaultValue: Check.NO })
  isPreviewButton: keyof typeof Check;

  @Field(() => Check, { defaultValue: Check.NO })
  isDownloadButton: keyof typeof Check;

  @Field(() => Publish, { defaultValue: Publish.NO })
  isPublished: keyof typeof Publish;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updateAt?: Date;
}
