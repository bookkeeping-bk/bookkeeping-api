/**
 * @author: YouJie
 * @date: 2020-04-25 20:24:31
 */

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BillCategory } from '@/models/bill_category.entity';
import { BillCategoryDto } from './bill-category.dto';

@Injectable()
export class BillCategoryService {
  constructor(
    @InjectRepository(BillCategory)
    private readonly billCategoryRepo: Repository<BillCategory>,
  ) {}

  /**
   * 获取账单分类列表
   * @param queryParams
   */
  async findAll(queryParams: any = {}) {
    const { currentPage = 1, pageSize = 10 } = queryParams;
    const query = this.billCategoryRepo
      .createQueryBuilder()
      .orderBy(`billCategory.created_at`, 'DESC');

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
   * 获取账单分类详情
   * @param id
   */
  async findById(id: number) {
    return await this.billCategoryRepo.findOne(id);
  }

  /**
   * 创建账单分类
   * @param billCategoryDto
   */
  async create(billCategoryDto: BillCategoryDto) {
    const { name } = billCategoryDto;
    const existBillCategory = await this.billCategoryRepo.findOne({
      where: { name },
    });

    if (existBillCategory) {
      throw new HttpException(
        '该账单分类已存在',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return await this.billCategoryRepo.save(
      await this.billCategoryRepo.create(billCategoryDto),
    );
  }

  /**
   * 更新账单分类
   * @param id
   * @param billCategoryDto
   */
  async updateById(id: number, billCategoryDto: BillCategoryDto) {
    const isVerify = await this.billCategoryRepo.findOne(id);
    const { name } = billCategoryDto;
    const existBillCategory = await this.billCategoryRepo.findOne({
      where: { name },
    });
    if (!isVerify) {
      throw new HttpException(
        '账单分类不存在',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (existBillCategory) {
      throw new HttpException(
        '该账单分类已存在',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    await this.billCategoryRepo.update(id, billCategoryDto);
  }

  /**
   * 删除账单分类
   * @param id
   */
  async deleteById(id: number) {
    const existBillCategory = await this.billCategoryRepo.findOne(id);
    if (!existBillCategory) {
      throw new HttpException(
        '账单分类不存在',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.billCategoryRepo.softDelete(id);
  }
}
