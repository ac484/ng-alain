/**
 * 貨幣格式化工具
 *
 * 此檔案負責：
 * - 提供人民幣金額格式化功能
 * - 轉換數字為帶有貨幣符號的字串
 * - 支援小數位數自訂
 * - 用於資料顯示和報表生成
 *
 * 转化成RMB元字符串
 *
 * @param digits 当数字类型时，允许指定小数点后数字的个数，默认2位小数
 */
export function yuan(value: number | string, digits = 2): string {
  if (typeof value === 'number') {
    value = value.toFixed(digits);
  }
  return `&yen ${value}`;
}
