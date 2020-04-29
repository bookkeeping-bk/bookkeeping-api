/**
 * @author: YouJie
 * @date: 2020-04-29 16:01:22
 */

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentSources } from '@/models/payment_sources.entity';
import { PaymentSourcesDto } from './payment-sources.dto';

@Injectable()
export class PaymentSourcesService {
  constructor(
    @InjectRepository(PaymentSources)
    private readonly paymentSourcesRepo: Repository<PaymentSources>,
  ) {}

  /**
   * 获取支付来源列表
   * @param queryParams
   */
  async findAll(queryParams: any = {}) {
    const { currentPage = 1, pageSize = 10 } = queryParams;
    const query = this.paymentSourcesRepo
      .createQueryBuilder()
      .orderBy(`paymentSources.created_at`, 'DESC');

    query.skip((currentPage - 1) * pageSize);
    query.take(pageSize);

    const [list, totalPage] = await query.getManyAndCount();
    return {
      list,
      currentPage: currentPage | 0,
      pageSize: pageSize | 0,
      totalPage,
    };
  }

  /**
   * 获取支付来源详情
   * @param id
   */
  async findById(id: number) {
    return await this.paymentSourcesRepo.findOne(id);
  }

  /**
   * 创建支付来源
   * @param paymentSources
   */
  async create(paymentSourcesDto: PaymentSourcesDto) {
    return await this.paymentSourcesRepo.save(
      await this.paymentSourcesRepo.create(paymentSourcesDto),
    );
  }

  /**
   * 更新支付来源
   * @param id
   * @param paymentSourcesDto
   */
  async updateById(id: number, paymentSourcesDto: PaymentSourcesDto) {
    const isVerify = await this.paymentSourcesRepo.findOne(id);
    if (!isVerify) {
      throw new HttpException(
        '支付来源不存在',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.paymentSourcesRepo.update(id, paymentSourcesDto);
  }

  /**
   * 删除账本
   * @param id
   */
  async deleteById(id: number) {
    const isVerify = await this.paymentSourcesRepo.findOne(id);
    if (!isVerify) {
      throw new HttpException(
        '支付来源不存在',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.paymentSourcesRepo.softDelete(id);
  }
}
