import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { Upload } from './scalars/upload.scalar';
import { MediaModule } from './media/media.module';
import { PublicationModule } from './publication/publication.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigurationModule } from './configuration/configuration.module';

@Module({
  imports: [
    Upload,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      playground: true,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.schema.ts'),
        outputAs: 'class',
      },
      context: ({ req }) => ({ headers: req.headers }),
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('SECRET'),
        signOptions: {
          expiresIn: 3600,
        },
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
      serveStaticOptions: {
        extensions: ['jpg', 'jpeg', 'png', 'gif'],
        index: false,
      },
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get('EMAIL_HOST'),
          port: configService.get('EMAIL_PORT'),
          auth: {
            user: configService.get('EMAIL_USERNAME'),
            pass: configService.get('EMAIL_PASSWORD'),
          },
        },
      }),
    }),
    UserModule,
    MediaModule,
    PublicationModule,
    ConfigurationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
