/**
 * @author: YouJie
 * @date: 2020-04-17 14:05:06
 * 文件表
 */

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateFiles1587103500292 implements MigrationInterface {
  private filesTable = new Table({
    name: 'files',
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'original_name',
        type: 'varchar',
        length: '255',
        isNullable: false,
        comment: '文件原名称',
      },
      {
        name: 'file_name',
        type: 'varchar',
        length: '255',
        isNullable: false,
        comment: '文件名称',
      },
      {
        name: 'type',
        type: 'varchar',
        length: '200',
        isNullable: false,
        comment: '文件类型',
      },
      {
        name: 'size',
        type: 'integer',
        isNullable: false,
        comment: '文件大小',
      },
      {
        name: 'url',
        type: 'varchar',
        length: '255',
        isNullable: false,
        comment: '文件路径',
      },
      {
        name: 'created_at',
        type: 'timestamp',
        isNullable: true,
        comment: '创建时间',
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(this.filesTable);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(this.filesTable);
  }
}
