import { Injectable } from '@nestjs/common';
import { Mail, MailType } from 'generated/prisma';
import { DataMessage } from './types/message';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MailService {
  constructor(private readonly prismaService: PrismaService) {}

  async get(idUser: string): Promise<Mail[]> {
    return await this.prismaService.mail.findMany({
      where: {
        idUser,
      },
    });
  }

  async performMailSending(
    dataMessage: DataMessage,
    mailType: MailType,
  ): Promise<void> {
    await this.sendMail(dataMessage, mailType);

    await this.persistMail(dataMessage, mailType);
  }

  private async sendMail(
    dataMessage: DataMessage,
    mailType: MailType,
  ): Promise<void> {
    const mail = this.buildMail(dataMessage, mailType);

    console.log(mail);
  }

  private async persistMail(
    dataMessage: DataMessage,
    mailType: MailType,
  ): Promise<void> {
    const mail = this.buildMail(dataMessage, mailType);

    await this.prismaService.mail.create({
      data: {
        idUser: dataMessage.idUser,
        mailDestination: dataMessage.idUser,
        mailContent: mail,
        mailType,
      },
    });
  }

  private buildMail(dataMessage: DataMessage, mailType: MailType): string {
    switch (mailType) {
      case MailType.paymentRegistered:
        return `Olá, ${dataMessage.idUser}!\n\nSeu pagamento foi registrado com sucesso!\n\nNúmero do pedido: ${dataMessage.orderNumber}\nValor do pedido: ${dataMessage.orderValue}`;
      case MailType.paymentConfirmed:
        return `Olá, ${dataMessage.idUser}!\n\nSeu pagamento foi confirmado com sucesso!\n\nNúmero do pedido: ${dataMessage.orderNumber}\nValor do pedido: ${dataMessage.orderValue}`;
      default:
        throw new Error('Invalid mail type');
    }
  }
}
