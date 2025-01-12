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
  uploadFileStream,
  deleteFileAndDirectory,
} from 'src/utils/file-upload.util';
import { Publication } from './models/publication.model';
import { CreatePublicationInput } from './dto/create-publication.input';
import { UpdatePublicationInput } from './dto/update-publication.input';

@Injectable()
export class PublicationService {
  private logger = new Logger('Publication  service');
  private uploadDir = join(process.env.UPLOAD_DIR, 'publication', 'images');

  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async create(
    createPublicationInput: CreatePublicationInput,
  ): Promise<Publication> {
    let publicationInputData = {
      ...createPublicationInput,
      publicationFilePath: null,
    };
    const publicationData: Publication =
      await this.prismaService.publications.create({
        data: { ...publicationInputData },
      });

    const imageFile: any = await createPublicationInput.publicationFilePath;
    const imagefileName = `${Date.now()}_${imageFile.filename}`;
    const filePath = await uploadFileStream(
      imageFile.createReadStream,
      this.uploadDir,
      imagefileName,
    );
    publicationInputData = {
      ...publicationInputData,
      publicationFilePath: await filePath,
    };

    await this.prismaService.publications.update({
      data: {
        ...publicationInputData,
      },
      where: {
        id: publicationData.id,
      },
    });

    publicationData.publicationFilePath =
      publicationInputData.publicationFilePath;
    this.logger.log(`Publication Data: ${publicationData}`);
    return publicationData;
  }

  async findAll(page, limit = 20): Promise<Publication[]> {
    return await this.prismaService.publications.findMany({ take: limit });
  }

  async findOne(id: number): Promise<Publication> {
    return await this.prismaService.publications.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    updatePublicationInput: UpdatePublicationInput,
  ): Promise<Publication> {
    try {
      const isPublicationExist: Publication =
        await this.prismaService.publications.findUnique({
          where: {
            id,
          },
        });
      if (isPublicationExist) {
        let publicationInputData = {
          ...updatePublicationInput,
          publicationFilePath: isPublicationExist.publicationFilePath,
        };
        if (
          isPublicationExist.publicationFilePath &&
          isPublicationExist.publicationFilePath
        ) {
          const prevlogofilePath =
            isPublicationExist.publicationFilePath.replace(
              `${process.env.BASE_URL}/`,
              '',
            );
          deleteFileAndDirectory(prevlogofilePath);

          const imageFile: any =
            await updatePublicationInput.publicationFilePath;
          const fileName = `${Date.now()}_${imageFile.filename}`;
          const uploadDir = join(
            this.uploadDir,
            `publication_file_${id}`,
            'images',
          );
          const filePath = await uploadFileStream(
            imageFile.createReadStream,
            uploadDir,
            fileName,
          );
          publicationInputData.publicationFilePath = await filePath;
        }
        const updatedPublicationData =
          await this.prismaService.publications.update({
            data: {
              ...publicationInputData,
            },
            where: {
              id,
            },
          });
        return updatedPublicationData;
      } else {
        throw new HttpException(
          'publication not exist',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (e) {
      throw new HttpException(`Error Updating publication: ${e}`, 500);
    }
  }

  async remove(id: number): Promise<Publication> {
    try {
      const isPublicationExist: Publication =
        await this.prismaService.publications.findUnique({
          where: {
            id,
          },
        });
      if (isPublicationExist) {
        await this.prismaService.publications.delete({
          where: {
            id,
          },
        });
        const logofilePath = isPublicationExist.publicationFilePath.replace(
          `${process.env.BASE_URL}/`,
          '',
        );
        deleteFileAndDirectory(logofilePath);

        return isPublicationExist;
      } else {
        throw new HttpException(
          'publication not exist',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (e) {
      throw new HttpException(`Error Deleting Publication: ${e}`, 500);
    }
  }
}
