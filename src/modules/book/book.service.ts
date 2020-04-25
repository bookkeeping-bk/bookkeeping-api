/**
 * @author: YouJie
 * @date: 2020-04-18 13:38:43
 */

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '@/models/book.entity';
import { BookDto } from './book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly bookRepo: Repository<Book>,
  ) {}

  /**
   * 获取账本
   * @param book
   */
  async findAll(queryParams: any = {}) {
    const { currentPage = 1, pageSize = 5 } = queryParams;
    const query = this.bookRepo.createQueryBuilder().orderBy(`book.id`, 'DESC');

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
   * 获取指定账本
   * @param id
   */
  async findById(id) {
    return await this.bookRepo.findOne(id);
  }

  /**
   * 创建账本
   * @param book
   */
  async createBook(book: BookDto) {
    const { name } = book;
    const existBook = await this.bookRepo.findOne({ where: { name } });
    if (existBook) {
      throw new HttpException('账本已存在', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return await this.bookRepo.save(await this.bookRepo.create(book));
  }

  /**
   * 更新账本
   * @param book
   */
  async updateById(id, book: BookDto) {
    const isVerify = await this.bookRepo.findOne(id);
    const { name } = book;
    const existBook = await this.bookRepo.findOne({ where: { name } });
    if (!isVerify) {
      throw new HttpException('账本不存在', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    if (existBook) {
      throw new HttpException('账本已存在', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    await this.bookRepo.update(id, book);
  }

  async deleteById(id) {
    const existBook = await this.bookRepo.findOne(id);
    if (!existBook) {
      throw new HttpException('账本不存在', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    await this.bookRepo.softDelete(id);
  }
}
