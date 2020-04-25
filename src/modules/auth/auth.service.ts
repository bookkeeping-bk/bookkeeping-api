import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '@/models/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 用户登录
   * @param user
   */
  async login(user: User) {
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
    await this.userRepo.update(existUser.id, {
      loginIp: await User.getPublicIPv4(),
      latestOnlineAt: new Date(),
    });

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

  /**
   * 用户注册
   * @param user
   */
  async register(user: User) {
    const { mobile } = user;
    const existMobile = await this.userRepo.findOne({ where: { mobile } });
    if (existMobile) {
      throw new HttpException('手机号已存在', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const newUser = await this.userRepo.create(user);
    await this.userRepo.save(newUser);
  }

  /**
   * 测试jwt功能
   */
  async testJwt() {
    const user = await this.userRepo.findOne(2);
    return user;
  }
}
