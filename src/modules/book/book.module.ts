/**
 * @author: YouJie
 * @date: 2020-04-18 13:44:49
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Book } from '@/models/book.entity';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), AuthModule],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService],
})
export class BookModule {}
