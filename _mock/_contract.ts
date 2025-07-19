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
    originalAmount: 50000,
    currentAmount: 55000,
    changeAmount: 5000,
    status: 'approved',
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-06-15'),
    description: '為ABC公司開發企業網站，包含前台展示和後台管理系統。',
    createDate: new Date('2024-01-15'),
    updateDate: new Date('2024-01-22'),
    reviewer: '張經理',
    reviewDate: new Date('2024-01-22'),
    comments: '合約內容完整，符合公司規範',
    version: '1.0',
    changeVersion: '1.1',
    progress: 75,
    paymentRounds: [
      { round: 1, amount: 15000, status: 'paid', date: new Date('2024-02-15') },
      { round: 2, amount: 20000, status: 'pending', date: new Date('2024-04-15') },
      { round: 3, amount: 20000, status: 'pending', date: new Date('2024-06-15') }
    ],
    changes: [
      {
        id: 1,
        type: '追加',
        description: '增加手機版適配功能',
        amount: 5000,
        date: new Date('2024-03-01'),
        version: '1.1'
      }
    ]
  },
  {
    id: '2',
    title: '系統維護合約',
    client: 'XYZ企業',
    originalAmount: 30000,
    currentAmount: 30000,
    changeAmount: 0,
    status: 'pending',
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-12-31'),
    description: '為XYZ企業提供系統維護服務，包含定期檢查和故障排除。',
    createDate: new Date('2024-01-20'),
    updateDate: new Date('2024-01-20'),
    reviewer: null,
    reviewDate: null,
    comments: null,
    version: '1.0',
    changeVersion: '1.0',
    progress: 0,
    paymentRounds: [
      { round: 1, amount: 10000, status: 'pending', date: new Date('2024-03-01') },
      { round: 2, amount: 10000, status: 'pending', date: new Date('2024-06-01') },
      { round: 3, amount: 10000, status: 'pending', date: new Date('2024-12-31') }
    ],
    changes: []
  },
  {
    id: '3',
    title: '手機應用開發合約',
    client: 'DEF科技',
    originalAmount: 80000,
    currentAmount: 80000,
    changeAmount: 0,
    status: 'draft',
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-08-31'),
    description: '為DEF科技開發iOS和Android雙平台手機應用。',
    createDate: new Date('2024-01-25'),
    updateDate: new Date('2024-01-25'),
    reviewer: null,
    reviewDate: null,
    comments: null,
    version: '1.0',
    changeVersion: '1.0',
    progress: 0,
    paymentRounds: [
      { round: 1, amount: 25000, status: 'pending', date: new Date('2024-04-01') },
      { round: 2, amount: 25000, status: 'pending', date: new Date('2024-06-01') },
      { round: 3, amount: 30000, status: 'pending', date: new Date('2024-08-31') }
    ],
    changes: []
  },
  {
    id: '4',
    title: '資料庫優化合約',
    client: 'GHI銀行',
    originalAmount: 45000,
    currentAmount: 45000,
    changeAmount: 0,
    status: 'rejected',
    startDate: new Date('2024-02-15'),
    endDate: new Date('2024-05-15'),
    description: '為GHI銀行優化現有資料庫系統，提升查詢效能。',
    createDate: new Date('2024-01-18'),
    updateDate: new Date('2024-01-21'),
    reviewer: '李經理',
    reviewDate: new Date('2024-01-21'),
    comments: '預算超出公司標準，需要重新評估',
    version: '1.0',
    changeVersion: '1.0',
    progress: 0,
    paymentRounds: [
      { round: 1, amount: 15000, status: 'pending', date: new Date('2024-03-15') },
      { round: 2, amount: 15000, status: 'pending', date: new Date('2024-04-15') },
      { round: 3, amount: 15000, status: 'pending', date: new Date('2024-05-15') }
    ],
    changes: []
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

  // 請款
  'POST /contract/:id/payment': (req: MockRequest) => {
    const contract = getContract(req.params.id);
    if (contract) {
      // 更新請款狀態
      const round = req.body.round;
      const paymentRound = contract.paymentRounds.find((p: any) => p.round === round);
      if (paymentRound) {
        paymentRound.status = 'paid';
        paymentRound.date = new Date(req.body.date);
      }
    }
    return { msg: 'ok' };
  },

  // 合約變更
  'POST /contract/:id/change': (req: MockRequest) => {
    const contract = getContract(req.params.id);
    if (contract) {
      const newChange = {
        id: contract.changes.length + 1,
        type: req.body.type,
        description: req.body.description,
        amount: req.body.amount,
        date: new Date(req.body.date),
        version: req.body.version
      };

      contract.changes.push(newChange);
      contract.changeVersion = req.body.version;

      // 更新金額
      if (req.body.type === '追加') {
        contract.changeAmount += req.body.amount;
        contract.currentAmount += req.body.amount;
      } else {
        contract.changeAmount -= req.body.amount;
        contract.currentAmount -= req.body.amount;
      }
    }
    return { msg: 'ok' };
  },

  // 刪除合約
  'DELETE /contract/:id': (req: MockRequest) => deleteContract(req.params.id)
};
