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

@Injectable()
export class BillService {
  constructor(
    @InjectRepository(Bill)
    private readonly billRepo: Repository<Bill>,
    private readonly billCategoryService: BillCategoryService,
    private readonly paymentSource: PaymentSourcesService,
  ) {}

  /**
   * 获取账单列表
   * @param queryParams
   */
  async findAll(queryParams: any = {}) {
    const { currentPage = 1, pageSize = 10 } = queryParams;
    const query = this.billRepo
      .createQueryBuilder('bill')
      .leftJoinAndSelect('bill.billCategory', 'billCategory')
      .leftJoinAndSelect('bill.paymentSource', 'paymentSource')
      .leftJoinAndSelect('bill.user', 'user')
      .orderBy('bill.createdAt', 'DESC');

    query.skip((currentPage - 1) * pageSize);
    query.take(pageSize);

    const [list, totalPage] = await query.getManyAndCount();
    return {
      list: list.map(item => ({
        ...item,
        money: Utils.moneyFormat(item.money, true),
      })),
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
    const bill = await this.billRepo.findOne(id);
    bill.money = Utils.moneyFormat(bill.money, true);
    return bill;
  }

  /**
   * 创建账单
   * @param billDto
   */
  async create(billDto: BillDto) {
    const createBill = await this.editBill(billDto);
    await this.billRepo.create(await this.billRepo.save(createBill));
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
    const existPaymentSource = await this.paymentSource.findById(
      billDto.paymentSourceId,
    );

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

    return {
      billCategory: existBillCategory,
      paymentSource: existPaymentSource,
      // FIXME: 优化
      user: { id: 1 },
      money: Utils.moneyFormat(billDto.money),
      images: billDto.images,
      remark: billDto.remark,
    };
  }
}
