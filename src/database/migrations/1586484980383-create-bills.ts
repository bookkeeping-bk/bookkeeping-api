/**
 * @author: YouJie
 * @date: 2020-04-16 22:11:24
 * 账单表
 */

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateBills1586484980383 implements MigrationInterface {
  private billsTable = new Table({
    name: 'bills',
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'bill_type_id',
        type: 'integer',
        isNullable: false,
        comment: '账单分类ID',
      },
      {
        name: 'payment_source_id',
        type: 'integer',
        isNullable: false,
        comment: '支付来源ID',
      },
      {
        name: 'user_id',
        type: 'integer',
        isNullable: false,
        comment: '记录人ID',
      },
      {
        name: 'money',
        type: 'integer',
        isNullable: false,
        default: 0,
        comment: '账单金额 单位:分',
      },
      {
        name: 'images',
        type: 'varchar',
        length: '255',
        isNullable: false,
        comment: '账单图片',
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
    await queryRunner.createTable(this.billsTable);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(this.billsTable);
  }
}
