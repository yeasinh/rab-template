import { registerEnumType } from '@nestjs/graphql';

export enum GallaryType {
  PHOTO = 'PHOTO',
  VIDEO = 'VIDEO',
}

registerEnumType(GallaryType, { name: 'GallaryType', description: undefined });
