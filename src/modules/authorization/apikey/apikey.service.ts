import { Injectable } from "@nestjs/common";
import { UserEntity } from "@modules/authorization/user/interfaces/types";
import { PrismaService } from "@modules/internal/prisma/prisma.service";
import { ApiKeyAccount } from "@prisma/client";

@Injectable()
export class ApiKeyService {
  constructor(private readonly prismaService: PrismaService) {}

  async generateDefaultApiKey(user: UserEntity) {
    // generate apikey
    const apiKey = Math.random().toString(36).substring(2, 20);
    const apiKeyAccount: Pick<ApiKeyAccount, "key" | "rateLimit" | "isReadOnly"> = {
      key: apiKey,
      rateLimit: 100,
      isReadOnly: false,
    };

    await this.prismaService.apiKeyAccount.create({
      data: {
        ...apiKeyAccount,
        User: {
          connect: {
            uuid: user.uuid,
          },
        },
      },
    });
    return apiKeyAccount;
  }

  // get user's all apikey
  async findAll(user: UserEntity) {
    // TODO page, limit
    return this.prismaService.apiKeyAccount.findMany({
      where: {
        User: {
          uuid: user.uuid,
        },
      },
    });
  }
}
