import { registerEnumType } from '@nestjs/graphql';

export enum SocialMediaORWebsite {
  SOCIALMEDIA = 'SOCIALMEDIA',
  WEBSITE = 'WEBSITE',
}

registerEnumType(SocialMediaORWebsite, {
  name: 'SocialMediaORWebsite',
  description: undefined,
});
