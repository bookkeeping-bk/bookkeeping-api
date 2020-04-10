import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateBillTypes1586484771026 implements MigrationInterface {
  private billTypesTable = new Table({
    name: 'bill_types',
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
        comment: '账单分类名称',
      },
      {
        name: 'type',
        type: 'tinyint',
        length: '1',
        isNullable: false,
        comment: '账单分类类型（1:支出 2:收入）',
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
    await queryRunner.createTable(this.billTypesTable);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(this.billTypesTable);
  }
}
