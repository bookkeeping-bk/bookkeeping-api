/**
 * @author: YouJie
 * @date: 2020-04-16 22:12:07
 * 支付来源表
 */

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePaymentSources1586489517550 implements MigrationInterface {
  private paymentSourcesTable = new Table({
    name: 'payment_sources',
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
        isNullable: false,
        comment: '账户名称',
      },
      {
        name: 'remark',
        type: 'varchar',
        length: '255',
        isNullable: false,
        comment: '备注',
      },
      {
        name: 'delete_at',
        type: 'timestamp',
        isNullable: true,
        comment: '删除时间',
      },
      {
        name: 'created_at',
        type: 'timestamp',
        isNullable: true,
        comment: '创建时间',
      },
      {
        name: 'updated_at',
        type: 'timestamp',
        isNullable: true,
        comment: '更新时间',
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(this.paymentSourcesTable);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(this.paymentSourcesTable);
  }
}
