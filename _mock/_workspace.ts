/**
 * NG-ALAIN Mock 工作區資料服務
 *
 * 此檔案提供：
 * - 工作區列表的 Mock 資料
 * - 工作區的增刪改查 Mock API
 * - 工作區成員管理的 Mock 資料
 * - 用於工作區管理頁面的測試資料
 *
 * 用於開發環境的工作區資料模擬
 * 基於 @delon/mock 框架
 */

import { MockRequest } from '@delon/mock';

// 模擬工作區資料
const workspaces: any[] = [
  {
    id: '1',
    name: '前端開發工作區',
    type: '開發',
    memberCount: 8,
    status: 'active',
    createDate: new Date('2024-01-15'),
    description: '專注於前端技術開發和UI/UX設計',
    maxMembers: 15,
    settings: {
      enableMemberInvite: true,
      enableFileSharing: true,
      enableChat: true,
      backupInterval: 24,
      maxFileSize: 100
    },
    members: [
      {
        id: '1',
        name: '張小明',
        email: 'zhang@example.com',
        role: 'owner',
        joinDate: new Date('2024-01-15')
      },
      {
        id: '2',
        name: '李小華',
        email: 'li@example.com',
        role: 'admin',
        joinDate: new Date('2024-01-16')
      },
      {
        id: '3',
        name: '王小美',
        email: 'wang@example.com',
        role: 'member',
        joinDate: new Date('2024-01-17')
      }
    ]
  },
  {
    id: '2',
    name: '後端開發工作區',
    type: '開發',
    memberCount: 6,
    status: 'active',
    createDate: new Date('2024-01-20'),
    description: '專注於後端API開發和資料庫設計',
    maxMembers: 12,
    settings: {
      enableMemberInvite: true,
      enableFileSharing: true,
      enableChat: false,
      backupInterval: 12,
      maxFileSize: 200
    },
    members: [
      {
        id: '4',
        name: '陳大強',
        email: 'chen@example.com',
        role: 'owner',
        joinDate: new Date('2024-01-20')
      },
      {
        id: '5',
        name: '劉小芳',
        email: 'liu@example.com',
        role: 'admin',
        joinDate: new Date('2024-01-21')
      }
    ]
  },
  {
    id: '3',
    name: '設計工作區',
    type: '設計',
    memberCount: 4,
    status: 'active',
    createDate: new Date('2024-02-01'),
    description: 'UI/UX設計和原型製作',
    maxMembers: 10,
    settings: {
      enableMemberInvite: true,
      enableFileSharing: true,
      enableChat: true,
      backupInterval: 6,
      maxFileSize: 500
    },
    members: [
      {
        id: '6',
        name: '趙設計師',
        email: 'zhao@example.com',
        role: 'owner',
        joinDate: new Date('2024-02-01')
      }
    ]
  },
  {
    id: '4',
    name: '測試工作區',
    type: '測試',
    memberCount: 3,
    status: 'inactive',
    createDate: new Date('2024-01-25'),
    description: '軟體測試和品質保證',
    maxMembers: 8,
    settings: {
      enableMemberInvite: false,
      enableFileSharing: true,
      enableChat: true,
      backupInterval: 48,
      maxFileSize: 50
    },
    members: [
      {
        id: '7',
        name: '孫測試',
        email: 'sun@example.com',
        role: 'owner',
        joinDate: new Date('2024-01-25')
      }
    ]
  }
];

// 獲取工作區列表
function getWorkspaces(params: any): { total: number; list: any[] } {
  let ret = [...workspaces];
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

// 獲取單個工作區
function getWorkspace(id: string): any {
  return workspaces.find(workspace => workspace.id === id);
}

// 創建工作區
function createWorkspace(data: any): { msg: string; id: string } {
  const newId = (workspaces.length + 1).toString();
  const newWorkspace = {
    id: newId,
    ...data,
    status: 'active',
    createDate: new Date(),
    memberCount: 1,
    members: [
      {
        id: '1',
        name: '創建者',
        email: 'creator@example.com',
        role: 'owner',
        joinDate: new Date()
      }
    ],
    settings: {
      enableMemberInvite: true,
      enableFileSharing: true,
      enableChat: true,
      backupInterval: 24,
      maxFileSize: 100
    }
  };
  workspaces.push(newWorkspace);
  return { msg: 'ok', id: newId };
}

// 更新工作區
function updateWorkspace(id: string, data: any): { msg: string } {
  const index = workspaces.findIndex(workspace => workspace.id === id);
  if (index === -1) {
    return { msg: '工作區不存在' };
  }

  workspaces[index] = {
    ...workspaces[index],
    ...data
  };
  return { msg: 'ok' };
}

// 刪除工作區
function deleteWorkspace(id: string): { msg: string } {
  const index = workspaces.findIndex(workspace => workspace.id === id);
  if (index === -1) {
    return { msg: '工作區不存在' };
  }

  workspaces.splice(index, 1);
  return { msg: 'ok' };
}

// 獲取工作區成員
function getWorkspaceMembers(id: string): any[] {
  const workspace = getWorkspace(id);
  return workspace ? workspace.members : [];
}

// 添加工作區成員
function addWorkspaceMember(id: string, member: any): { msg: string } {
  const index = workspaces.findIndex(workspace => workspace.id === id);
  if (index === -1) {
    return { msg: '工作區不存在' };
  }

  const newMember = {
    ...member,
    id: (workspaces[index].members.length + 1).toString(),
    joinDate: new Date()
  };

  workspaces[index].members.push(newMember);
  workspaces[index].memberCount = workspaces[index].members.length;
  return { msg: 'ok' };
}

// 移除工作區成員
function removeWorkspaceMember(id: string, memberId: string): { msg: string } {
  const index = workspaces.findIndex(workspace => workspace.id === id);
  if (index === -1) {
    return { msg: '工作區不存在' };
  }

  const memberIndex = workspaces[index].members.findIndex((m: any) => m.id === memberId);
  if (memberIndex === -1) {
    return { msg: '成員不存在' };
  }

  workspaces[index].members.splice(memberIndex, 1);
  workspaces[index].memberCount = workspaces[index].members.length;
  return { msg: 'ok' };
}

export const WORKSPACES = {
  // 獲取工作區列表
  '/workspace': (req: MockRequest) => getWorkspaces(req.queryString),

  // 獲取單個工作區
  '/workspace/:id': (req: MockRequest) => getWorkspace(req.params.id),

  // 創建工作區
  'POST /workspace': (req: MockRequest) => createWorkspace(req.body),

  // 更新工作區
  'PUT /workspace/:id': (req: MockRequest) => updateWorkspace(req.params.id, req.body),

  // 刪除工作區
  'DELETE /workspace/:id': (req: MockRequest) => deleteWorkspace(req.params.id),

  // 獲取工作區成員
  '/workspace/:id/members': (req: MockRequest) => getWorkspaceMembers(req.params.id),

  // 添加工作區成員
  'POST /workspace/:id/members': (req: MockRequest) => addWorkspaceMember(req.params.id, req.body),

  // 移除工作區成員
  'DELETE /workspace/:id/members/:memberId': (req: MockRequest) => removeWorkspaceMember(req.params.id, req.params.memberId),

  // 更新工作區設定
  'PUT /workspace/:id/settings': (req: MockRequest) => {
    const index = workspaces.findIndex(workspace => workspace.id === req.params.id);
    if (index === -1) {
      return { msg: '工作區不存在' };
    }

    workspaces[index].settings = {
      ...workspaces[index].settings,
      ...req.body
    };
    return { msg: 'ok' };
  }
};
