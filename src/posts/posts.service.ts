// src/posts/posts.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
  ) {}

  findAll() {
    return this.postRepo.find();
  }

  async findOne(id: number) {
    const post = await this.postRepo.findOneBy({ id });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  create(dto: CreatePostDto) {
    const post = this.postRepo.create(dto);
    return this.postRepo.save(post);
  }

  async update(id: number, dto: CreatePostDto) {
    const post = await this.findOne(id);
    const updated = this.postRepo.merge(post, dto);
    return this.postRepo.save(updated);
  }

  async remove(id: number) {
    const post = await this.findOne(id);
    return this.postRepo.remove(post);
  }
}
