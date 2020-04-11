/**
 * @author: YouJie
 * @date: 2020-04-11 11:54:15
 * HTTP 返回的结果
 */

export interface ResponseResult {
  code: number;
  message: string;
  data: any;
  success: boolean;
}
