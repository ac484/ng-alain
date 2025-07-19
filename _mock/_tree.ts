/**
 * NG-ALAIN Mock 樹狀結構資料服務
 *
 * 此檔案提供：
 * - 樹狀結構列表的 Mock 資料
 * - 樹狀結構的增刪改查 Mock API
 * - 樹狀節點的拖曳和右鍵選單 Mock 資料
 * - 用於樹狀管理頁面的測試資料
 *
 * 用於開發環境的樹狀資料模擬
 * 基於 @delon/mock 框架
 */

import { MockRequest } from '@delon/mock';

// 模擬樹狀結構資料
const trees: any[] = [
  {
    id: '1',
    name: '組織架構樹',
    type: '組織',
    level: 3,
    status: 'active',
    createDate: new Date('2024-01-15'),
    description: '公司組織架構管理',
    maxLevel: 5,
    nodes: [
      {
        key: '0-0',
        title: '總經理',
        children: [
          {
            key: '0-0-0',
            title: '技術部',
            children: [
              { key: '0-0-0-0', title: '前端組', isLeaf: true },
              { key: '0-0-0-1', title: '後端組', isLeaf: true }
            ]
          },
          {
            key: '0-0-1',
            title: '業務部',
            children: [{ key: '0-0-1-0', title: '銷售組', isLeaf: true }]
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: '產品分類樹',
    type: '分類',
    level: 4,
    status: 'active',
    createDate: new Date('2024-01-20'),
    description: '產品分類管理',
    maxLevel: 6,
    nodes: [
      {
        key: '1-0',
        title: '電子產品',
        children: [
          {
            key: '1-0-0',
            title: '手機',
            children: [
              { key: '1-0-0-0', title: 'iPhone', isLeaf: true },
              { key: '1-0-0-1', title: 'Android', isLeaf: true }
            ]
          },
          {
            key: '1-0-1',
            title: '電腦',
            children: [{ key: '1-0-1-0', title: '筆記本', isLeaf: true }]
          }
        ]
      }
    ]
  },
  {
    id: '3',
    name: '權限樹',
    type: '權限',
    level: 2,
    status: 'active',
    createDate: new Date('2024-02-01'),
    description: '系統權限管理',
    maxLevel: 4,
    nodes: [
      {
        key: '2-0',
        title: '管理員權限',
        children: [
          { key: '2-0-0', title: '用戶管理', isLeaf: true },
          { key: '2-0-1', title: '系統設定', isLeaf: true }
        ]
      }
    ]
  }
];

// 獲取樹狀結構列表
function getTrees(params: any): { total: number; list: any[] } {
  let ret = [...trees];
  const pi = +params.pi || 1;
  const ps = +params.ps || 10;
  const start = (pi - 1) * ps;

  // 搜尋篩選
  if (params.name) {
    ret = ret.filter(data => data.name.indexOf(params.name) > -1);
  }
  if (params.type) {
    ret = ret.filter(data => data.type === params.type);
  }
  if (params.status) {
    ret = ret.filter(data => data.status === params.status);
  }

  return { total: ret.length, list: ret.slice(start, start + ps) };
}

// 獲取單個樹狀結構
function getTree(id: string): any {
  return trees.find(tree => tree.id === id);
}

// 創建樹狀結構
function createTree(data: any): { msg: string; id: string } {
  const newId = (trees.length + 1).toString();
  const newTree = {
    id: newId,
    ...data,
    status: 'active',
    createDate: new Date(),
    nodes: []
  };
  trees.push(newTree);
  return { msg: 'ok', id: newId };
}

// 更新樹狀結構
function updateTree(id: string, data: any): { msg: string } {
  const index = trees.findIndex(tree => tree.id === id);
  if (index === -1) {
    return { msg: '樹狀結構不存在' };
  }

  trees[index] = {
    ...trees[index],
    ...data
  };
  return { msg: 'ok' };
}

// 刪除樹狀結構
function deleteTree(id: string): { msg: string } {
  const index = trees.findIndex(tree => tree.id === id);
  if (index === -1) {
    return { msg: '樹狀結構不存在' };
  }

  trees.splice(index, 1);
  return { msg: 'ok' };
}

// 獲取樹狀節點
function getTreeNodes(id: string): any[] {
  const tree = getTree(id);
  return tree ? tree.nodes : [];
}

// 更新樹狀節點
function updateTreeNodes(id: string, nodes: any[]): { msg: string } {
  const index = trees.findIndex(tree => tree.id === id);
  if (index === -1) {
    return { msg: '樹狀結構不存在' };
  }

  trees[index].nodes = nodes;
  return { msg: 'ok' };
}

export const TREES = {
  // 獲取樹狀結構列表
  '/tree': (req: MockRequest) => getTrees(req.queryString),

  // 獲取單個樹狀結構
  '/tree/:id': (req: MockRequest) => getTree(req.params.id),

  // 創建樹狀結構
  'POST /tree': (req: MockRequest) => createTree(req.body),

  // 更新樹狀結構
  'PUT /tree/:id': (req: MockRequest) => updateTree(req.params.id, req.body),

  // 刪除樹狀結構
  'DELETE /tree/:id': (req: MockRequest) => deleteTree(req.params.id),

  // 獲取樹狀節點
  '/tree/:id/nodes': (req: MockRequest) => getTreeNodes(req.params.id),

  // 更新樹狀節點
  'PUT /tree/:id/nodes': (req: MockRequest) => updateTreeNodes(req.params.id, req.body),

  // 拖曳節點
  'POST /tree/:id/drag': (req: MockRequest) => {
    const { dragKey, dropKey, dropPosition } = req.body;
    console.log('拖曳節點:', { dragKey, dropKey, dropPosition });
    return { msg: 'ok' };
  },

  // 右鍵選單操作
  'POST /tree/:id/node': (req: MockRequest) => {
    const { action, nodeKey, data } = req.body;
    console.log('節點操作:', { action, nodeKey, data });
    return { msg: 'ok' };
  }
};
