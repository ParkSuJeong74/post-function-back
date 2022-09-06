import { Controller, Logger } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(`UserController`);
  constructor(private readonly userService: UserService) {}

  // TODO: create user
  async createUser() {}
}
