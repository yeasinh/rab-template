import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { Upload } from '../../scalars/upload.scalar';
import { Publish } from '../../prisma/publish-type.enum';

@InputType()
export class UpdateAddsBannerInput {
  @Field((type) => Int)
  id: number;

  @Field(() => Publish, { defaultValue: Publish.NO })
  @IsOptional()
  isPublished?: keyof typeof Publish;

  @Field(() => Upload, { description: 'Input for the Adds Banner files.' })
  bannerFilePath: Upload;
}
