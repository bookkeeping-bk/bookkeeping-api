/**
 * @author: YouJie
 * @date: 2020-04-18 13:44:43
 */

import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiQuery,
  ApiParam,
  ApiOperation,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { Book } from '@/models/book.entity';
import { BookService } from './book.service';
import { BookDto } from './book.dto';

@Controller('books')
@ApiTags('账本功能')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  @ApiOperation({ summary: '获取账本列表' })
  @ApiQuery({ name: 'currentPage', type: 'number', example: 1 })
  @ApiQuery({ name: 'pageSize', type: 'number', example: 10 })
  @ApiCreatedResponse({ type: Book })
  async findAll(@Query() queryParams) {
    return await this.bookService.findAll(queryParams);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取指定账本' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiCreatedResponse({ type: Book })
  async findById(@Param('id') id) {
    return await this.bookService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: '创建账本' })
  @ApiCreatedResponse({ type: Book })
  @ApiCreatedResponse({ type: Book })
  async createBook(@Body(ValidationPipe) book: BookDto) {
    return this.bookService.createBook(book);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新账本' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiCreatedResponse({ type: Book })
  async updateById(@Param('id') id, @Body(ValidationPipe) book: BookDto) {
    return this.bookService.updateById(id, book);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除账本' })
  @ApiParam({ name: 'id', type: 'number' })
  async deleteById(@Param('id') id) {
    return this.bookService.deleteById(id);
  }
}
