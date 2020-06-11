/**
 * @author: YouJie
 * @date: 2020-06-10 15:17:06
 */

import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ReportService } from './report.service';

@Controller('report')
@ApiTags('统计报表')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  @ApiOperation({ summary: '获取统计报表' })
  @ApiQuery({ name: 'begin', type: 'string' })
  @ApiQuery({ name: 'end', type: 'string' })
  async getReport(@Query() query: object) {
    return await this.reportService.getReport(query);
  }
}
