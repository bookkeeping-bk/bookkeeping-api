/**
 * @author: YouJie
 * @date: 2020-04-29 16:01:07
 */

import {
  Controller,
  Query,
  Get,
  Param,
  Post,
  Body,
  ValidationPipe,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PaymentSources } from '@/models/payment_sources.entity';
import { PaymentSourcesService } from './payment-sources.service';
import { PaymentSourcesDto } from './payment-sources.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('payment-sources')
@ApiTags('支付来源')
export class PaymentSourcesController {
  constructor(private readonly paymentSourcesService: PaymentSourcesService) {}

  @Get()
  @ApiOperation({ summary: '获取支付来源列表' })
  @ApiQuery({ name: 'currentPage', type: 'number', example: 1 })
  @ApiQuery({ name: 'pageSize', type: 'number', example: 10 })
  @ApiResponse({ type: PaymentSources, status: 200 })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async findAll(@Query() query: object) {
    return this.paymentSourcesService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取支付来源详情' })
  @ApiResponse({ type: PaymentSources, status: 200 })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async findById(@Param('id') id: number) {
    return await this.paymentSourcesService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: '创建支付来源' })
  @ApiResponse({ type: PaymentSources, status: 200 })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async create(@Body(ValidationPipe) paymentSourcesDto: PaymentSourcesDto) {
    return await this.paymentSourcesService.create(paymentSourcesDto);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新支付来源' })
  @ApiResponse({ type: PaymentSources, status: 200 })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async updateById(
    @Param('id') id: number,
    @Body(ValidationPipe) paymentSourcesDto: PaymentSourcesDto,
  ) {
    return await this.paymentSourcesService.updateById(id, paymentSourcesDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除支付来源' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async deleteById(@Param('id') id: number) {
    return await this.paymentSourcesService.deleteById(id);
  }
}
