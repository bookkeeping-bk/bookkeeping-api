/**
 * @author: YouJie
 * @date: 2020-04-13 21:31:52
 */

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from '@/models/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration: true, 永久不过期
      secretOrKey: process.env.JWT_SECRET_KEY,
    } as StrategyOptions);
  }

  async validate({ id }) {
    return await this.userRepo.findOne(id);
  }
}
