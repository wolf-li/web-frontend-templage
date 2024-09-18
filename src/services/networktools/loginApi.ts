// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取当前登录用户 GET /api/user/current */
export async function getUserCurrent(options?: { [key: string]: any }) {
  return request<API.ResponseModelUserLoginReturn>('/api/user/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 当前用户更新自己的信息 PUT /api/user/current */
export async function putUserCurrent(body: API.UserUpdateBySelf, options?: { [key: string]: any }) {
  return request<API.ResponseString>('/api/user/current', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户登录 POST /api/user/login */
export async function postUserLogin(body: API.UserLogin, options?: { [key: string]: any }) {
  return request<API.ResponseModelUserLoginReturn>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户退出 POST /api/user/logout */
export async function postUserLogout(options?: { [key: string]: any }) {
  return request<API.ResponseString>('/api/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 当前用户更新自己的密码 PUT /api/user/password */
export async function putUserPassword(
  body: API.UserSecurityPasswordChange,
  options?: { [key: string]: any },
) {
  return request<API.ResponseString>('/api/user/password', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户注册 POST /api/user/register */
export async function postUserRegister(body: API.UserRegister, options?: { [key: string]: any }) {
  return request<API.ResponseString>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
