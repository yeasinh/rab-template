import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Publish } from 'src/prisma/publish-type.enum';

@ObjectType()
export class Faq {
  @Field((type) => Int)
  id: number;

  @Field()
  titleBn: string;

  @Field()
  titleEn: string;

  @Field()
  descriptionBn: string;

  @Field()
  descriptionEn: string;

  @Field(() => Publish, { defaultValue: Publish.NO })
  isPublished?: keyof typeof Publish;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updateAt?: Date;
}
