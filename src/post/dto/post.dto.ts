import { IsJSON, IsOptional, IsString, Matches } from 'class-validator';
import { CommonResponseDto } from '../../commons/dto';

export class CreatePostDto {
  @IsString()
  userId: string;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  @Matches(/^(?=.*?[0-9]).{6,}$/, {
    message: '비밀번호 양식에 맞게 작성하세요.',
  })
  password: string;
}

export class CreatePostResponseDto extends CommonResponseDto {
  @IsJSON()
  post: {
    title: string;
    content: string;
    weather: string;
  };
}

export class UpdatePostDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsOptional()
  @IsString()
  content: string;

  @IsString()
  password: string;
}

export class UpdatePostResponseDto extends CommonResponseDto {
  @IsJSON()
  post: {
    title: string;
    content: string;
  };
}

export class DeletePostDto {
  @IsString()
  id: string;

  @IsString()
  password: string;
}

export class DeletePostResponseDto extends CommonResponseDto {}
