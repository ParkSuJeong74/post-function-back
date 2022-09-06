import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Posts } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto, DeletePostDto, UpdatePostDto } from './dto';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async findPostById(id: string) {
    try {
      const post: Posts = await this.prisma.posts.findUnique({ where: { id } });
      return post;
    } catch (err) {
      throw new NotFoundException('게시글을 조회하지 못했습니다.');
    }
  }

  async createPost(createPostDto: CreatePostDto): Promise<Posts> {
    const { userId, title, content, password } = createPostDto;
    const hashedpassword = await bcrypt.hash(password, 10);

    // TODO: 날씨

    try {
      return await this.prisma.posts.create({
        data: { title, content, password: hashedpassword, user_id: userId },
      });
    } catch (err) {
      throw new NotFoundException('게시글을 생성하지 못했습니다.');
    }
  }

  async updatePost(id: string, updatePostDto: UpdatePostDto): Promise<Posts> {
    const { title, content, password } = updatePostDto;
    await this.isPwMatching(id, password);

    try {
      return await this.prisma.posts.update({
        where: { id },
        data: {
          title: title !== null ? title : undefined,
          content: content !== null ? content : undefined,
        },
      });
    } catch (err) {
      throw new NotFoundException('게시글을 수정하지 못했습니다.');
    }
  }

  async deletePost(deletePostDto: DeletePostDto) {
    const { id, password } = deletePostDto;
    await this.isPwMatching(id, password);

    try {
      await this.prisma.posts.delete({
        where: { id },
      });
    } catch (err) {
      throw new NotFoundException('게시글을 삭제하지 못했습니다.');
    }
  }

  async isPwMatching(id: string, password: string) {
    const post: Posts = await this.findPostById(id);
    const isPwCorrect: boolean = await bcrypt.compare(password, post.password);

    if (!isPwCorrect) {
      throw new ForbiddenException('비밀번호가 일치하지 않습니다.');
    }
  }

  // TODO: 게시글 로드
  async getPosts() {
    return await this.prisma.posts.findMany({
      orderBy: [{ createdAt: 'desc' }],
    });
  }
}
