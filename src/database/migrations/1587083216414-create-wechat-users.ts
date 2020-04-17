/**
 * @author: YouJie
 * @date: 2020-04-17 08:27:02
 * 微信用户表
 */

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateWechatUsers1587083216414 implements MigrationInterface {
  private wechatUsersTable = new Table({
    name: 'wechat_users',
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'openid',
        type: 'string',
        isNullable: true,
        comment: '微信openId',
      },
      {
        name: 'user_id',
        type: 'integer',
        isNullable: false,
        comment: '用户ID',
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
    await queryRunner.createTable(this.wechatUsersTable);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(this.wechatUsersTable);
  }
}
