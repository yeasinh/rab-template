import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { graphqlUploadExpress } from 'graphql-upload';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(graphqlUploadExpress({ maxFileSize: 10000000000, maxFiles: 10 })); // 100000000 byte = 10 MB
  await app.listen(3000);
}
bootstrap();
