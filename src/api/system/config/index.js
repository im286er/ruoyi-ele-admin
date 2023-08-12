import request, { download } from '@/utils/request';

/**
 * 分页查询配置
 */
export async function pageConfigs(params) {
  const res = await request.get('/system/config/list', { params });
  if (res.data.code === 200) {
    return res.data;
  }
  return Promise.reject(new Error(res.data.msg));
}

/**
 * 添加配置
 */
export async function addConfig(data) {
  const res = await request.post('/system/config', data);
  if (res.data.code === 200) {
    return res.data.msg;
  }
  return Promise.reject(new Error(res.data.msg));
}

/**
 * 修改配置
 */
export async function updateConfig(data) {
  const res = await request.put('/system/config', data);
  if (res.data.code === 200) {
    return res.data.msg;
  }
  return Promise.reject(new Error(res.data.msg));
}

/**
 * 删除配置
 */
export async function removeConfig(id) {
  const res = await request.delete('/system/config/' + id);
  if (res.data.code === 200) {
    return res.data.msg;
  }
  return Promise.reject(new Error(res.data.msg));
}

/**
 * 批量删除配置
 */
export async function removeConfigs(ids) {
  const res = await request.delete('/system/config/' + ids.join());
  if (res.data.code === 200) {
    return res.data.msg;
  }
  return Promise.reject(new Error(res.data.msg));
}

/**
 * 导出配置列表
 */
export async function exportConfigs(params) {
  const formData = new FormData();
  Object.keys(params).forEach((key) => {
    if (params[key] != null) {
      formData.append(key, params[key]);
    }
  });
  const res = await request({
    url: '/system/config/export',
    method: 'POST',
    data: formData,
    responseType: 'blob'
  });
  download(res.data, `config_${new Date().getTime()}.xlsx`);
}
