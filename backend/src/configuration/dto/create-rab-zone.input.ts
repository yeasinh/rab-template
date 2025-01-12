import { Field, InputType } from '@nestjs/graphql';
import { IsAlpha, IsOptional, Length } from 'class-validator';
import { Publish } from '../../prisma/publish-type.enum';
import { ZoneType } from 'src/prisma/zone-type.enum';

@InputType()
export class CreateRabZoneInput {
  @Field()
  @IsAlpha()
  @Length(0, 255)
  nameBn: string;

  @Field()
  @IsAlpha()
  @Length(0, 255)
  nameEn: string;

  @Field(() => ZoneType, { defaultValue: ZoneType.AREA })
  @IsOptional()
  zoneType: keyof typeof ZoneType;

  @Field(() => Publish, { defaultValue: Publish.NO })
  @IsOptional()
  isPublished?: keyof typeof Publish;
}
