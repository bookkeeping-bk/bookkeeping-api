/**
 * @author: YouJie
 * @date: 2020-04-30 16:33:19
 */

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Utils } from '@/utils/index';
import { Bill } from '@/models/bill.entity';
import { BillDto } from './bill.dto';
import { BillCategoryService } from '../bill-category/bill-category.service';
import { PaymentSourcesService } from '../payment-sources/payment-sources.service';
import { UserService } from '../user/user.service';

@Injectable()
export class BillService {
  constructor(
    @InjectRepository(Bill)
    private readonly billRepo: Repository<Bill>,
    private readonly billCategoryService: BillCategoryService,
    private readonly paymentSourcesService: PaymentSourcesService,
    private readonly userService: UserService,
  ) {}

  /**
   * 获取账单列表
   * @param queryParams
   */
  async findAll(queryParams: any = {}) {
    const { currentPage = 1, pageSize = 10, ...params } = queryParams;
    const query = this.billRepo
      .createQueryBuilder('bill')
      .leftJoinAndSelect('bill.billCategory', 'billCategory')
      .leftJoinAndSelect('bill.paymentSource', 'paymentSource')
      .leftJoinAndSelect('bill.user', 'user')
      .orderBy('bill.createdAt', 'DESC')
      .take(pageSize)
      .skip((currentPage - 1) * pageSize);

    if (params) {
      Object.keys(params).forEach(key => {
        query
          .andWhere(`bill.${key} LIKE :${key}`)
          .setParameter(`${key}`, `%${params[key]}%`);
      });
    }

    const [bills, totalPage] = await query.getManyAndCount();

    return {
      list: bills.map(bill => {
        delete bill.user.password;
        return {
          ...bill,
          money: Utils.moneyFormat(bill.money, true).toFixed(2),
        };
      }),
      ...(await this.getPayments(query)),
      currentPage: currentPage | 0,
      pageSize: pageSize | 0,
      totalPage,
    };
  }

  /**
   * 获取账单详情
   * @param id
   */
  async findById(id: number) {
    const query = this.billRepo
      .createQueryBuilder('bill')
      .leftJoinAndSelect('bill.billCategory', 'billCategory')
      .leftJoinAndSelect('bill.paymentSource', 'paymentSource')
      .leftJoinAndSelect('bill.user', 'user')
      .where('bill.id = :id', { id });
    const bill = await query.getOne();
    delete bill.user.password;
    return { ...bill, money: Utils.moneyFormat(bill.money, true).toFixed(2) };
  }

  /**
   * 创建账单
   * @param billDto
   */
  async create(billDto: BillDto) {
    const createBill = await this.editBill(billDto);
    return await this.billRepo.save(await this.billRepo.create(createBill));
  }

  /**
   * 更新账单
   * @param id
   * @param billDto
   */
  async updateById(id: number, billDto: BillDto) {
    const existBill = await this.billRepo.findOne(id);
    if (!existBill) {
      throw new HttpException('账单不存在', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const updateBill = await this.editBill(billDto);
    await this.billRepo.update(id, updateBill);
  }

  /**
   * 删除账本
   * @param id
   */
  async deleteById(id: number) {
    const existBill = await this.billRepo.findOne(id);
    if (!existBill) {
      throw new HttpException('账单不存在', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    await this.billRepo.softDelete(id);
  }

  /**
   * 创建和更新的公用方法
   * @param billDto
   */
  private async editBill(billDto: BillDto) {
    const existBillCategory = await this.billCategoryService.findById(
      billDto.billCategoryId,
    );
    const existPaymentSource = await this.paymentSourcesService.findById(
      billDto.paymentSourceId,
    );
    const existUser = await this.userService.findById(billDto.userId);

    if (!existBillCategory) {
      throw new HttpException(
        '账单分类不存在',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (!existPaymentSource) {
      throw new HttpException(
        '支付来源不存在',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (!existUser) {
      throw new HttpException('该用户不存在', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return {
      billCategory: existBillCategory,
      paymentSource: existPaymentSource,
      user: existUser,
      money: Utils.moneyFormat(billDto.money),
      images: billDto.images,
      remark: billDto.remark,
      recordAt: billDto.recordAt,
    };
  }

  /**
   * 获取当月收支总和
   * @param query
   */
  async getPayments(query) {
    const types = [
      { name: 'revenue', type: 1 },
      { name: 'expend', type: 2 },
    ];
    const payments = types.map(async type => {
      return await query
        .andWhere('billCategory.type = :type', { type: type.type })
        .select('SUM(bill.money)', `${type.name}`)
        .getRawOne();
    });
    const [revenue, expend] = await Promise.all(payments);

    return {
      revenue: Utils.moneyFormat(revenue.revenue, true).toFixed(2),
      expend: Utils.moneyFormat(expend.expend, true).toFixed(2),
    };
  }
}
