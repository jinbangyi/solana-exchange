import { BadRequestException, Injectable } from "@nestjs/common";
import { Role, User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import { PrismaService } from "@modules/internal/prisma/prisma.service";

import { RegistryDto } from "./dto/user.dto";
import { UserEntity } from "./interfaces/types";

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  // generate password hash
  async generatePasswordHash(password: string, salt?: string) {
    if (!salt) {
      salt = await bcrypt.genSalt();
    }
    const hash = await bcrypt.hash(password, salt);
    return { hash, salt };
  }

  getUserEntityFromUser(user: User): UserEntity {
    return {
      uuid: user.uuid,
      username: user.name,
      lastLoginAt: user.lastLoginAt,
      isAdmin: user.role === Role.ADMIN,
      role: user.role ?? Role.USER,
    };
  }

  private async getUserFromRegistryDto(
    registryDto: RegistryDto,
  ): Promise<User> {
    const { hash, salt } = await this.generatePasswordHash(
      registryDto.password,
    );
    const uuid = uuidv4();

    return {
      id: 0,
      uuid: uuid,
      name: registryDto.username,
      password: hash,
      salt,
      role: Role.USER,
      isActive: true,
      lastLoginAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async registry(registryDto: RegistryDto) {
    // generate password hash from md5 and salt
    const user = await this.getUserFromRegistryDto(registryDto);

    let createdUser: User;
    try {
      createdUser = await this.prismaService.user.create({
        data: user,
      });
    } catch (error) {
      if (error.code === "P2002") {
        throw new BadRequestException("Username already exists");
      } else {
        throw error;
      }
    }

    return this.getUserEntityFromUser(createdUser);
  }

  async findOne(username: string) {
    const findUser = await this.prismaService.user.findUniqueOrThrow({
      where: {
        name: username,
      },
    });

    return findUser;
  }

  async findUserByApiKey(apiKey: string) {
    const findUser = await this.prismaService.user.findFirstOrThrow({
      where: {
        ApiKeyAccount: {
          some: {
            key: apiKey,
          },
        },
      },
    });

    return findUser;
  }
}
