import { Field, InputType, Int } from '@nestjs/graphql';
import { IsAlpha, IsOptional, Length } from 'class-validator';
import { Publish } from '../../prisma/publish-type.enum';
import { Unit } from 'src/prisma/unit-type.enum';
import { EmailType } from 'src/prisma/email-type.enum';

@InputType()
export class CreateNotificationEmailInput {
  @Field()
  @IsAlpha()
  @Length(0, 255)
  emailAddress: string;

  @Field(() => Publish, { defaultValue: Publish.NO })
  @IsOptional()
  isPublished?: keyof typeof Publish;

  @Field({ nullable: true })
  battalionId?: number;

  @Field({ nullable: true })
  organogramWingId?: number;

  @Field(() => Unit, { defaultValue: Unit.HQ })
  @IsOptional()
  unit?: keyof typeof Unit;

  @Field(() => EmailType, { nullable: true })
  @IsOptional()
  emailType?: keyof typeof EmailType;
}
