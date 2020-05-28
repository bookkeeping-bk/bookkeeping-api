/**
 * @author: YouJie
 * @date: 2020-05-25 14:02:18
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { File } from '@/models/file.entity';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([File]),
    MulterModule.register({ dest: 'uploads' }),
    AuthModule,
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
