import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@/models/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) public readonly userRepo: Repository<User>,
  ) {}

  async register(user: User) {
    const { mobile } = user;
    const existUser = await this.userRepo.findOne({ where: { mobile } });
    if (existUser) {
      throw new HttpException('用户已存在', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const newUser = await this.userRepo.create(user);
    await this.userRepo.save(newUser);
  }
}
