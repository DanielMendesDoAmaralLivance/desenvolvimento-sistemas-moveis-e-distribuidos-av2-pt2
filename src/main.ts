import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://admin:admin@localhost:5672'],
      queue: 'notification',
      queueOptions: {
        durable: true,
      },
    },
  });
  app.startAllMicroservices();

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
