import { Injectable, NotFoundException } from '@nestjs/common';
import { Posts } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto, UpdatePostDto } from './dto';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

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
    await this.isPwMatching(password);

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

  async deletePost() {}

  async isPwMatching(password: string) {
    // TODO: 비밀번호 일치한지 확인
  }

  // TODO: 조회, 최신글 순서(게시글 로드)
  async getPosts() {}
}
