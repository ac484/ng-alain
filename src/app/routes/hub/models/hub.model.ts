// 新增 Contract 型別定義，供全專案共用
export interface Contract {
  key?: string;
  contractSerial: string;
  client: string;
  contractName: string;
  contractCode?: string;
  feeCode?: string;
  amount: number;
}
