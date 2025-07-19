/**
 * NG-ALAIN Mock 合約資料服務
 *
 * 此檔案提供：
 * - 合約列表的 Mock 資料
 * - 合約的增刪改查 Mock API
 * - 合約審查狀態的 Mock 資料
 * - 用於合約管理頁面的測試資料
 *
 * 用於開發環境的合約資料模擬
 * 基於 @delon/mock 框架
 */

import { MockRequest } from '@delon/mock';

// 模擬合約資料
const contracts: any[] = [
  {
    id: '1',
    title: '網站開發合約',
    client: 'ABC公司',
    amount: 50000,
    status: 'approved',
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-06-15'),
    description: '為ABC公司開發企業網站，包含前台展示和後台管理系統。',
    createDate: new Date('2024-01-15'),
    updateDate: new Date('2024-01-22'),
    reviewer: '張經理',
    reviewDate: new Date('2024-01-22'),
    comments: '合約內容完整，符合公司規範'
  },
  {
    id: '2',
    title: '系統維護合約',
    client: 'XYZ企業',
    amount: 30000,
    status: 'pending',
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-12-31'),
    description: '為XYZ企業提供系統維護服務，包含定期檢查和故障排除。',
    createDate: new Date('2024-01-20'),
    updateDate: new Date('2024-01-20'),
    reviewer: null,
    reviewDate: null,
    comments: null
  },
  {
    id: '3',
    title: '手機應用開發合約',
    client: 'DEF科技',
    amount: 80000,
    status: 'draft',
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-08-31'),
    description: '為DEF科技開發iOS和Android雙平台手機應用。',
    createDate: new Date('2024-01-25'),
    updateDate: new Date('2024-01-25'),
    reviewer: null,
    reviewDate: null,
    comments: null
  },
  {
    id: '4',
    title: '資料庫優化合約',
    client: 'GHI銀行',
    amount: 45000,
    status: 'rejected',
    startDate: new Date('2024-02-15'),
    endDate: new Date('2024-05-15'),
    description: '為GHI銀行優化現有資料庫系統，提升查詢效能。',
    createDate: new Date('2024-01-18'),
    updateDate: new Date('2024-01-21'),
    reviewer: '李經理',
    reviewDate: new Date('2024-01-21'),
    comments: '預算超出公司標準，需要重新評估'
  }
];

// 獲取合約列表
function getContracts(params: any): { total: number; list: any[] } {
  let ret = [...contracts];
  const pi = +params.pi || 1;
  const ps = +params.ps || 10;
  const start = (pi - 1) * ps;

  // 搜尋篩選
  if (params.title) {
    ret = ret.filter(data => data.title.indexOf(params.title) > -1);
  }
  if (params.client) {
    ret = ret.filter(data => data.client.indexOf(params.client) > -1);
  }
  if (params.status) {
    ret = ret.filter(data => data.status === params.status);
  }

  return { total: ret.length, list: ret.slice(start, start + ps) };
}

// 獲取單個合約
function getContract(id: string): any {
  return contracts.find(contract => contract.id === id);
}

// 創建合約
function createContract(data: any): { msg: string; id: string } {
  const newId = (contracts.length + 1).toString();
  const newContract = {
    id: newId,
    ...data,
    status: 'draft',
    createDate: new Date(),
    updateDate: new Date(),
    reviewer: null,
    reviewDate: null,
    comments: null
  };
  contracts.push(newContract);
  return { msg: 'ok', id: newId };
}

// 更新合約
function updateContract(id: string, data: any): { msg: string } {
  const index = contracts.findIndex(contract => contract.id === id);
  if (index === -1) {
    return { msg: '合約不存在' };
  }

  contracts[index] = {
    ...contracts[index],
    ...data,
    updateDate: new Date()
  };
  return { msg: 'ok' };
}

// 審查合約
function reviewContract(id: string, data: any): { msg: string } {
  const index = contracts.findIndex(contract => contract.id === id);
  if (index === -1) {
    return { msg: '合約不存在' };
  }

  contracts[index] = {
    ...contracts[index],
    status: data.status,
    reviewer: data.reviewer || '系統',
    reviewDate: new Date(),
    comments: data.comments
  };
  return { msg: 'ok' };
}

// 刪除合約
function deleteContract(id: string): { msg: string } {
  const index = contracts.findIndex(contract => contract.id === id);
  if (index === -1) {
    return { msg: '合約不存在' };
  }

  contracts.splice(index, 1);
  return { msg: 'ok' };
}

export const CONTRACTS = {
  // 獲取合約列表
  '/contract': (req: MockRequest) => getContracts(req.queryString),

  // 獲取單個合約
  '/contract/:id': (req: MockRequest) => getContract(req.params.id),

  // 創建合約
  'POST /contract': (req: MockRequest) => createContract(req.body),

  // 更新合約
  'PUT /contract/:id': (req: MockRequest) => updateContract(req.params.id, req.body),

  // 審查合約
  'POST /contract/:id/review': (req: MockRequest) => reviewContract(req.params.id, req.body),

  // 刪除合約
  'DELETE /contract/:id': (req: MockRequest) => deleteContract(req.params.id)
};
