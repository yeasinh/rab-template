import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { join } from 'path';
import { PrismaService } from 'src/prisma.service';
import {
  deleteFileAndDirectory,
  uploadFileStream,
} from 'src/utils/file-upload.util';
import { CreateMediaInput } from './dto/create-media.input';
import { Media } from './models/media.model';
import { UpdateMediaInput } from './dto/update-media.input';

@Injectable()
export class MediaService {
  private logger = new Logger('Slider service');

  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  uploadDir = process.env.UPLOAD_DIR;
  async create(createMediaInput: CreateMediaInput): Promise<Media> {
    try {
      let mediaInputData = {
        ...createMediaInput,
        mediaFilePath: null,
      };
      const mediaData: Media = await this.prismaService.medias.create({
        data: { ...mediaInputData },
      });
      const imageFile: any = await createMediaInput.mediaFilePath;
      const fileName = `${Date.now()}_${imageFile.filename}`;
      const uploadDir = join(
        this.uploadDir,
        `${createMediaInput.mediaType}_${mediaData.id}`,
        'images',
      );
      const filePath = await uploadFileStream(
        imageFile.createReadStream,
        uploadDir,
        fileName,
      );
      mediaInputData = {
        ...mediaInputData,
        mediaFilePath: await filePath,
      };
      await this.prismaService.medias.update({
        data: {
          ...mediaInputData,
        },
        where: {
          id: mediaData.id,
        },
      });
      mediaData.mediaFilePath = mediaInputData.mediaFilePath;
      this.logger.log(
        `${createMediaInput.mediaType} data creation:${mediaData}`,
      );
      return mediaData;
    } catch (e) {
      throw new HttpException(
        `Error creating ${createMediaInput.mediaType}: ${e}`,
        500,
      );
    }
  }

  async findAll(page, limit = 20): Promise<Media[]> {
    return await this.prismaService.medias.findMany({ take: limit });
  }

  async findOne(id: number): Promise<Media> {
    return await this.prismaService.medias.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateMediaInput: UpdateMediaInput): Promise<Media> {
    try {
      const isMediaExist: Media = await this.findOne(id);
      if (isMediaExist) {
        const updatedMediaData = await this.prismaService.medias.update({
          data: {
            ...updateMediaInput,
            mediaFilePath: isMediaExist.mediaFilePath,
          },
          where: {
            id,
          },
        });
        if (updateMediaInput.mediaFilePath) {
          let filePrefix = `${updateMediaInput.mediaType}_${id}`;
          if (isMediaExist?.mediaFilePath) {
            const prevfilePath = isMediaExist.mediaFilePath.replace(
              `${process.env.BASE_URL}/`,
              '',
            );
            const prevUploadDir = join(this.uploadDir, filePrefix, 'images');
            const prevUploadRoot = join(this.uploadDir, filePrefix);
            deleteFileAndDirectory(prevfilePath, prevUploadDir, prevUploadRoot);
          }
          const imageFile: any = await updateMediaInput.mediaFilePath;
          const fileName = `${Date.now()}_${imageFile.filename}`;
          const uploadDir = join(this.uploadDir, filePrefix, 'images');
          const filePath = await uploadFileStream(
            imageFile.createReadStream,
            uploadDir,
            fileName,
          );
          const mediData = {
            ...updatedMediaData,
            mediaFilePath: await filePath,
          };
          await this.prismaService.medias.update({
            data: {
              ...mediData,
            },
            where: {
              id,
            },
          });
          return mediData;
        }
        return updatedMediaData;
      } else {
        throw new HttpException(
          `${updateMediaInput.mediaType}  not exist`,
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (e) {
      throw new HttpException(
        `Error Updating ${updateMediaInput.mediaType}: ${e}`,
        500,
      );
    }
  }

  async remove(id: number): Promise<Media> {
    try {
      const isMediaExist: Media = await this.prismaService.medias.findUnique({
        where: {
          id,
        },
      });
      if (isMediaExist) {
        await this.prismaService.medias.delete({
          where: {
            id,
          },
        });
        const filePath = isMediaExist.mediaFilePath.replace(
          `${process.env.BASE_URL}/`,
          '',
        );
        const uploadDir = join(
          this.uploadDir,
          `${isMediaExist.mediaType}_${isMediaExist.id}`,
          'images',
        );
        const uploadRoot = join(
          this.uploadDir,
          `${isMediaExist.mediaType}_${isMediaExist.id}`,
        );
        deleteFileAndDirectory(filePath, uploadDir, uploadRoot);

        return isMediaExist;
      } else {
        throw new HttpException(
          `${isMediaExist.mediaType} not exist`,
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (e) {
      throw new HttpException(`Error Deleting media: ${e}`, 500);
    }
  }
}
