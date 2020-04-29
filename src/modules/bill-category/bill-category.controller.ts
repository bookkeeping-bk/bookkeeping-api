/**
 * @author: YouJie
 * @date: 2020-04-25 20:25:18
 */

import {
  Controller,
  Query,
  Get,
  Param,
  Post,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { BillCategory } from '@/models/bill_category.entity';
import { BillCategoryService } from './bill-category.service';
import { BillCategoryDto } from './bill-category.dto';

@Controller('bill-categorys')
@ApiTags('账单分类')
export class BillCategoryController {
  constructor(private readonly billCategoryService: BillCategoryService) {}

  @Get()
  @ApiOperation({ summary: '获取账单分类列表' })
  @ApiQuery({ name: 'currentPage', type: 'number', example: 1 })
  @ApiQuery({ name: 'pageSize', type: 'number', example: 10 })
  @ApiResponse({ type: BillCategory, status: 200 })
  async findAll(@Query() query) {
    return await this.billCategoryService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取账单分类详情' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ type: BillCategory, status: 200 })
  async findById(@Param('id') id: number) {
    return await this.billCategoryService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: '创建账单分类' })
  @ApiResponse({ type: BillCategory, status: 200 })
  async create(@Body(ValidationPipe) billCategoryDto: BillCategoryDto) {
    return await this.billCategoryService.create(billCategoryDto);
  }
}
