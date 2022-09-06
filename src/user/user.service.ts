import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.prisma.user.create({
        data: { name: createUserDto.name },
      });
    } catch (err) {
      throw new NotFoundException('회원을 생성하지 못했습니다.');
    }
  }
}
