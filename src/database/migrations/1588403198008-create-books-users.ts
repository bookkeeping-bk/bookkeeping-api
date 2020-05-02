/**
 * @author: YouJie
 * @date: 2020-05-02 15:06:51
 * 账本和用户关系表
 */

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateBooksUsers1588403198008 implements MigrationInterface {
  private booksUsersTable = new Table({
    name: 'books_users',
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'book_id',
        type: 'integer',
        isNullable: true,
        comment: '账本ID',
      },
      {
        name: 'user_id',
        type: 'integer',
        isNullable: true,
        comment: '用户ID',
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(this.booksUsersTable);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(this.booksUsersTable);
  }
}
