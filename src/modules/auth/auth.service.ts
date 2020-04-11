import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@/models/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) public readonly userRepo: Repository<User>,
  ) {}

  async register(user: User): Promise<void> {
    await this.userRepo.save(this.userRepo.create(user));
  }
}
