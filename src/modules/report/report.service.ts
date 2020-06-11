/**
 * @author: YouJie
 * @date: 2020-06-10 15:17:44
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bill } from '@/models/bill.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Bill) private readonly billRepo: Repository<Bill>,
  ) {}

  /**
   * 获取统计报表
   * @param queryParams
   */
  async getReport(queryParams: any) {
    const { begin, end } = queryParams;

    const query = await this.billRepo
      .createQueryBuilder('bill')
      .where(`bill.createdAt BETWEEN '${begin}' AND '${end}'`)
      .getMany();

    // TODO:返回数据结构

    return query;
  }
}
