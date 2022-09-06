import { Body, Controller, HttpCode, Logger, Post } from '@nestjs/common';
import { CreatePostDto } from './dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  private readonly logger = new Logger(`PostController`);
  constructor(private readonly postService: PostService) {}

  @HttpCode(201)
  @Post()
  async createPost(@Body() createPostDto: CreatePostDto) {
    const post = await this.postService.createPost(createPostDto);
    this.logger.verbose('create post!');
    return {
      statusCode: 201,
      message: '게시글을 생성했습니다.',
      post: { title: post.title, content: post.content, weather: post.weather },
    };
  }
  // TODO: create post(비밀번호 설정, 날씨)
  // TODO: 비밀번호 일치하면 수정, 삭제
  // TODO: 조회, 최신글 순서(게시글 로드)
}
