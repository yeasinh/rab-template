import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateFaqInput } from './dto/create-faq.input';
import { Faq } from './model/faq.model';
import { UpdateFaqInput } from './dto/update-faq.input';

@Injectable()
export class FaqService {
  private logger = new Logger('Faq Service');

  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async create(createFaqInput: CreateFaqInput): Promise<Faq> {
    try {
      const faqData: Faq = await this.prismaService.faqs.create({
        data: { ...createFaqInput },
      });
      this.logger.log(`Faq  data creation:${faqData}`);
      return faqData;
    } catch (e) {
      throw new HttpException(`Error creating Faq data: ${e}`, 500);
    }
  }

  async findAll(page, limit = 20): Promise<Faq[]> {
    return await this.prismaService.faqs.findMany({ take: limit });
  }

  async findOne(id: number): Promise<Faq> {
    return await this.prismaService.faqs.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateFaqInput: UpdateFaqInput): Promise<Faq> {
    try {
      const isFaqExist: Faq = await this.findOne(id);
      if (isFaqExist) {
        const updatedFaqData = await this.prismaService.faqs.update({
          data: {
            ...updateFaqInput,
          },
          where: {
            id,
          },
        });
        return updatedFaqData;
      } else {
        throw new HttpException(`Faq  not exist`, HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw new HttpException(`Error Updating Faq : ${e}`, 500);
    }
  }

  async remove(id: number): Promise<Faq> {
    try {
      const isFaqExist: Faq = await this.findOne(id);
      if (isFaqExist) {
        await this.prismaService.faqs.delete({
          where: {
            id,
          },
        });
        return isFaqExist;
      } else {
        throw new HttpException(`Faq not exist`, HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw new HttpException(`Error Deleting Faq: ${e}`, 500);
    }
  }
}
