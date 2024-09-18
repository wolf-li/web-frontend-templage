// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 域名解析 POST /api/netorktools/dns */
export async function postNetorktoolsDns(body: API.DnsI, options?: { [key: string]: any }) {
  return request<API.ResponseModelDnsRes>('/api/netorktools/dns', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** ping 扫描 POST /api/netorktools/ping */
export async function postNetorktoolsPing(body: API.PingI, options?: { [key: string]: any }) {
  return request<API.ResponseModelPingRes>('/api/netorktools/ping', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** IP 端口扫描 POST /api/netorktools/ports */
export async function postNetorktoolsPorts(
  body: API.PortsIPProtocal,
  options?: { [key: string]: any },
) {
  return request<API.ResponseModelPortsRes>('/api/netorktools/ports', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** IP 端口扫描 POST /api/netorktools/ssl */
export async function postNetorktoolsSsl(body: API.SSLI, options?: { [key: string]: any }) {
  return request<API.ResponseModelSSLCert>('/api/netorktools/ssl', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
