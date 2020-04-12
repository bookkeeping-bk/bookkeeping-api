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
    const existMobile = await this.userRepo.findOne({ where: { mobile } });
    if (existMobile) {
      throw new HttpException('手机号已存在', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const newUser = await this.userRepo.create(user);
    await this.userRepo.save(newUser);
  }
}
