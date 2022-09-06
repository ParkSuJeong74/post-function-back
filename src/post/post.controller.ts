import { Body, Controller, HttpCode, Logger, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Posts } from '@prisma/client';
import { CreatePostDto, CreatePostResponseDto } from './dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  private readonly logger = new Logger(`PostController`);
  constructor(private readonly postService: PostService) {}

  @HttpCode(201)
  @Post()
  @ApiOperation({
    summary: '게시글 생성 API',
    description: '게시글 제목, 내용, 비밀번호로 게시글을 생성한다.',
  })
  @ApiResponse({
    status: 201,
    description: '게시글 생성 성공',
    type: CreatePostResponseDto,
  })
  @ApiBody({ type: CreatePostDto })
  async createPost(
    @Body() createPostDto: CreatePostDto,
  ): Promise<CreatePostResponseDto> {
    const post: Posts = await this.postService.createPost(createPostDto);
    this.logger.verbose('create post!');
    return {
      statusCode: 201,
      message: '게시글을 생성했습니다.',
      post: { title: post.title, content: post.content, weather: post.weather },
    };
  }

  // TODO: 비밀번호 일치하면 수정, 삭제
  // TODO: 조회, 최신글 순서(게시글 로드)
}
