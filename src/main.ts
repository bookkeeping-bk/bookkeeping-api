import 'dotenv/config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { AppModule } from './app.module';

const port = process.env.APP_PORT || 3000;

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.setGlobalPrefix(process.env.APP_VERSION_PREFIX);
  app.useStaticAssets('uploads', { prefix: '/uploads' });
  app.useGlobalInterceptors(new TransformInterceptor());
  // app.useGlobalFilters(new HttpExceptionFilter()); 全局验证管道

  const options = new DocumentBuilder()
    .setTitle(`${process.env.APP_NAME}后台API`)
    .setDescription(`${process.env.APP_NAME}后台API文档`)
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(process.env.APP_SWAGGER_URL, app, document);

  await app.listen(port);

  Logger.log(`Server running on http://localhost:${port}`, 'Bootstrap');
  Logger.log(
    `Swagger running on http://localhost:${port}/${process.env.APP_SWAGGER_URL}`,
    'Swagger',
  );
}

bootstrap();
