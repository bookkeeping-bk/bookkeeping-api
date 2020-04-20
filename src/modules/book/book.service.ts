/**
 * @author: YouJie
 * @date: 2020-04-18 13:38:43
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from '@/models/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly bookRepo: Repository<Book>,
  ) {}

  /**
   * 创建账本
   * @param book
   */
  async createBook(book: Book) {
    console.log(book);
  }
}
