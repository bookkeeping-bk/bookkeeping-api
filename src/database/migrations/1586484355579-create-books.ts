/**
 * @author: YouJie
 * @date: 2020-04-16 21:06:14
 * 账本表
 */

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateBooks1586484355579 implements MigrationInterface {
  private booksTable = new Table({
    name: 'books',
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'name',
        type: 'varchar',
        length: '32',
        isUnique: true,
        isNullable: false,
        comment: '账本名称',
      },
      {
        name: 'deleted_at',
        type: 'timestamp',
        isNullable: true,
        comment: '删除时间',
      },
      {
        name: 'created_at',
        type: 'timestamptz',
        isNullable: false,
        comment: '创建时间',
      },
      {
        name: 'updated_at',
        type: 'timestamptz',
        isNullable: false,
        comment: '更新时间',
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(this.booksTable);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(this.booksTable);
  }
}
