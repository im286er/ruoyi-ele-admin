import request from '@/utils/request';
import { mapTree } from 'ele-admin-plus';

/**
 * 获取当前登录用户的个人信息/权限/角色
 */
export async function getUserInfo() {
  const res = await request.get('/getInfo');
  if (res.data.code === 200) {
    return res.data;
  }
  return Promise.reject(new Error(res.data.msg));
}

/**
 * 获取当前登录用户的菜单
 */
export async function getUserMenu() {
  const res = await request.get('/getRouters');
  if (res.data.code === 200 && res.data.data) {
    // 增加首页
    const temp = res.data.data;
    temp.unshift({
      path: '/index',
      component: 'index',
      meta: { title: '首页', icon: 'House' }
    });
    // 修改图标
    return mapTree(temp, (item) => {
      return {
        ...item,
        meta: {
          ...item.meta,
          icon: ruoYiIcons[item.meta.icon] ?? item.meta.icon
        }
      };
    });
  }
  return Promise.reject(new Error(res.data.msg));
}

/**
 * 修改当前登录用户的密码
 */
export async function updatePassword(data) {
  const res = await request.put('/auth/password', data);
  if (res.data.code === 0) {
    return res.data.message ?? '修改成功';
  }
  return Promise.reject(new Error(res.data.message));
}

// 若依默认菜单图标名称
export const ruoYiIcons = {
  system: 'Setting',
  peoples: 'Postcard',
  'tree-table': 'Operation',
  tree: 'OfficeBuilding',
  post: 'Suitcase',
  dict: 'Collection',
  edit: 'SetUp',
  message: 'ChatDotSquare',
  log: 'Memo',
  form: 'Tickets',
  logininfor: 'Calendar',
  monitor: 'Odometer',
  online: 'Connection',
  job: 'Timer',
  druid: 'DataLine',
  server: 'DataAnalysis',
  redis: 'DataBoard',
  'redis-list': 'Coin',
  tool: 'SuitcaseLine',
  build: 'Edit',
  code: 'MagicStick',
  swagger: 'Aim',
  guide: 'Link'
};
