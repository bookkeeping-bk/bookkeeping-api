/**
 * @author: YouJie
 * @date: 2020-04-13 21:31:52
 */

import { Injectable, UnauthorizedException } from '@nestjs/common';
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
      secretOrKey: process.env.JWT_SECRET_KEY,
    } as StrategyOptions);
  }

  async validate(payload: User) {
    const { username } = payload;
    const user = this.userRepo.find({ where: { username } });
    if (!user) {
      throw new UnauthorizedException('身份验证失败');
    }
    return user;
  }
}
