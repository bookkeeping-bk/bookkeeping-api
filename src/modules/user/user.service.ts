/**
 * @author: YouJie
 * @date: 2020-05-18 16:34:19
 */

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '@/models/user.entity';
import { RegisterDto, ChangePasswordDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 获取当前登录用户信息
   * @param token
   */
  async userInfo(token: string) {
    if (/Bearer/.test(token)) {
      // 不需要 Bearer，否则验证失败
      token = token.split(' ').pop();
    }
    const { id } = this.jwtService.decode(token) as any;
    return this.findById(id);
  }

  /**
   * 注册
   * @param registerDto
   */
  async register(registerDto: RegisterDto) {
    const { mobile } = registerDto;
    const existUser = await this.userRepo.findOne({ where: { mobile } });
    if (existUser) {
      throw new HttpException('手机号已存在', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    await this.userRepo.save(await this.userRepo.create(registerDto));
  }

  /**
   * 修改当前登录用户密码
   * @param token
   */
  async changePassword(token: string, changePasswordDto: ChangePasswordDto) {
    if (/Bearer/.test(token)) {
      // 不需要 Bearer，否则验证失败
      token = token.split(' ').pop();
    }
    const { id } = this.jwtService.decode(token) as any;
    const user = await this.userRepo.findOne(id);
    const { oldPassword, newPassword, checkPassword } = changePasswordDto;
    if (!(await user.comparePassword(oldPassword))) {
      throw new HttpException('原密码错误', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    if (newPassword !== checkPassword) {
      throw new HttpException(
        '两次密码不一致',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.userRepo.update(id, {
      password: User.encryptPassword(newPassword),
    });
  }

  /**
   * 获取用户信息
   * @param id
   */
  async findById(id: number) {
    const existUser = await this.userRepo.findOne(id);
    if (!existUser) {
      throw new HttpException('该用户不存在', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    delete existUser.password;
    return existUser;
  }
}
