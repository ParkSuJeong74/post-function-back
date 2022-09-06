import { IsJSON, IsString } from 'class-validator';
import { CommonResponseDto } from '../../commons/dto';

export class CreateUserDto {
  @IsString()
  name: string;
}

export class CreateUserResponseDto extends CommonResponseDto {
  @IsJSON()
  user: {
    name: string;
  };
}
