/**
 * NG-ALAIN Mock 用戶資料服務
 *
 * 此檔案提供：
 * - 用戶列表的 Mock 資料
 * - 用戶認證的 Mock API
 * - 用戶權限的 Mock 資料
 * - 支援 Firebase 認證的 Mock 邏輯
 *
 * 用於開發環境的 API 模擬
 * 基於 @delon/mock 框架
 */

import { MockRequest } from '@delon/mock';

const list: any[] = [];
const total = 50;

for (let i = 0; i < total; i += 1) {
  list.push({
    id: i + 1,
    disabled: i % 6 === 0,
    href: 'https://ant.design',
    avatar: [
      'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
      'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png'
    ][i % 2],
    no: `TradeCode ${i}`,
    title: `一个任务名称 ${i}`,
    owner: '曲丽丽',
    description: '这是一段描述',
    callNo: Math.floor(Math.random() * 1000),
    status: Math.floor(Math.random() * 10) % 4,
    updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    createdAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    progress: Math.ceil(Math.random() * 100)
  });
}

function genData(params: any): { total: number; list: any[] } {
  let ret = [...list];
  const pi = +params.pi;
  const ps = +params.ps;
  const start = (pi - 1) * ps;

  if (params.no) {
    ret = ret.filter(data => data.no.indexOf(params.no) > -1);
  }

  return { total: ret.length, list: ret.slice(start, ps * pi) };
}

function saveData(id: number, value: any): { msg: string } {
  const item = list.find(w => w.id === id);
  if (!item) {
    return { msg: '无效用户信息' };
  }
  Object.assign(item, value);
  return { msg: 'ok' };
}

export const USERS = {
  '/user': (req: MockRequest) => genData(req.queryString),
  '/user/:id': (req: MockRequest) => list.find(w => w.id === +req.params.id),
  'POST /user/:id': (req: MockRequest) => saveData(+req.params.id, req.body),
  '/user/current': {
    name: 'Cipchk',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    userid: '00000001',
    email: 'cipchk@qq.com',
    signature: '海纳百川，有容乃大',
    title: '交互专家',
    group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
    tags: [
      {
        key: '0',
        label: '很有想法的'
      },
      {
        key: '1',
        label: '专注撩妹'
      },
      {
        key: '2',
        label: '帅~'
      },
      {
        key: '3',
        label: '通吃'
      },
      {
        key: '4',
        label: '专职后端'
      },
      {
        key: '5',
        label: '海纳百川'
      }
    ],
    notifyCount: 12,
    country: 'China',
    geographic: {
      province: {
        label: '上海',
        key: '330000'
      },
      city: {
        label: '市辖区',
        key: '330100'
      }
    },
    address: 'XX区XXX路 XX 号',
    phone: '你猜-你猜你猜猜猜'
  },
  'POST /user/avatar': 'ok',
  'POST /login/account': (req: MockRequest) => {
    const data = req.body;

    // 支援 Firebase 認證
    if (data.password === 'firebase-auth') {
      // Firebase 認證用戶，直接通過
      return {
        msg: 'ok',
        user: {
          token: data.userName, // 使用 Firebase UID 作為 token
          name: data.userName,
          email: data.userName.includes('@') ? data.userName : `${data.userName}@firebase.com`,
          id: data.userName,
          time: +new Date()
        }
      };
    }

    // 原有的 Mock 認證邏輯
    if (!(data.userName === 'admin' || data.userName === 'user') || data.password !== 'ng-alain.com') {
      return { msg: `Invalid username or password（admin/ng-alain.com）` };
    }
    return {
      msg: 'ok',
      user: {
        token: '123456789',
        name: data.userName,
        email: `${data.userName}@qq.com`,
        id: 10000,
        time: +new Date()
      }
    };
  },
  '/user/:uid/permissions': (req: MockRequest) => {
    const uid = req.params.uid;
    // Mock 用戶權限資料，模擬 Firestore 結構
    const permissions = {
      admin: {
        role: 'admin',
        permissions: ['read', 'write', 'delete', 'admin']
      },
      user: {
        role: 'user',
        permissions: ['read', 'write']
      }
    };

    // 根據 UID 返回對應權限，預設為 user 權限
    return permissions[uid as keyof typeof permissions] || permissions.user;
  },
  'POST /register': {
    msg: 'ok'
  }
};
