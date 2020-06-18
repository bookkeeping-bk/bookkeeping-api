/**
 * @author: YouJie
 * @date: 2020-04-18 12:39:28
 */

import { Logger } from '@nestjs/common';
import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { BillCategory } from '../../models/bill_category.entity';

// 收入分类
const revenues = [
  { type: 1, name: '工资' },
  { type: 1, name: '理财' },
  { type: 1, name: '礼金' },
  { type: 1, name: '红包' },
  { type: 1, name: '奖金' },
  { type: 1, name: '红利' },
];
// 支出分类
const expends = [
  { type: 2, name: '餐饮' },
  { type: 2, name: '购物' },
  { type: 2, name: '日用品' },
  { type: 2, name: '交通' },
  { type: 2, name: '蔬菜' },
  { type: 2, name: '孩子' },
  { type: 2, name: '服饰鞋包' },
  { type: 2, name: '化妆护肤' },
  { type: 2, name: '红包' },
  { type: 2, name: '话费' },
  { type: 2, name: '娱乐' },
  { type: 2, name: '医疗' },
  { type: 2, name: '零食' },
  { type: 2, name: '水果' },
  { type: 2, name: '住房' },
  { type: 2, name: '旅行' },
  { type: 2, name: '烟酒' },
  { type: 2, name: '数码' },
  { type: 2, name: '书籍' },
  { type: 2, name: '学习' },
  { type: 2, name: '宠物' },
  { type: 2, name: '礼金' },
  { type: 2, name: '礼物' },
  { type: 2, name: '办公' },
  { type: 2, name: '居家' },
  { type: 2, name: '维修' },
  { type: 2, name: '快递' },
  { type: 2, name: '汽车/摩托车/电瓶车' },
];

export default class BillTypeSeeder implements Seeder {
  async run(factory: Factory, connection: Connection) {
    await connection
      .createQueryBuilder()
      .insert()
      .into(BillCategory)
      .values([...revenues, ...expends])
      .execute();
    Logger.log('账单类型表初始化完成', 'Seeder');
  }
}
