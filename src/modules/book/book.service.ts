/**
 * @author: YouJie
 * @date: 2020-04-18 13:38:43
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '@/models/book.entity';

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
  async createBook(book: Book) {
    console.log(book);
  }
}
