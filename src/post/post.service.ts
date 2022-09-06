import { Injectable, NotFoundException } from '@nestjs/common';
import { Posts } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async createPost(createPostDto: CreatePostDto): Promise<Posts> {
    const { userId, title, content, password } = createPostDto;
    const hashedpassword = await bcrypt.hash(password, 10);

    // 날씨

    try {
      return await this.prisma.posts.create({
        data: { title, content, password: hashedpassword, user_id: userId },
      });
    } catch (err) {
      throw new NotFoundException('게시글을 생성하지 못했습니다.');
    }
  }
  // TODO: 비밀번호 일치하면 수정, 삭제
  // TODO: 조회, 최신글 순서(게시글 로드)
}
