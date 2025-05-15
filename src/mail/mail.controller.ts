import { Controller, Get, Query } from '@nestjs/common';
import { MailService } from './mail.service';
import { Mail, MailType } from 'generated/prisma';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { DataMessage } from './types/message';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get()
  async get(@Query('idUser') idUser: string): Promise<Mail[]> {
    return await this.mailService.get(idUser);
  }

  @MessagePattern('payment_registered')
  async readRegisteredPayment(
    @Payload() payload: any,
    @Ctx() context: RmqContext,
  ) {
    const dataMessage: DataMessage = JSON.parse(payload.message);

    await this.mailService.performMailSending(
      dataMessage,
      MailType.paymentRegistered,
    );

    this.ackMessage(context);
  }

  @MessagePattern('payment_confirmed')
  async readConfirmationPayment(
    @Payload() payload: any,
    @Ctx() context: RmqContext,
  ) {
    const dataMessage: DataMessage = JSON.parse(payload.message);

    await this.mailService.performMailSending(
      dataMessage,
      MailType.paymentConfirmed,
    );

    this.ackMessage(context);
  }

  private ackMessage(context: RmqContext): void {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage);
  }
}
