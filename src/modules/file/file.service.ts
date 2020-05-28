/**
 * @author: YouJie
 * @date: 2020-05-25 14:05:11
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from '@/models/file.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File) private readonly fileRepo: Repository<File>,
  ) {}

  /**
   * 上传图片
   * @param files
   * @param req
   */
  uploadFiles(files, req) {
    return files.map(async file => {
      await this.fileRepo.save(
        await this.fileRepo.create({
          originalName: file.originalname,
          fileName: file.filename,
          type: file.mimetype,
          size: file.size,
          url: file.path,
        }),
      );

      return `${req.protocol}://${req.headers.host}/uploads/${file.filename}`;
    });
  }
}
