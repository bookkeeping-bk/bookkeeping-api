/**
 * @author: YouJie
 * @date: 2020-06-10 15:17:44
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { groupBy } from 'lodash';
import { Bill } from '@/models/bill.entity';
import { Utils } from '@/utils/index';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Bill) private readonly billRepo: Repository<Bill>,
  ) {}

  /**
   * 获取账单统计报表
   * @param queryParams
   */
  async getReport(queryParams: any) {
    const { begin, end } = queryParams;

    const bills = await this.billRepo
      .createQueryBuilder('bill')
      .leftJoinAndSelect('bill.billCategory', 'billCategory')
      .leftJoinAndSelect('bill.paymentSource', 'paymentSource')
      .leftJoinAndSelect('bill.user', 'user')
      .leftJoinAndSelect('bill.book', 'book')
      .where('bill.createdAt BETWEEN :begin AND :end', { begin, end })
      .orderBy('bill.createdAt', 'DESC')
      .getMany();

    const groupByCategory = groupBy(bills, 'billCategory.name');

    return Object.keys(groupByCategory).map(key => {
      const countMoney = groupByCategory[key].reduce((prev, cur) => {
        delete cur.user.password;
        cur.money = Utils.moneyFormat(cur.money, true).toFixed(2);
        return prev + parseFloat(cur.money);
      }, 0);

      return {
        billCategoryName: key,
        billCategoryType: groupByCategory[key][0].billCategory.type,
        billCategoryMoney: countMoney.toFixed(2),
        bills: groupByCategory[key],
      };
    });
  }
}
