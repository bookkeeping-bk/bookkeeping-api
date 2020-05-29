import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '@/models/user.entity';
import { LoginDto } from './auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 用户登录
   * @param user
   */
  async login(user: LoginDto) {
    const { mobile, password } = user;
    const existUser = await this.userRepo.findOne({ where: { mobile } });
    if (!existUser) {
      throw new HttpException(
        '该手机号尚未注册',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    if (!(await existUser.comparePassword(password))) {
      throw new HttpException('密码错误', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    // 更新登录IP和登录时间
    await this.userRepo.save(
      await this.userRepo.merge(existUser, {
        loginIp: await User.getPublicIPv4(),
        latestOnlineAt: new Date(),
      }),
    );

    // 删除密码返回前端
    delete existUser.password;
    return {
      token: this.jwtService.sign({
        id: existUser.id,
        mobile: existUser.mobile,
        username: existUser.username,
      }),
      user: { ...existUser },
    };
  }
}
