/**
 * @author: YouJie
 * @date: 2020-05-25 13:53:05
 */

import {
  Controller,
  Post,
  UseInterceptors,
  Req,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { FilesUploadDto } from './file.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('file')
@ApiTags('文件上传')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @ApiOperation({ summary: '文件上传' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FilesUploadDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @UseInterceptors(AnyFilesInterceptor())
  uploadFiles(@UploadedFiles() files, @Req() req) {
    return Promise.all(this.fileService.uploadFiles(files, req));
  }
}
