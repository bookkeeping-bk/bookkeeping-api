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
        type: 'varchar',
        length: '32',
        isNullable: false,
        comment: '支付来源',
      },
      {
        name: 'money',
        type: 'integer',
        isNullable: false,
        default: 0,
        comment: '记录金额 单位:分',
      },
      {
        name: 'user_id',
        type: 'integer',
        isNullable: false,
        comment: '记录人',
      },
      {
        name: 'record_at',
        type: 'timestamptz',
        isNullable: false,
        default: 'now()',
        comment: '记录时间',
      },
      {
        name: 'images',
        type: 'varchar',
        length: '255',
        isNullable: false,
        comment: '图片',
      },
      {
        name: 'remark',
        type: 'varchar',
        length: '255',
        isNullable: false,
        comment: '备注',
      },
      {
        name: 'created_at',
        type: 'timestamptz',
        isNullable: false,
        default: 'now()',
        comment: '创建时间',
      },
      {
        name: 'updated_at',
        type: 'timestamptz',
        isNullable: false,
        default: 'now()',
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
