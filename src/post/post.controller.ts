import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Posts } from '@prisma/client';
import {
  CreatePostDto,
  CreatePostResponseDto,
  DeletePostDto,
  DeletePostResponseDto,
  UpdatePostDto,
  UpdatePostResponseDto,
} from './dto';
import { PostService } from './post.service';

@ApiTags('Post API')
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

  @HttpCode(200)
  @Patch(':id')
  @ApiOperation({
    summary: '게시글 수정 API',
    description:
      '게시글 비밀번호의 일치 여부를 확인하고 제목이나 내용을 수정한다.',
  })
  @ApiResponse({
    status: 200,
    description: '게시글 수정 성공',
    type: UpdatePostResponseDto,
  })
  @ApiParam({ name: 'id', required: true, description: '게시글 아이디' })
  @ApiBody({ type: UpdatePostDto })
  async updatePost(
    @Param('id', ValidationPipe) id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<UpdatePostResponseDto> {
    const post: Posts = await this.postService.updatePost(id, updatePostDto);
    this.logger.verbose('update post!');
    return {
      statusCode: 200,
      message: '게시글을 수정했습니다.',
      post: { title: post.title, content: post.content },
    };
  }

  @HttpCode(200)
  @Delete()
  @ApiOperation({
    summary: '게시글 삭제 API',
    description: '게시글 비밀번호의 일치 여부를 확인하고 게시글을 삭제한다.',
  })
  @ApiResponse({
    status: 200,
    description: '게시글 삭제 성공',
    type: DeletePostResponseDto,
  })
  @ApiQuery({
    name: 'id',
    required: true,
    description: '게시글 아이디',
  })
  @ApiQuery({
    name: 'password',
    required: true,
    description: '게시글 비밀번호',
  })
  @ApiBody({ type: DeletePostDto })
  async deletePost(
    @Query() deletePostDto: DeletePostDto,
  ): Promise<DeletePostResponseDto> {
    await this.postService.deletePost(deletePostDto);
    this.logger.verbose('delete post!');
    return {
      statusCode: 200,
      message: '게시글을 삭제했습니다.',
    };
  }

  @HttpCode(200)
  @Get()
  async getPosts() {
    const posts = await this.postService.getPosts();
    this.logger.verbose('create post!');
    return {
      statusCode: 200,
      message: '게시글을 조회했습니다.',
      posts,
    };
  }
}
