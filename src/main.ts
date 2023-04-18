import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as path from 'path'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders:"*",
    origin: "*"
  });
  app.useGlobalGuards(); 

  const config = new DocumentBuilder()
  .setTitle('Respig API')
  .setDescription('Documentação responsável pelos endpoint do respig')
  .setVersion('v1')
  .addBearerAuth()
  .addTag('Mock')
  .addTag('User')
  .addTag('Role')
  .addTag('Report')
  .addTag('Auth')
  .build();

  console.log(path.join(process.cwd(), `/dist/migrations/*{.ts,.js}`))

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
