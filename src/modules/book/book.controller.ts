/**
 * @author: YouJie
 * @date: 2020-04-18 13:44:43
 */

import { Controller, Get, Query, Param } from '@nestjs/common';
import { ApiTags, ApiQuery, ApiParam, ApiOperation } from '@nestjs/swagger';
import { BookService } from './book.service';

@Controller('books')
@ApiTags('账本功能')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  @ApiOperation({ summary: '获取账本列表' })
  @ApiQuery({ name: 'currentPage', type: 'number', example: 1 })
  @ApiQuery({ name: 'pageSize', type: 'number', example: 10 })
  async findAll(@Query() queryParams) {
    return await this.bookService.findAll(queryParams);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取指定账本' })
  @ApiParam({ name: 'id', type: 'number' })
  async findById(@Param('id') id) {
    return await this.bookService.findById(id);
  }
}
