import { Body, Controller, HttpCode, Logger, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CreateUserDto, CreateUserResponseDto } from './dto';
import { UserService } from './user.service';

@ApiTags('User API')
@Controller('user')
export class UserController {
  private readonly logger = new Logger(`UserController`);
  constructor(private readonly userService: UserService) {}

  @HttpCode(201)
  @Post()
  @ApiOperation({
    summary: '회원 생성 API',
    description: '이름으로 회원을 생성한다.',
  })
  @ApiResponse({
    status: 201,
    description: '회원 생성 성공',
    type: CreateUserResponseDto,
  })
  @ApiBody({ type: CreateUserDto })
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
