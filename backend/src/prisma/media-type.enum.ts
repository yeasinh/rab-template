import { registerEnumType } from '@nestjs/graphql';
export enum MediaType {
  SLIDER = 'SLIDER',
  VEDIO = 'VEDIO',
  PHOTO = 'PHOTO',
  TVC = 'TVC',
}

registerEnumType(MediaType, { name: 'MediaType', description: undefined });
