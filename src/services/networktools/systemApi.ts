// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 更新用户信息 PUT /api/system/user */
export async function putSystemUser(body: API.UserUpdate, options?: { [key: string]: any }) {
  return request<API.ResponseString>('/api/system/user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 增加用户 POST /api/system/user */
export async function postSystemUser(body: API.UserAdd, options?: { [key: string]: any }) {
  return request<API.ResponseString>('/api/system/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户 DELETE /api/system/user/${param0} */
export async function deleteSystemUserUserId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteSystemUserUserIdParams,
  options?: { [key: string]: any },
) {
  const { userId: param0, ...queryParams } = params;
  return request<API.ResponseString>(`/api/system/user/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 查询用户通过userid POST /api/system/userlist */
export async function postSystemUserlist(body: API.ListParams, options?: { [key: string]: any }) {
  return request<API.ResponseModelUserListPage>('/api/system/userlist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
