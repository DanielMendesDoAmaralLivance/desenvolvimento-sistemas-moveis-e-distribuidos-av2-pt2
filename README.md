# 📦 Serviço de Notificações - NestJS

Este projeto é um **serviço de notificações** construído com [NestJS](https://nestjs.com/), responsável por gerenciar toda a lógica relacionada a notificações em um sistema distribuído.

## 🧱 Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [RabbitMQ](https://www.rabbitmq.com/)
- [Prisma ORM](https://www.prisma.io/)

## ⚙️ Como Executar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/DanielMendesDoAmaralLivance/desenvolvimento-sistemas-moveis-e-distribuidos-av2-pt2
cd desenvolvimento-sistemas-moveis-e-distribuidos-av2-pt2
```

### 2. Crie o arquivo .env

```.env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
``` 
> 🔐 Certifique-se de ajustar usuario, senha, localhost e nome_do_banco conforme necessário.

### 3. Instale as dependências

```bash
pnpm i
```

### 4. Gere o cliente Prisma e aplique as migrations

```bash
npx prisma generate
npx prisma migrate deploy
```

### 5. Inicie o serviço

```bash
pnpm run start:dev
```
> O serviço estará disponível em: http://localhost:3001

## Testando com Postman

Existe uma collection do Postman para testar os endpoints da API.

### Importando a Collection

1. Abra o Postman.
2. Vá em Import.
3. Importe o arquivo .postman_collection.json disponível no projeto.