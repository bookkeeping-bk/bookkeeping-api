/**
 * @author: YouJie
 * @date: 2020-05-18 14:25:07
 * 工具函数库
 */

export class Utils {
  /**
   * 格式化金额输出
   * @param { Number } money
   * @param { Boolean } isCent - 单位是否是分 true：是 false: 否
   */
  static moneyFormat(money: number, isCent = false) {
    if (isCent) {
      return money / 100;
    } else {
      return Math.round(money * 100);
    }
  }
}
