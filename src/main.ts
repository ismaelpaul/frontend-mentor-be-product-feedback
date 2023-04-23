import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    cors({
      origin: ['http://127.0.0.1:5173/', 'http://localhost:5173'],
      credentials: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
