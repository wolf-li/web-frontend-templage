declare namespace API {
  type deleteSystemUserUserIdParams = {
    /** 用户id */
    userId: string;
  };

  type DnsI = {
    dnsServer?: string;
    domain: string;
    type?: string;
  };

  type DnsRes = {
    dnsServer?: string;
    domain?: string;
    ip?: string[];
    parsingTime?: string;
    startTime?: string;
  };

  type ListParams = {
    account?: string;
    current?: number;
    pageSize?: number;
    sortFiled?: string;
    sortOrder?: string;
    userId?: string;
    userRole?: string;
  };

  type PingI = {
    input: string;
  };

  type PingRes = {
    aveTime?: string;
    checkPoint?: string;
    dropRate?: number;
    ip?: string;
    maxTime?: string;
    minTime?: string;
    startTime?: string;
  };

  type PortsIPProtocal = {
    portsip?: string;
    /** 是 tcp 还是 udp，默认 tcp */
    protocal?: string;
  };

  type PortsRes = {
    checkPoint?: string;
    consumTime?: number;
    portScanR?: any;
    startTime?: string;
  };

  type ResponseModelDnsRes = {
    data?: DnsRes;
    msg?: string;
  };

  type ResponseModelPingRes = {
    data?: PingRes;
    msg?: string;
  };

  type ResponseModelPortsRes = {
    data?: PortsRes;
    msg?: string;
  };

  type ResponseModelSSLCert = {
    data?: SSLCert;
    msg?: string;
  };

  type ResponseModelUserListPage = {
    data?: UserListPage;
    msg?: string;
  };

  type ResponseModelUserLoginReturn = {
    data?: UserLoginReturn;
    msg?: string;
  };

  type ResponseString = {
    data?: string;
    msg?: string;
  };

  type SSLCert = {
    /** 颁发者 */
    issuer?: string;
    /** 结束时间 */
    notAfter?: string;
    /** 开始时间 */
    notBefore?: string;
    /** 加密算法 */
    publicKeyAlgorithm?: string;
    /** 剩余天数 */
    remainingDays?: string;
    /** 证书序列号 */
    serialNumber?: string;
    /** 签名算法 */
    signatureAlgorithm?: string;
    /** 证书域名 */
    subject?: string;
  };

  type SSLI = {
    domain: string;
  };

  type UserAdd = {
    account: string;
    description?: string;
    email?: string;
    gender?: boolean;
    phone?: string;
    userAvatar?: string;
    userRole?: string;
  };

  type UserByUserId = {
    account?: string;
    createdAt?: string;
    updatedAt?: string;
    userAvatar?: string;
    userId?: string;
    userRole?: number;
  };

  type UserListPage = {
    result?: UserByUserId[];
    total?: number;
  };

  type UserLogin = {
    account: string;
    password: string;
  };

  type UserLoginReturn = {
    account?: string;
    createdat?: string;
    description?: string;
    email?: string;
    gender?: boolean;
    phone?: string;
    token?: string;
    userAvatar?: string;
    userId?: string;
    userRole?: number;
  };

  type UserRegister = {
    account: string;
    password: string;
    rePassword: string;
  };

  type UserSecurityPasswordChange = {
    oldPassword: string;
    password: string;
    rePassword: string;
    userId?: number;
  };

  type UserUpdate = {
    account: string;
    description?: string;
    email?: string;
    gender?: boolean;
    password?: string;
    phone?: string;
    rePassword?: string;
    userAvatar?: string;
    userId: string;
    userRole?: string;
  };

  type UserUpdateBySelf = {
    account: string;
    description?: string;
    email?: string;
    gender?: boolean;
    phone?: string;
    userAvatar?: string;
    userId: string;
  };
}
