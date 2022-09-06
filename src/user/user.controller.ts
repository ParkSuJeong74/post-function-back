import { Body, Controller, Logger, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto, CreateUserResponseDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(`UserController`);
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserResponseDto> {
    const user: User = await this.userService.createUser(createUserDto);
    this.logger.verbose('create user!');
    return {
      statusCode: 201,
      message: '회원을 생성했습니다.',
      user: { name: user.name },
    };
  }
}
