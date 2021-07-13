/**
 * @author: YouJie
 * @date: 2020-05-25 14:02:18
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { File } from '@/models/file.entity';
import dayjs = require('dayjs');
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([File]),
    AuthModule,
    MulterModule.register({
      storage: diskStorage({
        destination: `./uploads/${dayjs().format('YYYY-MM-DD')}`, // 文件上传后的文件夹路径
        filename: (req, file, cb) => {
          // 自定义文件名文件名称
          const filename = file.originalname;
          return cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
