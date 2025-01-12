import { ObjectType, Field, Int } from '@nestjs/graphql';
import { pathFinderMiddleware } from 'src/middleware/pathFinderMiddleware';
import { Publish } from '../../prisma/publish-type.enum';
import { MediaType } from '../../prisma/media-type.enum';

@ObjectType()
export class Media {
  @Field((type) => Int)
  id: number;

  @Field()
  titleBn: string;

  @Field()
  titleEn: string;

  @Field()
  subTitleBn: string;

  @Field()
  subTitleEn: string;

  @Field({
    description: 'Media Image',
    middleware: [pathFinderMiddleware],
    nullable: true,
  })
  mediaFilePath: string;

  @Field(() => Publish, { defaultValue: Publish.NO })
  isPublished?: keyof typeof Publish;

  @Field(() => MediaType, { defaultValue: MediaType.SLIDER })
  mediaType?: keyof typeof MediaType;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updateAt?: Date;
}
