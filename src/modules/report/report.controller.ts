/**
 * @author: YouJie
 * @date: 2020-06-10 15:17:06
 */

import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Bill } from '@/models/bill.entity';
import { ReportService } from './report.service';

@Controller('report')
@ApiTags('统计报表')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  @ApiOperation({ summary: '获取统计报表' })
  @ApiQuery({ name: 'begin', type: 'string' })
  @ApiQuery({ name: 'end', type: 'string' })
  @ApiResponse({ type: Bill, status: 200 })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async getReport(@Query() query: object) {
    return await this.reportService.getReport(query);
  }
}
