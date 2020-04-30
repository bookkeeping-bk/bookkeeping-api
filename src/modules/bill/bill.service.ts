/**
 * @author: YouJie
 * @date: 2020-04-30 16:33:19
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bill } from '@/models/bill.entity';

@Injectable()
export class BillService {
  constructor(
    @InjectRepository(Bill) private readonly billRepo: Repository<Bill>,
  ) {}

  /**
   * 获取账单列表
   * @param queryParams
   */
  async findAll(queryParams: any = {}) {
    const { currentPage = 1, pageSize = 10 } = queryParams;
    const query = this.billRepo
      .createQueryBuilder()
      .orderBy(`bill.created_at`, 'DESC');

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
}
