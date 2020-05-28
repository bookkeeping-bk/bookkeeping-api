/**
 * @author: YouJie
 * @date: 2020-05-26 08:54:38
 */

import { ApiProperty } from '@nestjs/swagger';

export class FilesUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
